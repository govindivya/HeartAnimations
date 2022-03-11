var canvas = /** @type {HTMLCanvasElement} */ (
  document.getElementById("canvas")
);
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.onresize = (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

class Particle {
  constructor(x, y) {
    // this.color = "hsl(" + Math.random() * 360 + " ,100%,50%)";
    this.color = "red"
    this.radius = 1;
    this.x = x;
    this.y = y;
    this.orginalX = x;
    this.orginalY = y;
    this.factor = 1;
  }
  update() {
    this.factor += 0.08;
    this.radius += 0.007;
    this.x = this.factor * this.orginalX;
    this.y = this.factor * this.orginalY;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createPoints() {
  for (let t = 0; t <= 2 * Math.PI; t += 0.05) {
    let x = 16 * Math.pow(Math.sin(t), 3);
    let y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);
    let p = {
      x: -x,
      y: -y,
    };
    console.log(x, y);
    points.push({ ...p });
  }
}

function createParticles() {
  for (let i = 0; i < points.length; i++) {
    ParticlesArray.push(new Particle(points[i].x, points[i].y));
  }
}
function handleParticle() {
  for (let i = 0; i < ParticlesArray.length; i++) {
    ParticlesArray[i].update();
    ParticlesArray[i].draw(ctx);
    if (ParticlesArray[i].factor > 10) {
      let x = ParticlesArray[i].orginalX;
      let y = ParticlesArray[i].orginalY;
      delete ParticlesArray[i];
      ParticlesArray.splice(i, 1);
    }
  }
}

var ParticlesArray = [];
var points = [];
createPoints();
createParticles();

function animate() {
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.09)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.translate(canvas.width / 2, canvas.height / 2);
  handleParticle();
  requestAnimationFrame(animate);
  ctx.restore();
}
const interval = setInterval(() => {
  createParticles();
}, 400);

animate();
