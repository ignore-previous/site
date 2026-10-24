// Picker and checklist counts for the guide. Nothing is stored, nothing is sent,
// and the address of the page never changes. Everything is shown or hidden on this page only.
(function () {
  'use strict';

  var content = document.getElementById('g-content');
  var status = document.getElementById('g-status');
  var prompt = document.getElementById('g-prompt');
  var picker = document.getElementById('picker');
  if (!content || !status || !picker) return;

  var APP_NAMES = { chatgpt: 'ChatGPT', claude: 'Claude' };
  var PLAN_NAMES = {
    chatgpt: { free: 'Free or Go', paid: 'Plus or Pro', work: 'Business, Enterprise or Edu (work or school)', unsure: 'every plan' },
    claude: { free: 'Free', paid: 'Pro or Max', work: 'Team, Enterprise or Education (work or school)', unsure: 'every plan' }
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
    all('.g-back').forEach(function (b) { b.hidden = !ready; });
    updateCounts();
  }

  function clearAll() {
    all('input[type="radio"], input[type="checkbox"]').forEach(function (i) { i.checked = false; });
  }

  // Changing the app clears the plan, so a stale plan never carries across.
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (!t) return;
    if (t.type === 'checkbox') { updateCounts(); return; }
    if (!t.name) return;
    if (t.name === 'app') {
      all('input[name="plan-chatgpt"], input[name="plan-claude"]').forEach(function (i) { i.checked = false; });
      all('input[type="checkbox"]').forEach(function (i) { i.checked = false; });
      update();
    } else if (t.name.indexOf('plan-') === 0) {
      all('input[type="checkbox"]').forEach(function (i) { i.checked = false; });
      update();
    }
  });

  all('.g-back').forEach(function (b) {
    b.addEventListener('click', function () {
      var target = checkedEl('app') || document.querySelector('input[name="app"]');
      var pick = (checkedEl('plan-chatgpt') || checkedEl('plan-claude')) || target;
      picker.scrollIntoView();
      if (pick && pick.focus) pick.focus();
    });
  });

  window.addEventListener('pageshow', function () { clearAll(); update(); });
  clearAll();
  update();
})();
