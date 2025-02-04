// Simple animated starfield using Canvas API
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
const numStars = 200; // Increase for a denser starfield

// Initialize canvas dimensions and stars
function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      alpha: Math.random(),
      speed: Math.random() * 0.5 + 0.2
    });
  }
}

// Draw stars on canvas
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255,' + star.alpha + ')';
    ctx.fill();
  }
}

// Update star positions and brightness
function updateStars() {
  for (let star of stars) {
    star.y += star.speed;
    // Create a subtle twinkling effect
    star.alpha = 0.5 + 0.5 * Math.sin(Date.now() * 0.002 + star.x);
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  }
}

// Animation loop for starfield
function animate() {
  updateStars();
  drawStars();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', initCanvas);
initCanvas();
animate();
