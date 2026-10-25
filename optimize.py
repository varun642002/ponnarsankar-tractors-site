"""Generate responsive WebP variants of everything in assets/.

The source photographs run up to 4600px wide and are shown at 318px on a phone,
so the browser was downloading roughly fifteen times the pixels it could use.

Run this after adding or replacing an image:

    python optimize.py

It writes <name>-480.webp, <name>-960.webp and <name>-1440.webp beside each
source, skipping any width that would upscale. build.mjs picks these up on its
own by reading the directory, so the site build itself stays dependency-free.
Needs Pillow; nothing else does.
"""

from pathlib import Path
from PIL import Image

WIDTHS = (480, 720, 960, 1440)
QUALITY = 72
SOURCE_SUFFIXES = {".webp", ".jpg", ".jpeg", ".png"}

assets = Path(__file__).parent / "assets"


def is_variant(path: Path) -> bool:
    """True only for files this script wrote.

    Source names can end in digits of their own (tiller-130, tiller-95), so the
    trailing number has to be one of our widths, not merely numeric.
    """
    stem = path.stem
    if "-" not in stem or path.suffix.lower() != ".webp":
        return False
    tail = stem.rsplit("-", 1)[-1]
    return tail.isdigit() and int(tail) in WIDTHS


def main() -> None:
    made = skipped = 0
    saved_from = saved_to = 0

    for src in sorted(assets.iterdir()):
        if src.suffix.lower() not in SOURCE_SUFFIXES or is_variant(src):
            continue

        with Image.open(src) as im:
            im = im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") else "RGB")
            original_width = im.width

            for width in WIDTHS:
                if width >= original_width:
                    skipped += 1
                    continue

                out = src.with_name(f"{src.stem}-{width}.webp")
                height = round(im.height * width / original_width)
                im.resize((width, height), Image.LANCZOS).save(
                    out, "WEBP", quality=QUALITY, method=6
                )
                made += 1
                if width == 960 or (width == 480 and original_width <= 960):
                    saved_from += src.stat().st_size
                    saved_to += out.stat().st_size

        print(f"{src.name:28} {original_width:>5}px wide")

    print(f"\n{made} variants written, {skipped} widths skipped as upscales")
    if saved_from:
        print(f"at 960w: {saved_from // 1024}KB of sources -> {saved_to // 1024}KB")


if __name__ == "__main__":
    main()
