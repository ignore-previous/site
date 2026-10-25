// The shoggoth on the home hero and the 404 page opens its eyes: a first reveal once per visit, eyes that peek
// open now and then, bigger events where several open at once, and on a desktop, open eyes that watch the cursor.
// The eyes are cut from the frames (assets/hero-eye-*.png) and site.css places them over the closed frame.
// Four more eyes in the dark body (x1, x2, x4, x5) join the peeks and every big event, and the mix changes each time.
// A peek is one to four eyes, scattered glances; a big event is always five or more at once.
// Only transform and opacity change, through the Web Animations API and CSSOM, which the CSP allows.
// With reduced motion nothing here starts: no timers, no eyes, and the closed mask shows.
// The one storage use: a sessionStorage flag, so the first reveal plays once per tab (every load without storage).

// Every duration and gap in milliseconds, every chance from 0 to 1. Change one line to retune.
const TIMING = {
  revealDelay: 700,        // the closed frame loaded, to the first slit appearing
  revealSlit: 210,         // the first slit fading in
  revealOpen: 630,         // the first eye opening slowly, with a hesitation halfway
  revealBlinkGap: 155,     // between the first eye's two blinks
  revealSecond: 210,       // its second blink, to the second eye popping open
  revealThenMin: 700,      // the second eye, to two more popping open: shortest
  revealThenMax: 1400,     // and longest
  revealQuick: 155,        // between those two
  revealHold: 175,         // the shared blink, to the close together
  slit: 63,                // a slit appearing before its eye pops open
  pop: 119,                // an eye popping open
  blink: 133,              // one blink, shut and open again
  blinkJitter: 28,         // a shared blink: most eyes start within this of each other
  lateChance: 0.35,        // a shared blink: chance one eye is a beat late
  late: 119,               // how late that eye is
  closeTogether: 560,      // the reveal and every big event end with all open eyes closing at once, this slowly
  ambientGapMin: 4000,     // ambient eyes: gap between peeks, shortest
  ambientGapMax: 10000,    // and longest
  peekOne: 0.15,           // a peek has one eye with this weight ...
  peekTwo: 0.35,           // ... two eyes with this one ...
  peekThree: 0.30,         // ... three ...
  peekFour: 0.20,          // ... or four (weights, they need not add up to 1; the mean is about 2.55)
  ambientSecondMin: 400,   // each further eye of a peek starts this long after the one before: shortest
  ambientSecondMax: 1900,  // and longest
  ambientSlit: 175,        // an ambient slit appearing
  ambientOpen: 315,        // an ambient eye opening from its slit
  ambientHoldMin: 2000,    // an ambient eye stays open: shortest
  ambientHoldMax: 5000,    // and longest
  ambientTwoBlinks: 0.4,   // chance an ambient eye blinks twice rather than once
  ambientClose: 315,       // an ambient eye closing on its own
  eventGapMin: 15000,      // big events: gap between them, shortest
  eventGapMax: 30000,      // and longest (a timed event also waits for an ambient peek to finish)
  deepChance: 0.25,        // chance a big event is the deepest (extra eyes on the body); 0 turns that depth off
  eventOpenGapMin: 84,     // a big event's eyes open this far apart: shortest
  eventOpenGapMax: 455,    // and longest
  eventSlowChance: 0.35,   // chance a big event's eye opens slowly instead of popping
  eventSlowOpen: 455,      // that slow opening
  eventBlinkWait: 140,     // a big event: the last eye open, to the shared blink
  eventHoldMin: 2000,      // all the event's eyes open, to the close together: shortest
  eventHoldMax: 3000,      // and longest
  eventBigChance: 0.4,     // a big event has six eyes with this chance, else five (body eyes join its two or three drawn ones)
  bodyLateMin: 250,        // each body eye joins an event this long after the last one opened: shortest
  bodyLateMax: 700,        // and longest
  bodyBlinkLagMin: 70,     // a body eye joining an event blinks this much after the others: shortest
  bodyBlinkLagMax: 220,    // and longest
  nearPx: 120,             // desktop: the cursor this close to the shoggoth starts a big event early
  nearCooldown: 8000,      // but not within this long of the last one ending
  turnLagMax: 250,         // desktop: one or two eyes turn to the cursor at once, the rest within this
  follow: 70,              // how quickly a turned eye keeps up with the cursor (time constant)
  easeBack: 150,           // a closing eye's pupil easing back to the middle
  reach: 240,              // the cursor this far from an eye turns its pupil all the way
  pupilX: 0.16,            // furthest a pupil moves sideways, as a share of its eye's width
  pupilY: 0.08,            // and up or down, as a share of its eye's height
};
// Debug flags for local checks, harmless in production: they do nothing unless the page URL has ?eyes=...
// (comma-separated). reveal: play the first reveal even if this tab has seen it. event: start a big event
// 1.5 s after the reveal or load. deep: every big event is the deepest. hold: stop once every eye of a reveal
// or event is open. log: log each eye's close start time when eyes close together, and each peek and event.

(function () {
  const mark = document.querySelector('[data-shoggoth]');
  const rest = mark && mark.querySelector('.f');
  if (!rest || !window.matchMedia || !window.IntersectionObserver || !mark.animate) return;

  const flags = new Set((new URLSearchParams(location.search).get('eyes') || '').split(','));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const desk = matchMedia('(pointer: fine) and (hover: hover)');
  const NAMES = ['1', '2', '3', 'x1', 'x2', 'x3', 'x4', 'x5'];
  const AMBIENT = ['1', '2', '3'];
  const REVEAL = ['1', '2', '3', 'x1'];
  const BODY = ['x1', 'x2', 'x4', 'x5'];  // the extra eyes in the dark body that peeks and events draw on
  const DEEP = NAMES.slice();  // the deepest event: all eight
  const POOL = AMBIENT.concat(BODY);  // the eyes a peek draws from
  const MAIN_SETS = [['1', '2'], ['1', '3'], ['2', '3'], ['1', '2', '3'], ['1', '2', '3']];  // a big event's drawn eyes (the triple twice: it is likelier)
  const SLIT = 0.07;       // a closed eye: squashed to a slit
  const STOP = {};         // thrown to end a sequence that was stopped or overtaken
  const log = flags.has('log') ? (...a) => console.log('[eyes] ' + Math.round(performance.now()) + ' ms:', ...a) : () => {};

  let eyes = null, running = false, onScreen = false, ready = false, revealed = false;
  let gen = 0, ambGen = 0, ambRun = null, busy = null, lastEventEnd = -Infinity;
  let ambientTimer = 0, eventTimer = 0, lastPeek = [], lastMain = '', lastJoin = '', lastDeep = false;
  let pointer = null, raf = 0, lastFrame = 0;
  const timers = new Set();

  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (list) => list[Math.floor(Math.random() * list.length)];
  const shuffle = (list) => list.map((v) => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map((p) => p[1]);
  const later = (ms, fn) => { const id = setTimeout(() => { timers.delete(id); fn(); }, ms); timers.add(id); return id; };
  const wait = (ms) => new Promise((done) => later(ms, done));
  const never = new Promise(() => {});

  function build() {
    if (eyes) return;
    eyes = {};
    for (const n of NAMES) {
      const el = document.createElement('span');
      el.className = 'eye eye-' + n;
      el.setAttribute('aria-hidden', 'true');
      const pupil = document.createElement('span');
      el.appendChild(pupil);
      mark.appendChild(el);
      eyes[n] = { n, el, pupil, tilt: parseFloat(getComputedStyle(el).getPropertyValue('--tilt')) || 0, flip: parseFloat(getComputedStyle(el).getPropertyValue('--flip')) || 1, anim: null, open: false, px: 0, py: 0, lagUntil: 0 };
    }
  }

  // An eye opens and closes by squashing across its long axis, which is tilted like the drawing.
  const shape = (e, s) => `rotate(${e.tilt}deg) scaleY(${s}) rotate(${-e.tilt}deg)`;
  function play(e, frames, ms, delay) {
    const old = e.anim;
    e.anim = e.el.animate(frames.map((f) => Object.assign({ easing: 'ease-in-out' }, f)), { duration: ms, delay: delay || 0, fill: 'both' });
    if (old) old.cancel();
    return e.anim;
  }
  const done = (a) => a.finished.then(() => {}, () => never);  // a cancelled animation ends its sequence
  function open(e, slitMs, openMs, slow) {
    e.open = true;
    e.lagUntil = performance.now() + rand(0, TIMING.turnLagMax);
    const k = slitMs / (slitMs + openMs);
    const f = [{ opacity: 0, transform: shape(e, SLIT) }, { opacity: 1, transform: shape(e, SLIT), offset: k }];
    if (slow) f.push({ opacity: 1, transform: shape(e, 0.42), offset: k + (1 - k) * 0.45 }, { opacity: 1, transform: shape(e, 0.36), offset: k + (1 - k) * 0.62 });
    f.push({ opacity: 1, transform: shape(e, 1) });
    kick();
    return done(play(e, f, slitMs + openMs));
  }
  function blink(e, delay) {
    return done(play(e, [{ opacity: 1, transform: shape(e, 1) }, { opacity: 1, transform: shape(e, SLIT), offset: 0.45 }, { opacity: 1, transform: shape(e, 1) }], TIMING.blink, delay));
  }
  function closeAnim(e, ms) {
    e.open = false;
    kick();
    return play(e, [{ opacity: 1, transform: shape(e, 1) }, { opacity: 1, transform: shape(e, SLIT), offset: 0.8 }, { opacity: 0, transform: shape(e, SLIT) }], ms);
  }
  const close = (e, ms) => done(closeAnim(e, ms));

  // Every listed eye blinks, mostly in time, sometimes with one a beat late. Body eyes that joined
  // the event late (joiners) blink a little after the rest, on their own timing.
  function blinkTogether(list, joiners) {
    const late = Math.random() < TIMING.lateChance ? pick(list) : null;
    return Promise.all(list.map((e) => blink(e, (e === late ? TIMING.late : rand(0, TIMING.blinkJitter)) + (joiners && joiners.includes(e) ? rand(TIMING.bodyBlinkLagMin, TIMING.bodyBlinkLagMax) : 0))));
  }
  // Every listed eye starts closing at the same moment, in one slow close.
  function closeTogether(list) {
    const anims = list.map((e) => closeAnim(e, TIMING.closeTogether));
    if (flags.has('log')) Promise.all(anims.map((a) => a.ready)).then(() => log('close together:', list.map((e, i) => e.n + ' at ' + anims[i].startTime.toFixed(1)).join(', ')));
    return Promise.all(anims.map(done));
  }
  function guard(g, promise) {
    return promise.then(() => { if (g !== gen) throw STOP; });
  }
  const quiet = (err) => { if (err !== STOP) throw err; };

  function firstVisit() {
    if (revealed) return false;
    revealed = true;
    if (flags.has('reveal')) return true;
    try {
      if (sessionStorage.getItem('shoggoth-revealed')) return false;
      sessionStorage.setItem('shoggoth-revealed', '1');
    } catch (err) { /* no storage: the reveal plays on every load */ }
    return true;
  }

  // First reveal: one slit opens slowly and blinks twice, a second eye pops open, then two more in quick
  // succession; they blink together and all close at once.
  async function reveal(g) {
    busy = 'reveal';
    log('reveal');
    const [a, b, c, d] = REVEAL.map((n) => eyes[n]);
    await guard(g, wait(TIMING.revealDelay));
    await guard(g, open(a, TIMING.revealSlit, TIMING.revealOpen, true));
    await guard(g, wait(TIMING.revealBlinkGap));
    await guard(g, blink(a));
    await guard(g, wait(TIMING.revealBlinkGap));
    await guard(g, blink(a));
    await guard(g, wait(TIMING.revealSecond));
    await guard(g, open(b, TIMING.slit, TIMING.pop));
    await guard(g, wait(rand(TIMING.revealThenMin, TIMING.revealThenMax)));
    open(c, TIMING.slit, TIMING.pop);
    await guard(g, wait(TIMING.revealQuick));
    await guard(g, open(d, TIMING.slit, TIMING.pop));
    if (flags.has('hold')) return;
    await guard(g, wait(TIMING.revealQuick));
    await guard(g, blinkTogether([a, b, c, d]));
    await guard(g, wait(TIMING.revealHold));
    await guard(g, closeTogether([a, b, c, d]));
    busy = null;
    lastEventEnd = performance.now();
    log('reveal closed');
    scheduleAmbient();
    scheduleEvent(flags.has('event') ? 1500 : undefined);
  }

  // Ambient: one to four eyes peek, each from its own slit, on its own timing, blinking once or twice and
  // closing on its own, so a peek reads as scattered glances rather than something happening together.
  function scheduleAmbient(ms) {
    clearTimeout(ambientTimer);
    timers.delete(ambientTimer);
    ambientTimer = later(ms === undefined ? rand(TIMING.ambientGapMin, TIMING.ambientGapMax) : ms, () => ambient(gen).catch(quiet));
  }
  // How many eyes peek: by the weights, and a peek usually has a different count from the last one.
  function peekCount() {
    const w = [TIMING.peekOne, TIMING.peekTwo, TIMING.peekThree, TIMING.peekFour];
    const draw = () => { let r = Math.random() * w.reduce((x, y) => x + y, 0); for (let i = 0; i < w.length; i++) { r -= w[i]; if (r < 0) return i + 1; } return w.length; };
    let n = draw();
    for (let i = 0; i < 2 && n === lastPeek.length; i++) n = draw();
    return n;
  }
  // Which eyes, in the order they start: none of the last peek's eyes if there are enough others, else one of
  // them (seven eyes, four at most each time, so at most one is shared). Each set has a fresh eye, so never the same.
  function peekSet(n) {
    const set = shuffle(POOL.filter((x) => !lastPeek.includes(x))).slice(0, n);
    const old = shuffle(lastPeek);
    while (set.length < n) set.push(old.shift());
    return shuffle(set);
  }
  async function ambient(g) {
    if (busy) return scheduleAmbient();
    const ag = ++ambGen;
    const check = () => { if (g !== gen || ag !== ambGen) throw STOP; };
    const set = peekSet(peekCount());
    lastPeek = set;
    log('peek set', set.join(' '));
    const peek = async (n) => {
      const e = eyes[n];
      log('peek opens', n);
      await open(e, TIMING.ambientSlit, TIMING.ambientOpen); check();
      const hold = rand(TIMING.ambientHoldMin, TIMING.ambientHoldMax);
      const times = Math.random() < TIMING.ambientTwoBlinks ? [rand(0.15, 0.4), rand(0.55, 0.8)] : [rand(0.25, 0.7)];
      let at = 0;
      for (const t of times) {
        await wait(hold * t - at); check();
        await blink(e); check();
        at = hold * t + TIMING.blink;
      }
      await wait(Math.max(0, hold - at)); check();
      await close(e, TIMING.ambientClose);
      log('peek closed', n);
    };
    let start = 0;
    ambRun = Promise.all(set.map((n, i) => {
      if (i) start += rand(TIMING.ambientSecondMin, TIMING.ambientSecondMax);
      return i ? wait(start).then(() => { check(); return peek(n); }) : peek(n);
    }));
    await ambRun;
    check();
    scheduleAmbient();
  }

  // Big events: several eyes open in an uneven order, blink mostly in time, hold, then close together.
  function scheduleEvent(ms) {
    clearTimeout(eventTimer);
    timers.delete(eventTimer);
    eventTimer = later(ms === undefined ? rand(TIMING.eventGapMin, TIMING.eventGapMax) : ms, () => bigEvent(gen).catch(quiet));
  }
  async function bigEvent(g, early) {
    if (busy) return;
    busy = 'event';
    clearTimeout(eventTimer);
    timers.delete(eventTimer);
    // A timed event lets the ambient eyes finish their peek first. One started early by the
    // cursor doesn't wait: any ambient eye still open closes, then the event begins.
    if (!early && ambRun) await guard(g, ambRun.catch(() => {}));
    ambGen++;
    await guard(g, Promise.all(AMBIENT.concat(BODY).map(async (n) => {
      const e = eyes[n];
      if (e.anim && e.anim.playState === 'running') await done(e.anim);
      if (e.open) await close(e, TIMING.ambientClose);
    })));
    // Which eyes: the deepest (all eight) is never twice running. Otherwise two or three of the drawn eyes, never
    // the same set as the last event, plus enough body eyes to make five or six, never the same body set twice.
    const deep = flags.has('deep') || (!lastDeep && Math.random() < TIMING.deepChance);
    const main = deep ? DEEP : pick(MAIN_SETS.filter((set) => set.join('') !== lastMain));
    let join = [];
    if (!deep) {
      const need = (Math.random() < TIMING.eventBigChance ? 6 : 5) - main.length;
      join = shuffle(BODY.filter((n) => !lastJoin.includes(n))).concat(shuffle(BODY.filter((n) => lastJoin.includes(n)))).slice(0, need);
      if (join.slice().sort().join('') === lastJoin && main.length + join.length > 5) join = join.slice(1);
    }
    lastDeep = deep;
    lastMain = deep ? 'deep' : main.join('');
    lastJoin = join.slice().sort().join('');
    const list = shuffle(main.map((n) => eyes[n]));
    log('event opens', list.map((e) => e.n).join(' '));
    const opening = [];
    for (let i = 0; i < list.length; i++) {
      if (i) await guard(g, wait(rand(TIMING.eventOpenGapMin, TIMING.eventOpenGapMax)));
      const slow = Math.random() < TIMING.eventSlowChance;
      opening.push(open(list[i], slow ? TIMING.ambientSlit : TIMING.slit, slow ? TIMING.eventSlowOpen : TIMING.pop));
    }
    // Unless it is the deepest, two to four body eyes join a beat after the rest, each a little later than the last.
    const joiners = join.map((n) => eyes[n]);
    for (const e of joiners) {
      await guard(g, wait(rand(TIMING.bodyLateMin, TIMING.bodyLateMax)));
      log('event body eye opens', e.n);
      const slow = Math.random() < TIMING.eventSlowChance;
      opening.push(open(e, slow ? TIMING.ambientSlit : TIMING.slit, slow ? TIMING.eventSlowOpen : TIMING.pop));
    }
    list.push(...joiners);
    await guard(g, Promise.all(opening));
    if (flags.has('hold')) return;
    const hold = rand(TIMING.eventHoldMin, TIMING.eventHoldMax);
    await guard(g, wait(TIMING.eventBlinkWait));
    await guard(g, blinkTogether(list, joiners));
    await guard(g, wait(Math.max(0, hold - TIMING.eventBlinkWait - TIMING.blink)));
    await guard(g, closeTogether(list));
    busy = null;
    lastEventEnd = performance.now();
    log('event closed');
    scheduleAmbient();
    scheduleEvent();
  }

  // Desktop: open eyes follow the cursor. One or two turn first, the rest within TIMING.turnLagMax.
  function restagger() {
    const now = performance.now();
    const open = shuffle(NAMES.map((n) => eyes[n]).filter((e) => e.open));
    const leaders = Math.random() < 0.5 ? 1 : 2;
    open.forEach((e, i) => { e.lagUntil = i < leaders ? now : now + rand(60, TIMING.turnLagMax); });
  }
  function kick() {
    if (!raf && eyes) { lastFrame = performance.now(); raf = requestAnimationFrame(frame); }
  }
  function frame(t) {
    raf = 0;
    const dt = Math.min(64, t - lastFrame);
    lastFrame = t;
    const box = mark.getBoundingClientRect();
    let again = false;
    for (const n of NAMES) {
      const e = eyes[n];
      let tx = 0, ty = 0, tau = TIMING.easeBack / 3;
      if (e.open && pointer && desk.matches) {
        if (t < e.lagUntil) { tx = e.px; ty = e.py; again = true; }
        else {
          const w = e.el.offsetWidth, h = e.el.offsetHeight;
          const dx = pointer.x - (box.left + mark.clientLeft + e.el.offsetLeft + w / 2);
          const dy = pointer.y - (box.top + mark.clientTop + e.el.offsetTop + h / 2);
          const d = Math.hypot(dx, dy) || 1, f = Math.min(1, d / TIMING.reach);
          tx = dx / d * f * w * TIMING.pupilX;
          ty = dy / d * f * h * TIMING.pupilY;
          tau = TIMING.follow;
        }
      }
      if (tx === e.px && ty === e.py) continue;
      const k = 1 - Math.exp(-dt / tau);
      e.px += (tx - e.px) * k;
      e.py += (ty - e.py) * k;
      if (Math.abs(tx - e.px) < 0.05 && Math.abs(ty - e.py) < 0.05) { e.px = tx; e.py = ty; } else again = true;
      e.pupil.style.setProperty('transform', `translate(${(e.px * e.flip).toFixed(2)}px, ${e.py.toFixed(2)}px)`);
    }
    if (again) raf = requestAnimationFrame(frame);
  }
  document.addEventListener('pointermove', (ev) => {
    if (ev.pointerType !== 'mouse' || !running || !desk.matches) return;
    const now = performance.now();
    const fresh = !pointer || now - pointer.t > 400;
    pointer = { x: ev.clientX, y: ev.clientY, t: now };
    if (fresh) restagger();
    kick();
    // The cursor coming near starts a big event early.
    if (busy || now - lastEventEnd < TIMING.nearCooldown || !revealed) return;
    const b = mark.getBoundingClientRect();
    const dx = Math.max(b.left - ev.clientX, 0, ev.clientX - b.right), dy = Math.max(b.top - ev.clientY, 0, ev.clientY - b.bottom);
    if (Math.hypot(dx, dy) < TIMING.nearPx) bigEvent(gen, true).catch(quiet);
  }, { passive: true });
  document.addEventListener('pointerout', (ev) => {
    if (ev.pointerType === 'mouse' && !ev.relatedTarget) { pointer = null; kick(); }
  }, { passive: true });

  function start() {
    log('start');
    running = true;
    gen++;
    build();
    if (firstVisit()) reveal(gen).catch(quiet);
    else {
      scheduleAmbient();
      scheduleEvent(flags.has('event') ? 1500 : undefined);
    }
  }
  function stop() {
    log('stop');
    running = false;
    gen++;
    ambGen++;
    ambRun = null;
    busy = null;
    timers.forEach(clearTimeout);
    timers.clear();
    cancelAnimationFrame(raf);
    raf = 0;
    if (!eyes) return;
    for (const n of NAMES) {
      const e = eyes[n];
      if (e.anim) e.anim.cancel();
      e.anim = null;
      e.open = false;
      e.px = e.py = 0;
      e.pupil.style.removeProperty('transform');
    }
  }
  // Runs only while the shoggoth is on screen, the tab is visible and motion is allowed.
  function update() {
    const ok = ready && onScreen && !document.hidden && !reduce.matches;
    if (ok && !running) start();
    else if (!ok && running) stop();
  }

  if (reduce.matches) {
    reduce.addEventListener('change', setup, { once: true });
  } else setup();
  function setup() {
    reduce.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    new IntersectionObserver((entries) => { onScreen = entries[entries.length - 1].isIntersecting; update(); }).observe(mark);
    const loaded = () => { ready = true; update(); };
    if (rest.complete && rest.naturalWidth) loaded();
    else rest.addEventListener('load', loaded, { once: true });
  }
})();
