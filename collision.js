const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "rgb(255, 255, 15)";

class Circle {

constructor(x, y, radius, color, text, speed){

this.posX = x;
this.posY = y;
this.radius = radius;

this.originalColor = color; // color original
this.color = color;

this.text = text;
this.speed = speed;

this.dx = 1 * this.speed;
this.dy = 1 * this.speed;

this.isColliding = false; // nuevo atributo
}

draw(context){

context.beginPath();

context.strokeStyle = this.color;

context.textAlign = "center";
context.textBaseline = "middle";
context.font = "20px Arial";

context.fillText(this.text, this.posX, this.posY);

context.lineWidth = 2;

context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);

context.stroke();
context.closePath();

}

update(context){

this.draw(context);

// movimiento
this.posX += this.dx;
this.posY += this.dy;

// rebote paredes
if (this.posX + this.radius > window_width || this.posX - this.radius < 0){
this.dx = -this.dx;
}

if (this.posY + this.radius > window_height || this.posY - this.radius < 0){
this.dy = -this.dy;
}

}

}

// array de círculos
let circles = [];

function generateCircles(n){

for(let i=0;i<n;i++){

let radius = Math.random()*30 + 20;

let x = Math.random()*(window_width - radius*2) + radius;
let y = Math.random()*(window_height - radius*2) + radius;

let color = `#${Math.floor(Math.random()*16777215).toString(16)}`;

let speed = Math.random()*4 + 1; // velocidad entre 1 y 5

let text = `C${i+1}`;

circles.push(new Circle(x,y,radius,color,text,speed));

}

}

// DETECCIÓN DE COLISIONES
function detectCollisions(){

// resetear estado
circles.forEach(circle=>{
circle.isColliding=false;
});

for(let i=0;i<circles.length;i++){

for(let j=i+1;j<circles.length;j++){

let c1 = circles[i];
let c2 = circles[j];

// fórmula de distancia
let dx = c1.posX - c2.posX;
let dy = c1.posY - c2.posY;

let distance = Math.sqrt(dx*dx + dy*dy);

if(distance < c1.radius + c2.radius){

c1.isColliding = true;
c2.isColliding = true;

}

}

}

// cambiar colores
circles.forEach(circle=>{
if(circle.isColliding){
circle.color = "#0000FF";
}else{
circle.color = circle.originalColor;
}
});

}

// animación
function animate(){

ctx.clearRect(0,0,window_width,window_height);

detectCollisions();

circles.forEach(circle=>{
circle.update(ctx);
});

requestAnimationFrame(animate);

}

// crear 20 círculos
generateCircles(20);

animate();