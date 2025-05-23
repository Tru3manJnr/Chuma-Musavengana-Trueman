document.addEventListener('DOMContentLoaded', () => {
  // Highlight active nav link based on current page
  const navLinks = document.querySelectorAll('header nav ul li a');
  const currentPage = window.location.pathname.split('/').pop();

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Cursor follower implementation
  const cursorFollower = document.createElement('div');
  cursorFollower.classList.add('cursor-follower');
  document.body.appendChild(cursorFollower);

  let mouseX = 0;
  let mouseY = 0;
  let posX = 0;
  let posY = 0;

  const speed = 0.2; // lower is slower

  function animateCursor() {
    posX += (mouseX - posX) * speed;
    posY += (mouseY - posY) * speed;

    cursorFollower.style.transform = `translate(${posX}px, ${posY}px) translate(-50%, -50%)`;

    requestAnimationFrame(animateCursor);
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  animateCursor();

  // Background bouncing balls animation
  const canvas = document.createElement('canvas');
  canvas.id = 'background-canvas';

  // Append canvas inside section#home or fallback to body
  const container = document.querySelector('section#home') || document.body;
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  let width, height;
  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
  }
  resize();
  window.addEventListener('resize', resize);

  class Ball {
    constructor() {
      this.radius = Math.random() * 15 + 5;
      this.x = Math.random() * (width - 2 * this.radius) + this.radius;
      this.y = Math.random() * (height - 2 * this.radius) + this.radius;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.color = `rgba(0, 112, 243, ${Math.random() * 0.5 + 0.3})`;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x + this.radius > width || this.x - this.radius < 0) {
        this.vx = -this.vx;
      }
      if (this.y + this.radius > height || this.y - this.radius < 0) {
        this.vy = -this.vy;
      }
    }
  }

  const balls = [];
  const ballCount = 30;
  for (let i = 0; i < ballCount; i++) {
    balls.push(new Ball());
  }

  function animateBalls() {
    ctx.clearRect(0, 0, width, height);
    balls.forEach(ball => {
      ball.update();
      ball.draw();
    });
    requestAnimationFrame(animateBalls);
  }

  animateBalls();

  // Modal open and close functionality
  const openModalBtn = document.getElementById('openModalBtn');
  const contactModal = document.getElementById('contactModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  openModalBtn.addEventListener('click', () => {
    contactModal.style.display = 'block';
  });

  closeModalBtn.addEventListener('click', () => {
    contactModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === contactModal) {
      contactModal.style.display = 'none';
    }
  });

  // Handle help form submission to perform web search
  const helpForm = document.getElementById('helpForm');
  helpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = document.getElementById('searchQuery').value.trim();
    if (query) {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      window.open(searchUrl, '_blank');
      contactModal.style.display = 'none';
      helpForm.reset();
    }
  });
});
