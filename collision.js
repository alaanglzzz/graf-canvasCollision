const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "black";

class Circle {

constructor(x,y,radius,color,text,speed){

this.posX = x;
this.posY = y;
this.radius = radius;

this.originalColor = color;
this.color = color;

this.text = text;

this.speed = speed;

this.dx = (Math.random()*2-1) * speed;
this.dy = (Math.random()*2-1) * speed;

this.flashTime = 0;

}

draw(context){

context.beginPath();

context.strokeStyle = this.color;

context.textAlign="center";
context.textBaseline="middle";
context.font="20px Arial";

context.fillStyle = this.color;
context.fillText(this.text,this.posX,this.posY);

context.lineWidth=2;

context.arc(this.posX,this.posY,this.radius,0,Math.PI*2,false);

context.stroke();

context.closePath();

}

update(context){

this.draw(context);

this.posX += this.dx;
this.posY += this.dy;

// rebote con paredes
if(this.posX + this.radius > window_width || this.posX - this.radius < 0){
this.dx = -this.dx;
}

if(this.posY + this.radius > window_height || this.posY - this.radius < 0){
this.dy = -this.dy;
}

// flash azul temporal
if(this.flashTime > 0){
this.flashTime--;
this.color = "#0000FF";
}else{
this.color = this.originalColor;
}

}

}

let circles = [];

function generateCircles(n){

for(let i=0;i<n;i++){

let radius = Math.random()*30 + 20;

let x = Math.random()*(window_width - radius*2) + radius;
let y = Math.random()*(window_height - radius*2) + radius;

let color = `#${Math.floor(Math.random()*16777215).toString(16)}`;

let speed = 5;

let text = `C${i+1}`;

circles.push(new Circle(x,y,radius,color,text,speed));

}

}

function detectCollisions(){

for(let i=0;i<circles.length;i++){

for(let j=i+1;j<circles.length;j++){

let c1 = circles[i];
let c2 = circles[j];

let dx = c2.posX - c1.posX;
let dy = c2.posY - c1.posY;

let distance = Math.sqrt(dx*dx + dy*dy);

let minDistance = c1.radius + c2.radius;

if(distance < minDistance){

// flash azul
c1.flashTime = 5;
c2.flashTime = 5;

// vector normal
let nx = dx / distance;
let ny = dy / distance;

// intercambio de velocidades
let tempDx = c1.dx;
let tempDy = c1.dy;

c1.dx = c2.dx;
c1.dy = c2.dy;

c2.dx = tempDx;
c2.dy = tempDy;

// separar círculos para evitar que se queden pegados
let overlap = minDistance - distance;

c1.posX -= nx * overlap/2;
c1.posY -= ny * overlap/2;

c2.posX += nx * overlap/2;
c2.posY += ny * overlap/2;

}

}

}

}

function animate(){

ctx.clearRect(0,0,window_width,window_height);

detectCollisions();

circles.forEach(circle=>{
circle.update(ctx);
});

requestAnimationFrame(animate);

}

generateCircles(20);

animate();