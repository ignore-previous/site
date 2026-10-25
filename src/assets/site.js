// Copy buttons and tabs. No storage, no network, nothing leaves the page.
// The buttons carry an aria-label, so screen readers hear "Copied" from a shared status line instead.
var copyStatus = document.createElement('p');
copyStatus.className = 'sr-only';
copyStatus.setAttribute('role', 'status');
document.body.appendChild(copyStatus);
document.querySelectorAll('button[data-target]').forEach(function (b) {
  b.addEventListener('click', function () {
    var el = document.getElementById(b.dataset.target);
    // Keep the first label, so a second click while it says "Copied" doesn't make "Copied" stick.
    var label = b.dataset.label || (b.dataset.label = b.textContent);
    var done = function () {
      b.textContent = 'Copied';
      copyStatus.textContent = 'Copied ' + (b.dataset.say || el.textContent);
      setTimeout(function () { b.textContent = label; copyStatus.textContent = ''; }, 1500);
    };
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

// Home tool cards. Each is a <details>, so it opens and closes without this script. This adds:
// a click anywhere on a closed card opens it; on an open card the top part closes it; "Show less" closes it and
// returns to the card's top; and a link to the card or into it (#whats-allowed, #unclank-run) arrives with it open.
var folds = [].slice.call(document.querySelectorAll('.tool > .fold'));
function openFor(hash) {
  var id = hash && hash.length > 1 ? hash.slice(1) : "";
  try { id = decodeURIComponent(id); } catch (e) { /* a malformed hash such as #%zz: use it as typed */ }
  var el = id && document.getElementById(id);
  var card = el && el.closest('.tool');
  if (!card) return null;
  card.querySelector('.fold').open = true;
  return el;
}
folds.forEach(function (fold) {
  var card = fold.parentNode;
  card.addEventListener('click', function (e) {
    if (e.target.closest('a, button, summary, input, select, textarea')) return;
    var sel = getSelection();
    if (sel && !sel.isCollapsed && card.contains(sel.anchorNode)) return;
    if (!fold.open) fold.open = true;
    else if (e.target.closest('.tool-top')) fold.open = false;
  });
  fold.querySelector('.less').addEventListener('click', function () {
    fold.open = false;
    card.scrollIntoView({ block: 'start' });
    fold.querySelector('summary').focus({ preventScroll: true });
  });
});
if (folds.length) {
  // Same-page links: open the card before the browser scrolls to it.
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="#"]');
    if (a && a.pathname === location.pathname && a.hash) openFor(a.hash);
  });
  window.addEventListener('hashchange', function () { var el = openFor(location.hash); if (el) el.scrollIntoView(); });
  var first = openFor(location.hash);
  if (first) first.scrollIntoView();
}
