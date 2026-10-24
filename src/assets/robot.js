// The 404 robot watches the pointer and blinks while idle.
// SVG attributes keep movement compatible with the site's strict CSP.
const robot = document.querySelector('.lost-robot');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const eyes = [...robot.querySelectorAll('.r-ink')].map(node => ({
  node, x: Number(node.getAttribute('cx')), y: Number(node.getAttribute('cy')),
  dx: 0, dy: 0, tx: 0, ty: 0,
}));
let frame = 0;
let blinkTimer = 0;
let openTimer = 0;
let lastInput = 0;
let lastFrame = 0;
const active = () => !motion.matches && !document.hidden;

function draw(time) {
  frame = 0;
  if (!active()) return;
  const ease = 1 - Math.exp(-Math.min(time - lastFrame, 64) / 70);
  lastFrame = time;
  let moving = false;
  for (const eye of eyes) {
    eye.dx += (eye.tx - eye.dx) * ease;
    eye.dy += (eye.ty - eye.dy) * ease;
    if (Math.hypot(eye.tx - eye.dx, eye.ty - eye.dy) < .01) {
      eye.dx = eye.tx;
      eye.dy = eye.ty;
    } else moving = true;
    eye.node.setAttribute('cx', eye.x + eye.dx);
    eye.node.setAttribute('cy', eye.y + eye.dy);
  }
  if (moving) frame = requestAnimationFrame(draw);
}

function animate() {
  if (!frame && active()) {
    lastFrame = performance.now();
    frame = requestAnimationFrame(draw);
  }
}

function watch(event) {
  if (!active()) return;
  const box = robot.getBoundingClientRect();
  if (!box.width) return;
  lastInput = performance.now();
  for (const eye of eyes) {
    const dx = (event.clientX - box.left) * 40 / box.width - eye.x;
    const dy = (event.clientY - box.top) * 40 / box.height - eye.y;
    const scale = 2 / Math.max(2, Math.hypot(dx, dy));
    eye.tx = dx * scale;
    eye.ty = dy * scale;
  }
  animate();
}

function centre() {
  for (const eye of eyes) eye.tx = eye.ty = 0;
  animate();
}

function scheduleBlink() {
  if (!active()) return;
  blinkTimer = setTimeout(() => {
    if (!active()) return;
    if (performance.now() - lastInput > 1000) {
      robot.classList.add('is-blinking');
      openTimer = setTimeout(() => robot.classList.remove('is-blinking'), 150);
    }
    scheduleBlink();
  }, 3000 + Math.random() * 4000);
}

function reset() {
  cancelAnimationFrame(frame);
  frame = 0;
  clearTimeout(blinkTimer);
  clearTimeout(openTimer);
  robot.classList.remove('is-blinking');
  for (const eye of eyes) {
    eye.dx = eye.dy = eye.tx = eye.ty = 0;
    eye.node.setAttribute('cx', eye.x);
    eye.node.setAttribute('cy', eye.y);
  }
  scheduleBlink();
}

document.addEventListener('pointermove', event => {
  if (event.pointerType === 'mouse') watch(event);
}, { passive: true });
document.addEventListener('pointerdown', watch, { passive: true });
document.addEventListener('pointerout', event => {
  if (event.pointerType === 'mouse' && !event.relatedTarget) centre();
}, { passive: true });
window.addEventListener('blur', centre, { passive: true });
document.addEventListener('visibilitychange', reset, { passive: true });
motion.addEventListener('change', reset, { passive: true });
reset();
