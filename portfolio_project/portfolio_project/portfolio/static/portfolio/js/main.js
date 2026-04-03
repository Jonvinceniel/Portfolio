// Nav toggle for mobile
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Animate skill bars on scroll
function animateSkills() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    bar.style.width = bar.getAttribute('data-pct') + '%';
  });
}

const skillsSection = document.querySelector('.skills-categories');
if (skillsSection) {
  document.querySelectorAll('.skill-fill').forEach(b => b.style.width = '0');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateSkills(); observer.disconnect(); }
    });
  }, { threshold: 0.2 });
  observer.observe(skillsSection);
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.style.borderBottomColor = window.scrollY > 30
    ? 'rgba(200,169,126,0.25)' : 'rgba(200,169,126,0.15)';
});

// Animated Dot Grid Background
(function() {
  const canvas = document.createElement('canvas');
  canvas.id = 'dot-grid';
  canvas.style.cssText = `
    position:fixed;top:0;left:0;width:100%;height:100%;
    pointer-events:none;z-index:0;opacity:0.35;
  `;
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let W, H, dots = [];
  const SPACING = 32;
  const COLOR = '200,169,126';

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildDots();
  }

  function buildDots() {
    dots = [];
    const cols = Math.ceil(W / SPACING) + 1;
    const rows = Math.ceil(H / SPACING) + 1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({
          x: c * SPACING,
          y: r * SPACING,
          base: 0.3 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
          speed: 0.003 + Math.random() * 0.005,
        });
      }
    }
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    frame++;
    dots.forEach(d => {
      const alpha = d.base + Math.sin(d.phase + frame * d.speed) * 0.25;
      const radius = 1 + Math.sin(d.phase + frame * d.speed * 0.7) * 0.4;
      ctx.beginPath();
      ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${COLOR},${alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();

// Floating Code Particles
(function() {
  const canvas = document.createElement('canvas');
  canvas.id = 'code-particles';
  canvas.style.cssText = `
    position:fixed;top:0;left:0;width:100%;height:100%;
    pointer-events:none;z-index:0;opacity:1;
  `;
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let W, H;

  const snippets = [
    'def portfolio():', 'import django', 'git commit -m',
    'class View:', 'return render()', 'SELECT * FROM',
    'npm install', '{ }', '/>', 'const dev =',
    'if __name__:', 'urls.py', 'models.py', '<!DOCTYPE>',
    'python manage.py', '[]', '=>', 'async def',
    'border-radius:', 'flex-direction:', '0x1A2F',
  ];

  let particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function spawn() {
    particles.push({
      text: snippets[Math.floor(Math.random() * snippets.length)],
      x: Math.random() * W,
      y: H + 20,
      speed: 0.2 + Math.random() * 0.4,
      opacity: 0,
      maxOpacity: 0.15 + Math.random() * 0.15,
      fadeIn: true,
      size: 10 + Math.random() * 4,
      drift: (Math.random() - 0.5) * 0.2,
    });
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    frame++;
    if (frame % 60 === 0) spawn();
    particles = particles.filter(p => {
      p.y -= p.speed;
      p.x += p.drift;
      if (p.fadeIn && p.opacity < p.maxOpacity) p.opacity += 0.001;
      if (p.y < H * 0.3) p.opacity -= 0.0008;
      if (p.opacity <= 0 && !p.fadeIn) return false;
      if (p.y < -20) return false;
      ctx.font = `${p.size}px 'DM Mono', monospace`;
      ctx.fillStyle = `rgba(200,169,126,${p.opacity})`;
      ctx.fillText(p.text, p.x, p.y);
      return true;
    });
    requestAnimationFrame(draw);
  }

  for (let i = 0; i < 15; i++) setTimeout(spawn, i * 300);
  window.addEventListener('resize', resize);
  resize();
  draw();
})();