/**
 * cursor.js — Custom animated cursor with particle trail
 */

(function () {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let animFrame;
  const EASE = 0.12;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = mouseX - 4 + 'px';
    dot.style.top = mouseY - 4 + 'px';

    // Spawn particle trail
    spawnParticle(mouseX, mouseY);
  });

  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * EASE;
    ringY += (mouseY - ringY) * EASE;
    ring.style.left = ringX - 18 + 'px';
    ring.style.top = ringY - 18 + 'px';
    animFrame = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hovering interactive elements
  const interactiveSelectors = 'a, button, input, .nav-item, .path-node, .quest-card, .reward-card, .lang-tab, .compete-card, [onclick]';

  document.addEventListener('mouseover', (e) => {
    if (e.target.matches(interactiveSelectors) || e.target.closest(interactiveSelectors)) {
      ring.classList.add('hovering');
      dot.style.transform = 'scale(1.8)';
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.matches(interactiveSelectors) || e.target.closest(interactiveSelectors)) {
      ring.classList.remove('hovering');
      dot.style.transform = 'scale(1)';
    }
  });

  // Click effect
  document.addEventListener('mousedown', () => {
    dot.style.transform = 'scale(0.6)';
    ring.style.transform = 'scale(0.85)';
  });
  document.addEventListener('mouseup', () => {
    dot.style.transform = 'scale(1)';
    ring.style.transform = 'scale(1)';
  });

  // Particle trail
  const COLORS = ['#7C3AED', '#A78BFA', '#06B6D4', '#F59E0B', '#ffffff'];
  let particleThrottle = 0;

  function spawnParticle(x, y) {
    particleThrottle++;
    if (particleThrottle % 3 !== 0) return; // throttle to every 3rd move

    const p = document.createElement('div');
    const size = Math.random() * 6 + 3;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    p.style.cssText = `
      position: fixed;
      left: ${x - size / 2}px;
      top: ${y - size / 2}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 99990;
      opacity: 0.85;
      transition: none;
    `;
    document.body.appendChild(p);

    const dx = (Math.random() - 0.5) * 20;
    const dy = (Math.random() - 0.5) * 20;
    let opacity = 0.85;
    let frame = 0;

    function fade() {
      frame++;
      opacity -= 0.07;
      if (opacity <= 0) {
        p.remove();
        return;
      }
      p.style.opacity = opacity;
      p.style.left = parseFloat(p.style.left) + dx * 0.05 + 'px';
      p.style.top = parseFloat(p.style.top) + dy * 0.05 + 'px';
      p.style.transform = `scale(${0.8 - frame * 0.04})`;
      requestAnimationFrame(fade);
    }
    requestAnimationFrame(fade);
  }
})();
