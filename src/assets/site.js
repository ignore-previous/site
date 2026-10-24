// Copy buttons and tabs. No storage, no network, nothing leaves the page.
document.querySelectorAll('button[data-target]').forEach(function (b) {
  b.addEventListener('click', function () {
    var el = document.getElementById(b.dataset.target);
    var label = b.textContent;
    var done = function () { b.textContent = 'Copied'; setTimeout(function () { b.textContent = label; }, 1500); };
    var sel = function () { var r = document.createRange(); r.selectNodeContents(el); var s = getSelection(); s.removeAllRanges(); s.addRange(r); };
    try { navigator.clipboard.writeText(el.textContent).then(done, sel); } catch (e) { sel(); }
  });
});

document.querySelectorAll('[role="tablist"]').forEach(function (list) {
  var tabs = [].slice.call(list.querySelectorAll('[role="tab"]'));
  if (!tabs.length) return;
  function pick(t, focus) {
    tabs.forEach(function (x) {
      var on = x === t;
      x.setAttribute('aria-selected', on ? 'true' : 'false');
      x.tabIndex = on ? 0 : -1;
      document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) t.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { pick(t, false); });
    t.addEventListener('keydown', function (e) {
      var n = null, k = e.key, L = tabs.length;
      if (k === 'ArrowRight' || k === 'ArrowDown') n = tabs[(i + 1) % L];
      else if (k === 'ArrowLeft' || k === 'ArrowUp') n = tabs[(i - 1 + L) % L];
      else if (k === 'Home') n = tabs[0];
      else if (k === 'End') n = tabs[L - 1];
      if (n) { e.preventDefault(); pick(n, true); }
    });
  });
  pick(tabs[0], false);
});
