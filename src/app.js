(function () {
  var root = document.documentElement;

  /* ---------- Tamil / English ---------- */
  var langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    var swaps = Array.prototype.slice.call(document.querySelectorAll('.ta-swap'));
    swaps.forEach(function (el) { el.setAttribute('data-en', el.textContent); });
    var tamil = false;
    try { tamil = localStorage.getItem('pst-lang') === 'ta'; } catch (e) {}
    var applyLang = function () {
      swaps.forEach(function (el) {
        var next = tamil ? el.getAttribute('data-ta') : el.getAttribute('data-en');
        if (next) el.textContent = next;
      });
      root.setAttribute('lang', tamil ? 'ta' : 'en');
      langBtn.textContent = tamil ? 'English' : 'தமிழ்';
      langBtn.setAttribute('aria-pressed', String(tamil));
    };
    if (tamil) applyLang();
    langBtn.addEventListener('click', function () {
      tamil = !tamil;
      applyLang();
      try { localStorage.setItem('pst-lang', tamil ? 'ta' : 'en'); } catch (e) {}
    });
  }

  /* ---------- navigation ---------- */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  if (burger && drawer) {
    burger.addEventListener('click', function () {
      drawer.hidden = !drawer.hidden;
      burger.setAttribute('aria-expanded', String(!drawer.hidden));
    });
  }

  /* ---------- hero carousel ---------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  if (slides.length > 1) {
    var dots = Array.prototype.slice.call(document.querySelectorAll('.dot'));
    var index = 0;
    var timer = null;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var show = function (next) {
      index = (next + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        s.classList.toggle('is-active', i === index);
        s.setAttribute('aria-hidden', String(i !== index));
      });
      dots.forEach(function (d, i) { d.setAttribute('aria-selected', String(i === index)); });
    };
    var start = function () {
      if (reduced) return;
      stop();
      timer = setInterval(function () { show(index + 1); }, 7000);
    };
    var stop = function () { if (timer) clearInterval(timer); timer = null; };

    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { show(i); start(); });
    });
    var prev = document.getElementById('slide-prev');
    var next = document.getElementById('slide-next');
    if (prev) prev.addEventListener('click', function () { show(index - 1); start(); });
    if (next) next.addEventListener('click', function () { show(index + 1); start(); });

    var hero = document.querySelector('.hero');
    if (hero) {
      hero.addEventListener('mouseenter', stop);
      hero.addEventListener('mouseleave', start);
      hero.addEventListener('focusin', stop);
    }
    show(0);
    start();
  }

  /* ---------- copy a phone number ---------- */
  function selectText(btn) {
    var span = btn.parentNode.querySelector('.tel-num');
    if (!span) return;
    var range = document.createRange();
    range.selectNodeContents(span);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    btn.textContent = 'Selected';
  }
  document.addEventListener('click', function (e) {
    var btn = e.target && e.target.closest ? e.target.closest('.copy') : null;
    if (!btn) return;
    var value = btn.getAttribute('data-copy');
    var restore = function () { setTimeout(function () { btn.textContent = 'Copy'; }, 1800); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(function () {
        btn.textContent = 'Copied';
        restore();
      }, function () { selectText(btn); restore(); });
    } else {
      selectText(btn);
      restore();
    }
  });

  /* ---------- gallery lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var shots = Array.prototype.slice.call(document.querySelectorAll('.gallery button'));
    var big = document.getElementById('lightbox-img');
    var count = document.getElementById('lightbox-count');
    var at = 0;
    var render = function () {
      var img = shots[at].querySelector('img');
      big.src = img.getAttribute('src');
      big.alt = img.getAttribute('alt');
      count.textContent = (at + 1) + ' / ' + shots.length;
    };
    var open = function (i) {
      at = i;
      render();
      lightbox.hidden = false;
      document.getElementById('lightbox-close').focus();
    };
    var close = function () {
      lightbox.hidden = true;
      shots[at].focus();
    };
    shots.forEach(function (b, i) { b.addEventListener('click', function () { open(i); }); });
    document.getElementById('lightbox-close').addEventListener('click', close);
    document.getElementById('lightbox-prev').addEventListener('click', function () {
      at = (at - 1 + shots.length) % shots.length; render();
    });
    document.getElementById('lightbox-next').addEventListener('click', function () {
      at = (at + 1) % shots.length; render();
    });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', function (e) {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') { at = (at - 1 + shots.length) % shots.length; render(); }
      if (e.key === 'ArrowRight') { at = (at + 1) % shots.length; render(); }
    });
  }

  /* ---------- enquiry form (no server behind it) ---------- */
  var form = document.getElementById('enquiry');
  var note = document.getElementById('form-note');
  if (form && note) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var name = String(d.get('name') || '').trim();
      var phone = String(d.get('phone') || '').trim();
      if (!name || !phone) {
        note.className = 'form-note';
        note.textContent = 'Add your name and phone number so we can call you back.';
        return;
      }
      var extra = String(d.get('message') || '').trim();
      var lines = [
        'Enquiry for Ponnar Sankar Tractors',
        'Name: ' + name,
        'Phone: ' + phone,
        'Machine: ' + d.get('machine'),
        'Branch: ' + d.get('branch'),
      ];
      if (extra) lines.push('Details: ' + extra);
      lines.push('');
      lines.push('Copy this to WhatsApp on +91 90423 50451, or read it out when you call.');
      note.className = 'form-ok';
      note.textContent = lines.join('\n');
    });
  }
})();
