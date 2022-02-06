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
  constructor(x, y,index) {
    // this.color = "hsl(" + Math.random() * 360 + " ,100%,50%)";
    this.color = "red";
    this.radius = 1;
    this.factor =1;
    if(index==1){
        this.factor=3;
    }
    if(index==2){
        this.factor=2;
    }
    if(index==3){
        this.factor=1
    }
    this.x = this.factor*x;
    this.y = y*this.factor;
    this.xOriginal = this.x;
    this.yOriginal = this.y;
    this.originaFactor=this.factor;
  }
  update() {
    this.factor += 0.05;
    this.radius += 0.02;
    if (this.factor>5) {
      this.factor = this.originaFactor;
      this.radius = 1;
    }
    this.x = this.xOriginal * this.factor;
    this.y = this.yOriginal * this.factor;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createPoints(params) {
  for (let t = 0; t <= 2 * Math.PI; t += 0.05) {
    let x = 16 * Math.pow(Math.sin(t), 3);
    let y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);
    let p = {
      x: - x,
      y: -y,
    };
    points.push({...p});
    pointsCopy1.push({...p});
    pointsCopy2.push({...p})
    
  }
}

function createParticles() {
  for (let i = 0; i < points.length; i++) {
    ParticlesArray.push(new Particle(points[i].x, points[i].y,1));
    ParticlesArray1.push(new Particle(pointsCopy1[i].x, pointsCopy1[i].y,2));
    ParticlesArray2.push(new Particle(pointsCopy2[i].x, pointsCopy2[i].y,3));
  }
}

var ParticlesArray = [];
var ParticlesArray1 = [];
var ParticlesArray2 = [];

var points = [];
var pointsCopy1 = [];
var pointsCopy2 = [];

createPoints();
createParticles();



function handleParticle() {
  for (let i = 0; i < ParticlesArray.length; i++) {
    ParticlesArray[i].update();
    ParticlesArray[i].draw();
    ParticlesArray1[i].update();
    ParticlesArray1[i].draw();
    ParticlesArray2[i].update();
    ParticlesArray2[i].draw();
  }
}

function animate() {
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.09)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.translate(canvas.width / 2, canvas.height / 2);
  handleParticle();
  requestAnimationFrame(animate);
  ctx.restore();
}
animate();
