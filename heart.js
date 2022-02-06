// eqn is x^2 +(y-(x*x)^(1/3))^2=heart

// x=16*sin(t)^3;
// y=13*cos(t) - 5*cos(2t)-2cos(3t)-cos(4t);

var canvas = /** @type {HTMLCanvasElement} */ (
  document.getElementById("canvas")
);
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.shadowColor='yellow'
ctx.shadowOffsetX=5;
ctx.shadowOffsetY=5;
ctx.shadowBlur=10

window.onresize = (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

function gradient(a, b) {
  return (b.y - a.y) / (b.x - a.x);
}
ctx.setLineDash([0]);
ctx.lineWidth = 5;
ctx.strokeStyle = "red";

function bzCurve(points, f, t) {
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  var m = 0;
  var dx1 = 0;
  var dy1 = 0;

  var preP = points[0];

  for (var i = 1; i < points.length; i++) {
    var curP = points[i];
    nexP = points[i + 1];
    if (nexP) {
      m = gradient(preP, nexP);
      dx2 = (nexP.x - curP.x) * -f;
      dy2 = dx2 * m * t;
    } else {
      dx2 = 0;
      dy2 = 0;
    }

    ctx.bezierCurveTo(
      preP.x - dx1,
      preP.y - dy1,
      curP.x + dx2,
      curP.y + dy2,
      curP.x,
      curP.y
    );

    dx1 = dx2;
    dy1 = dy2;
    preP = curP;
  }
  ctx.stroke();
  ctx.fillStyle = "blue";
  ctx.fill();
}

var points = [];
for (let t = 0; t < 2 * Math.PI; t += 0.001) {
  let x = 16 * Math.pow(Math.sin(t), 3);
  let y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t);
  let p = {
    x: -2 * x,
    y: -2 * y,
  };
  points.push(p);
}

var factor = 1;
var pointsCopy = [...points];

function animate(params) {
  for (let i = 0; i < points.length; i++) {
    points[i] = {
      x: pointsCopy[i].x * factor,
      y: pointsCopy[i].y * factor,
    };
  }
  factor += 0.03;
  if (factor > 5) {
    factor = 1;
  }
  ctx.save(),
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(canvas.width / 2, canvas.height / 2);
  bzCurve(points, 0.3, 1);
  ctx.restore();

  requestAnimationFrame(animate);
}

animate();
