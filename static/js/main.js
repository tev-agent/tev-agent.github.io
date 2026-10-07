// Tev project page: math rendering, nav state, result tabs, the wasted-group widget, BibTeX copy.
(function () {
  'use strict';

  // KaTeX (loaded with defer before this file)
  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\(', right: '\\)', display: false }
      ],
      throwOnError: false
    });
  }

  // Nav: border once scrolled, highlight the section in view
  var nav = document.getElementById('nav');
  var links = Array.prototype.slice.call(nav.querySelectorAll('ul a'));
  var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if ('IntersectionObserver' in window) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
      var current = null;
      links.forEach(function (a) {
        var id = a.getAttribute('href').slice(1);
        if (visible[id] && !current) current = id;
      });
      links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href').slice(1) === current); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  // Result tabs
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tabs [role=tab]'));
  var select = function (tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
  };
  tabs.forEach(function (t, i) {
    t.tabIndex = i === 0 ? 0 : -1;
    t.addEventListener('click', function () { select(t); });
    t.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (d) { e.preventDefault(); select(tabs[(i + d + tabs.length) % tabs.length], true); }
    });
  });

  // Wasted groups under terminal-only reward: (1 - p)^G
  var pRange = document.getElementById('p-range');
  var gRange = document.getElementById('g-range');
  var dotsEl = document.getElementById('dots');
  if (pRange && gRange && dotsEl) {
    var N = 100, P_MIN = 0.005, P_MAX = 0.5;
    // fixed pseudo-random order, so the gray squares look scattered but stay put
    var seed = 7, rank = [];
    for (var i = 0; i < N; i++) rank.push(i);
    for (var j = N - 1; j > 0; j--) {
      seed = (seed * 16807) % 2147483647;
      var k = seed % (j + 1), tmp = rank[j]; rank[j] = rank[k]; rank[k] = tmp;
    }
    var dots = [];
    for (var n = 0; n < N; n++) { var d = document.createElement('i'); dotsEl.appendChild(d); dots.push(d); }

    var update = function () {
      var t = pRange.value / 100;
      var p = Number(Math.pow(10, Math.log10(P_MIN) + t * (Math.log10(P_MAX) - Math.log10(P_MIN))).toPrecision(2));
      var G = Number(gRange.value);
      var waste = Math.pow(1 - p, G);
      var nWaste = Math.round(waste * N);
      document.getElementById('p-val').textContent = String(p);
      document.getElementById('g-val').textContent = String(G);
      document.getElementById('waste-pct').textContent = (waste < 0.01 && waste > 0 ? '<1' : Math.round(waste * 100)) + '%';
      dots.forEach(function (d, idx) { d.classList.toggle('waste', rank[idx] < nWaste); });
    };
    pRange.addEventListener('input', update);
    gRange.addEventListener('input', update);
    update();
  }

  // Copy BibTeX
  var btn = document.getElementById('copy-bib');
  if (btn) {
    btn.addEventListener('click', function () {
      var text = document.getElementById('bib-text').textContent;
      var done = function () { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = 'Copy'; }, 1600); };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } finally { document.body.removeChild(ta); }
      }
    });
  }
})();
