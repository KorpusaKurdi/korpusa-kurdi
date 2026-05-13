/* ============================================================
   KorpusaKurdî · shared theme bootstrap
   Loaded synchronously in <head> to avoid FOUC.
   localStorage keys used across the ecosystem:
     kk-theme     → 'dark' | 'light'  (this file)
     kk-tab       → 'today' | 'contribute' | 'profile'  (mockup.html)
     kk-profile   → {name, dialect, region, createdAt}  (mockup.html)
     kk-contributions → array of contribution records   (mockup.html)
   ============================================================ */
(function () {
  var root = document.documentElement;
  try {
    var stored = localStorage.getItem('kk-theme');
    if (stored === 'light' || stored === 'dark') {
      root.setAttribute('data-theme', stored);
    }
  } catch (_) { /* private mode / disabled storage — fall back to default */ }

  function bindToggle() {
    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('kk-theme', next); } catch (_) {}
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindToggle);
  } else {
    bindToggle();
  }
})();
