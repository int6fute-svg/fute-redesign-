/* ==========================================================================
   FUTÉ SERVICES — site behaviour
   No dependencies. Every module is optional and no-ops when its markup
   is absent, so the same bundle serves every page.
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------------------------------------------------------------- header */
  function header() {
    var el = $('[data-header]');
    if (!el) return;
    var last = 0;

    function update() {
      var y = window.scrollY || 0;
      el.classList.toggle('is-stuck', y > 24);
      // Hide on downward scroll past the fold; always show near the top.
      if (y > 320 && y > last && !document.body.classList.contains('is-locked')) {
        el.classList.add('is-hidden');
      } else {
        el.classList.remove('is-hidden');
      }
      last = y;
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ------------------------------------------------------------------ menu */
  function menu() {
    var btn = $('[data-burger]');
    var panel = $('[data-menu]');
    if (!btn || !panel) return;

    var links = $$('.menu__link', panel);
    links.forEach(function (l, i) { l.style.transitionDelay = (80 + i * 55) + 'ms'; });

    function setOpen(open) {
      btn.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      panel.classList.toggle('is-open', open);
      panel.setAttribute('aria-hidden', String(!open));
      document.body.classList.toggle('is-locked', open);
      if (open) { links.forEach(function (l, i) { l.style.transitionDelay = (80 + i * 55) + 'ms'; }); }
      else { links.forEach(function (l) { l.style.transitionDelay = '0ms'; }); }
    }

    btn.addEventListener('click', function () {
      setOpen(!panel.classList.contains('is-open'));
    });
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) setOpen(false);
    });
  }

  /* ---------------------------------------------------------------- reveal */
  function reveal() {
    var items = $$('.reveal, .reveal-line, .reveal-mask, .reveal-img, [data-count], .process__step');
    if (!items.length) return;

    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      $$('[data-count]').forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
      return;
    }

    var pending = new Set(items);

    function show(el) {
      if (!pending.has(el)) return;
      pending.delete(el);
      io.unobserve(el);
      el.classList.add('is-in');
      if (el.hasAttribute('data-count')) count(el);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        // Reveal on entry, and also for anything already scrolled past — an
        // anchor jump or a restored scroll position must never leave content
        // stuck at opacity 0.
        if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) show(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    items.forEach(function (el) {
      // Stagger siblings that opt in via data-stagger on the parent.
      var parent = el.parentElement;
      if (parent && parent.hasAttribute('data-stagger')) {
        var sibs = $$('.reveal, .reveal-line, .reveal-mask, .reveal-img, .process__step', parent);
        var i = sibs.indexOf(el);
        if (i > -1) el.style.setProperty('--d', (i * Number(parent.getAttribute('data-stagger') || 90)) + 'ms');
      }
      io.observe(el);
    });

    // Safety net for jumps large enough that the observer never sees the
    // element cross the viewport. Runs only while something is still hidden.
    var ticking = false;
    function sweep() {
      ticking = false;
      if (!pending.size) return;
      var limit = window.innerHeight * 0.92;
      Array.from(pending).forEach(function (el) {
        if (el.getBoundingClientRect().top < limit) show(el);
      });
    }
    window.addEventListener('scroll', function () {
      if (ticking || !pending.size) return;
      ticking = true;
      requestAnimationFrame(sweep);
    }, { passive: true });

    // A page opened in a background tab gets no observer callbacks until it is
    // looked at; catch up the moment it becomes visible.
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) sweep();
    });
  }

  /* -------------------------------------------------------------- counters */
  function count(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) return;
    var dur = 1500;
    var start = null;
    var dec = (String(target).split('.')[1] || '').length;

    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(dec);
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = target.toFixed(dec);
    }
    requestAnimationFrame(frame);
  }

  /* --------------------------------------------------------------- marquee */
  function marquee() {
    $$('[data-marquee]').forEach(function (track) {
      if (track.children.length === 0) return;
      var clone = track.children[0].cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
      var speed = track.getAttribute('data-marquee');
      if (speed) track.style.animationDuration = speed + 's';
    });
  }

  /* ------------------------------------------ product-family media switcher */
  function families() {
    var wrap = $('[data-families]');
    if (!wrap) return;
    var rows = $$('.fam__row', wrap);
    var imgs = $$('[data-fam-media] img', wrap);
    var caption = $('[data-fam-caption]', wrap);
    if (!rows.length || !imgs.length) return;

    function show(i) {
      rows.forEach(function (r, j) { r.classList.toggle('is-active', i === j); });
      imgs.forEach(function (im, j) { im.classList.toggle('is-active', i === j); });
      if (caption) caption.textContent = rows[i].getAttribute('data-fam-caption-text') || '';
    }

    rows.forEach(function (row, i) {
      row.addEventListener('pointerenter', function () { show(i); });
      row.addEventListener('focusin', function () { show(i); });
    });

    show(0);
  }

  /* ------------------------------------------------------------- hero reel */
  function heroSlides() {
    var stage = $('[data-hero]');
    if (!stage) return;
    var slides = $$('.hero__slide', stage);
    var dots = $$('[data-hero-dot]');
    if (slides.length < 2) return;
    var i = 0;
    var delay = 6000;

    function go(n) {
      slides[i].classList.remove('is-active');
      if (dots[i]) dots[i].classList.remove('is-active');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('is-active');
      if (dots[i]) {
        // restart the progress animation
        var d = dots[i];
        d.classList.remove('is-active');
        void d.offsetWidth;
        d.classList.add('is-active');
      }
    }

    if (reduced) return;
    var timer = setInterval(function () { go(i + 1); }, delay);
    dots.forEach(function (d, n) {
      d.addEventListener('click', function () {
        clearInterval(timer);
        go(n);
        timer = setInterval(function () { go(i + 1); }, delay);
      });
    });
  }

  /* ---------------------------------------------------------- work filters */
  function filters() {
    var bar = $('[data-filters]');
    var grid = $('[data-work-grid]');
    if (!bar || !grid) return;
    var cards = $$('[data-cat]', grid);
    var counter = $('[data-work-count]');

    function apply(cat) {
      var shown = 0;
      cards.forEach(function (card) {
        var match = cat === 'all' || card.getAttribute('data-cat').split(' ').indexOf(cat) > -1;
        card.classList.toggle('is-hidden', !match);
        if (match) shown++;
      });
      if (counter) counter.textContent = String(shown).padStart(2, '0');
    }

    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-filter]');
      if (!btn) return;
      $$('[data-filter]', bar).forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      apply(btn.getAttribute('data-filter'));
    });

    apply('all');
  }

  /* ------------------------------------------------------------- accordion */
  function accordion() {
    $$('[data-acc]').forEach(function (root) {
      var items = $$('.acc__item', root);
      items.forEach(function (item) {
        var btn = $('.acc__btn', item);
        var panel = $('.acc__panel', item);
        if (!btn || !panel) return;

        btn.addEventListener('click', function () {
          var open = item.classList.contains('is-open');
          if (root.hasAttribute('data-acc-single')) {
            items.forEach(function (other) {
              if (other === item) return;
              other.classList.remove('is-open');
              var op = $('.acc__panel', other);
              var ob = $('.acc__btn', other);
              if (op) op.style.height = '0px';
              if (ob) ob.setAttribute('aria-expanded', 'false');
            });
          }
          item.classList.toggle('is-open', !open);
          btn.setAttribute('aria-expanded', String(!open));
          panel.style.height = open ? '0px' : panel.scrollHeight + 'px';
        });
      });

      window.addEventListener('resize', function () {
        items.forEach(function (item) {
          if (!item.classList.contains('is-open')) return;
          var panel = $('.acc__panel', item);
          if (panel) panel.style.height = panel.scrollHeight + 'px';
        });
      });
    });
  }

  /* ------------------------------------------------------------------ chips */
  function chips() {
    $$('.chip').forEach(function (chip) {
      var input = $('input', chip);
      if (!input) return;
      var sync = function () { chip.classList.toggle('is-active', input.checked); };
      input.addEventListener('change', sync);
      sync();
    });
  }

  /* ------------------------------------------------------------------ forms */
  function forms() {
    // Floating labels
    $$('.field').forEach(function (field) {
      var input = field.querySelector('input, textarea, select');
      if (!input) return;
      var sync = function () { field.classList.toggle('is-filled', !!input.value); };
      input.addEventListener('input', sync);
      input.addEventListener('change', sync);
      input.addEventListener('blur', sync);
      sync();
    });

    $$('[data-form]').forEach(function (form) {
      var status = $('[data-form-status]', form);

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var ok = true;

        $$('[required]', form).forEach(function (input) {
          var field = input.closest('.field');
          var err = field ? $('.field__err', field) : null;
          var msg = '';

          if (!input.value.trim()) {
            msg = 'Required';
          } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value)) {
            msg = 'Enter a valid email address';
          }

          if (msg) { ok = false; }
          if (err) err.textContent = msg;
          if (field) field.style.borderBottomColor = msg ? 'var(--red-bright)' : '';
          input.setAttribute('aria-invalid', msg ? 'true' : 'false');
        });

        if (!ok) {
          var first = form.querySelector('[aria-invalid="true"]');
          if (first) first.focus();
          return;
        }

        // No backend is wired up yet — surface a clear confirmation and hand
        // the enquiry to the studio inbox. Replace with a POST when ready.
        if (status) {
          status.hidden = false;
          status.textContent = 'Thank you — your enquiry is ready to send. Connect this form to your endpoint, or email marketing@futeservices.com directly.';
          status.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
        }
      });
    });
  }

  /* ---------------------------------------------------------------- cursor */
  function cursor() {
    if (reduced || window.matchMedia('(pointer:coarse)').matches) return;
    var dot = document.createElement('div');
    dot.className = 'cursor';
    dot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);

    var x = window.innerWidth / 2, y = window.innerHeight / 2, cx = x, cy = y;

    document.addEventListener('pointermove', function (e) {
      x = e.clientX; y = e.clientY;
      dot.classList.add('is-on');
      var hit = e.target.closest('a, button, .work-card, .fam__row, .objectives__row, .crosssell__item, [data-cursor="lg"]');
      dot.classList.toggle('is-lg', !!hit);
    });
    document.addEventListener('pointerleave', function () { dot.classList.remove('is-on'); });

    (function loop() {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      dot.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
  }

  /* ------------------------------------------------------------------ misc */
  function misc() {
    $$('[data-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

    // Anchor links account for the fixed header.
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (!id || id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: top, behavior: reduced ? 'auto' : 'smooth' });
      });
    });
  }

  function init() {
    header(); menu(); reveal(); marquee();
    families(); heroSlides(); filters(); accordion();
    chips(); forms(); cursor(); misc();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
