"""Download and subset the web fonts into assets/fonts/, so the site serves
them itself instead of calling out to Google.

Self-hosting removes two third-party connections and the stylesheet round-trip
that must finish before the browser can even discover which font files it needs.
Subsetting then drops the coverage this site will never render.

    node build.mjs && python fonts.py && node build.mjs

It reads dist/ to learn which characters the site actually uses, so build first.
One variable file is written per family, covering every weight the design uses —
Google serves these as variable fonts too, and cutting them into static
per-weight files would make the download bigger, not smaller.

`coverage.json` records what was kept. check.mjs fails the build if any
character in the output falls outside it, so new copy cannot ship as blank
boxes; re-run this script and it is covered again.

Needs fonttools and brotli:  python -m pip install "fonttools[woff]" brotli
Nothing else in the project does.
"""

from html import unescape
from io import BytesIO
from pathlib import Path
import json
import re
import urllib.request

from fontTools import subset
from fontTools.ttLib import TTFont

HERE = Path(__file__).parent
SRC = HERE / "src"
OUT = HERE / "assets" / "fonts"
DIST = HERE / "dist"

# A current browser UA, or Google serves the older truetype format.
UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)

TAMIL_BLOCK = range(0x0B80, 0x0C00)

FAMILIES = [
    # css family, google family, weights, google subset, repo dir
    ("Saira Condensed", "Saira+Condensed", [600, 700, 800], "latin", "sairacondensed"),
    ("IBM Plex Sans", "IBM+Plex+Sans", [400, 500, 600], "latin", "ibmplexsans"),
    ("IBM Plex Mono", "IBM+Plex+Mono", [400, 500], "latin", "ibmplexmono"),
    ("Noto Sans Tamil", "Noto+Sans+Tamil", [500, 600], "tamil", "notosanstamil"),
]


def get(url: str) -> bytes:
    return urllib.request.urlopen(
        urllib.request.Request(url, headers={"User-Agent": UA})
    ).read()


def characters_in_output() -> set[int]:
    """Every character the built pages render, entities resolved."""
    if not DIST.exists():
        raise SystemExit("run `node build.mjs` first: this reads dist/")
    used = set()
    for page in DIST.rglob("*.html"):
        html = page.read_text(encoding="utf-8")
        html = re.sub(r"<(script|style)[\s\S]*?</\1>", " ", html)
        text = unescape(re.sub(r"<[^>]+>", " ", html))
        used.update(ord(c) for c in text)
    # app.js writes its own strings into the page
    for script in HERE.joinpath("src").glob("*.js"):
        used.update(ord(c) for c in script.read_text(encoding="utf-8"))
    return used


def font_urls(google_family: str, weights: list[int], subset_name: str) -> dict[int, str]:
    """weight -> file URL.

    Some families on Google Fonts are variable and every weight resolves to the
    same file; others are static and each weight is its own file. Treating a
    static family as variable silently renders every weight at one thickness,
    so the caller has to tell them apart by comparing the URLs.
    """
    css = get(
        f"https://fonts.googleapis.com/css2?family={google_family}:wght@"
        + ";".join(str(w) for w in weights)
        + "&display=swap"
    ).decode()
    found = {}
    for name, body in re.findall(r"/\*\s*([a-z0-9-]+)\s*\*/\s*@font-face\s*{(.*?)}", css, re.S):
        if name != subset_name:
            continue
        weight = re.search(r"font-weight:\s*(\d+)", body)
        url = re.search(r"url\((https://fonts\.gstatic\.com/[^)]+\.woff2)\)", body)
        if weight and url:
            found[int(weight.group(1))] = url.group(1)
    missing = [w for w in weights if w not in found]
    if missing:
        raise SystemExit(f"{google_family}: no {subset_name} face for weight(s) {missing}")
    return found


def slug(family: str) -> str:
    return family.lower().replace(" ", "-")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    used = characters_in_output()

    # Latin faces keep all of ASCII so any new English copy works, plus exactly
    # the symbols the pages use. Tamil keeps only the characters in the copy:
    # the whole block costs 16KB more and the site uses a few dozen.
    latin = sorted(set(range(0x20, 0x7F)) | {c for c in used if 0x7F < c < 0x0B80 or c > 0x0C00})
    tamil = sorted({c for c in used if c in TAMIL_BLOCK} | {0x20, 0xA0, 0x200C, 0x200D, 0x25CC})

    print(f"characters in the output: {len(used)}")
    print(f"  latin set kept: {len(latin)}   tamil set kept: {len(tamil)}\n")

    for stale in OUT.glob("*.woff2"):
        stale.unlink()

    def cut(raw: bytes, codepoints: list[int], path: Path) -> int:
        font = TTFont(BytesIO(raw))
        options = subset.Options()
        options.flavor = "woff2"
        options.layout_features = ["*"]  # Tamil needs its shaping rules
        options.desubroutinize = True
        options.drop_tables += ["DSIG"]
        subsetter = subset.Subsetter(options=options)
        subsetter.populate(unicodes=codepoints)
        subsetter.subset(font)
        font.save(path)
        font.close()
        return path.stat().st_size

    rows = []
    faces = []
    before = after = 0
    for family, google_family, weights, subset_name, repo in FAMILIES:
        codepoints = tamil if subset_name == "tamil" else latin
        urls = font_urls(google_family, weights, subset_name)
        variable = len(set(urls.values())) == 1

        if variable:
            raw = get(urls[weights[0]])
            path = OUT / f"{slug(family)}.woff2"
            size = cut(raw, codepoints, path)
            before += len(raw)
            after += size
            rows.append((f"{family} {weights[0]}-{weights[-1]} (variable)", len(raw), size))
            faces.append((family, f"{weights[0]} {weights[-1]}", path.name))
        else:
            for weight in weights:
                raw = get(urls[weight])
                path = OUT / f"{slug(family)}-{weight}.woff2"
                size = cut(raw, codepoints, path)
                before += len(raw)
                after += size
                rows.append((f"{family} {weight}", len(raw), size))
                faces.append((family, str(weight), path.name))

        licence = OUT / f"OFL-{slug(family)}.txt"
        if not licence.exists():
            licence.write_bytes(
                get(f"https://raw.githubusercontent.com/google/fonts/main/ofl/{repo}/OFL.txt")
            )

    # build.mjs prepends this to the stylesheet, so the rules can never drift
    # out of step with the files on disk
    lines = [
        "/* Written by fonts.py — do not edit. One file per family where the",
        "   family is variable, one per weight where it is not. */",
    ]
    for family, weight, filename in faces:
        lines.append(
            f'@font-face{{font-family:"{family}";font-style:normal;font-weight:{weight};'
            f'font-display:swap;src:url(assets/fonts/{filename}) format("woff2")}}'
        )
    (SRC / "fonts.css").write_text("\n".join(lines) + "\n", encoding="utf-8")

    (OUT / "coverage.json").write_text(
        json.dumps({"codepoints": sorted(set(latin) | set(tamil))}), encoding="utf-8"
    )

    width = max(len(n) for n, _, _ in rows)
    for name, src, dst in rows:
        print(f"{name:{width}}  {src/1024:6.1f}KB -> {dst/1024:5.1f}KB")
    print("-" * (width + 24))
    print(f"{'total':{width}}  {before/1024:6.1f}KB -> {after/1024:5.1f}KB")


if __name__ == "__main__":
    main()
