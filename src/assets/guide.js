// Picker and checklist counts for the guide. Nothing is sent and the address of the page never changes.
// Everything is shown or hidden on this page only. The app and plan picked are kept in this tab's
// sessionStorage, in the visitor's own browser, so Back and reload bring the page back as they left it.
// The browser normally drops them when the tab closes. If storage is blocked the picker starts empty each time.
(function () {
  'use strict';

  var content = document.getElementById('g-content');
  var status = document.getElementById('g-status');
  var prompt = document.getElementById('g-prompt');
  var picker = document.getElementById('picker');
  var hint = document.getElementById('g-hint');
  if (!content || !status || !picker) return;

  var KEY = 'what-can-my-ai-see:choice';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  var arrowKey = false;
  var liveTimer = 0;

  var APP_NAMES = { chatgpt: 'ChatGPT', claude: 'Claude' };
  var PLAN_NAMES = {
    chatgpt: { free: 'Free or Go', paid: 'Plus or Pro', work: 'Business, Enterprise or Edu (work or school)', unsure: 'every plan' },
    claude: { free: 'Free', paid: 'Pro or Max', work: 'Team and Enterprise (work or school)', unsure: 'every plan' }
  };

  function all(sel, root) { return [].slice.call((root || document).querySelectorAll(sel)); }
  function checkedValue(name) {
    var el = document.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : '';
  }
  function checkedEl(name) { return document.querySelector('input[name="' + name + '"]:checked'); }

  // True when the element, or anything around it up to the guide, is hidden.
  function isHidden(el) {
    var n = el;
    while (n && n !== content) {
      if (n.hidden) return true;
      n = n.parentNode;
    }
    return false;
  }

  function updateCounts() {
    all('[data-checklist]').forEach(function (list) {
      var boxes = all('input[type="checkbox"]', list).filter(function (b) { return !isHidden(b); });
      var done = boxes.filter(function (b) { return b.checked; }).length;
      var out = document.querySelector('[data-count-for="' + list.id + '"]');
      if (out) {
        out.textContent = boxes.length ? done + ' of ' + boxes.length + ' checked' : '';
      }
    });
  }

  function applyPlan(plan) {
    all('[data-plan]', content).forEach(function (el) {
      var tokens = ' ' + el.getAttribute('data-plan') + ' ';
      el.hidden = !(plan === 'unsure' || tokens.indexOf(' ' + plan + ' ') !== -1);
    });
  }

  function update() {
    var app = checkedValue('app');
    all('[data-plans-for]').forEach(function (fs) {
      fs.hidden = fs.getAttribute('data-plans-for') !== app;
    });
    if (hint) hint.hidden = !app;
    var plan = app ? checkedValue('plan-' + app) : '';
    var ready = !!(app && plan);

    all('[data-app]', content).forEach(function (el) {
      el.hidden = el.getAttribute('data-app') !== app;
    });
    if (ready) applyPlan(plan);

    if (ready) {
      content.classList.add('is-on');
      status.textContent = 'Showing the guide for ' + APP_NAMES[app] + ', ' + PLAN_NAMES[app][plan] + '.';
    } else {
      content.classList.remove('is-on');
      status.textContent = app ? 'Now pick your ' + APP_NAMES[app] + ' plan.' : '';
    }
    if (prompt) prompt.classList.toggle('is-off', ready);
    all('.g-back, .g-reset').forEach(function (b) { b.hidden = !ready; });
    updateCounts();
  }

  function clearAll() {
    all('input[type="radio"], input[type="checkbox"]').forEach(function (i) { i.checked = false; });
  }

  function save() {
    try {
      var app = checkedValue('app');
      var plan = app ? checkedValue('plan-' + app) : '';
      if (app) sessionStorage.setItem(KEY, JSON.stringify({ app: app, plan: plan }));
      else sessionStorage.removeItem(KEY);
    } catch (e) { /* storage blocked: the picker works as before, without memory */ }
  }

  function forget() {
    try { sessionStorage.removeItem(KEY); } catch (e) { /* storage blocked */ }
  }

  function check(name, value) {
    all('input[name="' + name + '"]').forEach(function (i) { if (i.value === value) i.checked = true; });
  }

  function restore() {
    var saved = null;
    try { saved = JSON.parse(sessionStorage.getItem(KEY) || 'null'); } catch (e) { saved = null; }
    if (!saved || !APP_NAMES.hasOwnProperty(saved.app)) return;
    check('app', saved.app);
    if (saved.plan && PLAN_NAMES[saved.app].hasOwnProperty(saved.plan)) check('plan-' + saved.app, saved.plan);
  }

  function scrollToEl(el) {
    el.scrollIntoView({ behavior: reduceMotion && reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
  }

  // Shows the visitor where the result is. The status line is a live region, so callers silence it before
  // its text changes: a screen reader then reads it once, as the focused element, not twice.
  function showResult() {
    scrollToEl(status.parentNode);
    status.focus({ preventScroll: true });
    clearTimeout(liveTimer);
    liveTimer = setTimeout(function () { status.setAttribute('aria-live', 'polite'); }, 1000);
  }

  // Arrow keys move through a radio group and pick as they go, so a keyboard visitor would be pulled away
  // after the first press. For those changes the result updates and is announced, and Enter goes to it.
  picker.addEventListener('keydown', function (e) {
    if (/^Arrow/.test(e.key)) {
      arrowKey = true;
      setTimeout(function () { arrowKey = false; }, 0);
    } else if (e.key === 'Enter' && e.target.name && e.target.name.indexOf('plan-') === 0 && content.classList.contains('is-on')) {
      e.preventDefault();
      showResult();
    }
  });

  // Changing the app clears the plan, so a stale plan never carries across.
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (!t) return;
    if (t.type === 'checkbox') { updateCounts(); return; }
    if (!t.name) return;
    if (t.name === 'app') {
      all('input[name="plan-chatgpt"], input[name="plan-claude"]').forEach(function (i) { i.checked = false; });
      all('input[type="checkbox"]').forEach(function (i) { i.checked = false; });
      clearTimeout(liveTimer);
      status.setAttribute('aria-live', 'polite');
      update();
    } else if (t.name.indexOf('plan-') === 0) {
      all('input[type="checkbox"]').forEach(function (i) { i.checked = false; });
      var move = !arrowKey;
      clearTimeout(liveTimer);
      status.setAttribute('aria-live', move ? 'off' : 'polite');
      update();
      if (move) showResult();
    }
    save();
  });

  all('.g-back').forEach(function (b) {
    b.addEventListener('click', function () {
      var target = checkedEl('app') || document.querySelector('input[name="app"]');
      var pick = (checkedEl('plan-chatgpt') || checkedEl('plan-claude')) || target;
      picker.scrollIntoView();
      if (pick && pick.focus) pick.focus();
    });
  });

  all('.g-reset').forEach(function (b) {
    b.addEventListener('click', function () {
      forget();
      clearAll();
      update();
      var first = document.querySelector('input[name="app"]');
      scrollToEl(picker);
      if (first) first.focus({ preventScroll: true });
    });
  });

  // On every load, and on Back from another page, start clean and then put back this tab's saved choice.
  // Restoring doesn't scroll or move focus: the browser already puts the visitor back where they were.
  window.addEventListener('pageshow', function () { clearAll(); restore(); update(); });
  clearAll();
  restore();
  update();
})();
