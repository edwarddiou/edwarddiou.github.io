(function () {
  var STORAGE_KEY = 'lang';
  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  var initial = (saved === 'zh' || saved === 'en') ? saved : 'en';

  applyLang(initial);

  function applyLang(l) {
    var root = document.documentElement;
    root.setAttribute('data-lang', l);
    root.setAttribute('lang', l === 'zh' ? 'zh-Hant' : 'en');
    syncTitle(l);
  }

  function setLang(l) {
    try { localStorage.setItem(STORAGE_KEY, l); } catch (e) {}
    applyLang(l);
  }

  function syncTitle(l) {
    var t = document.querySelector('title');
    if (!t) return;
    var alt = t.getAttribute(l === 'zh' ? 'data-zh' : 'data-en');
    if (alt) document.title = alt;
  }

  function bind() {
    document.querySelectorAll('[data-lang-set]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(btn.getAttribute('data-lang-set'));
      });
    });
    // Re-sync title once DOM is parsed (title element exists now)
    syncTitle(document.documentElement.getAttribute('data-lang'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
