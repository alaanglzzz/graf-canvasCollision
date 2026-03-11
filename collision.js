const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let objects = [];
let score = 0;

const img = new Image();
img.src = "objeto.png"; // aquí pones tu imagen

class FallingObject{

constructor(x,y,speed,size){
this.x = x;
this.y = y;
this.speed = speed;
this.size = size;
}

draw(){
ctx.drawImage(img,this.x,this.y,this.size,this.size);
}

update(){
this.y += this.speed;

if(this.y > canvas.height){
this.y = -this.size;
this.x = Math.random()*canvas.width;
}
}

}

function createObjects(){

for(let i=0;i<8;i++){

let x = Math.random()*canvas.width;
let y = Math.random()*-500;
let speed = Math.random()*2+1;
let size = 80;

objects.push(new FallingObject(x,y,speed,size));

}

}

function updateSpeed(){

let multiplier = 1;

if(score > 15){
multiplier = 3;
}else if(score > 10){
multiplier = 2;
}

objects.forEach(obj=>{
obj.speed = obj.speed * multiplier;
});

}

canvas.addEventListener("click",function(e){

const rect = canvas.getBoundingClientRect();

const mouseX = e.clientX - rect.left;
const mouseY = e.clientY - rect.top;

objects.forEach((obj,index)=>{

if(
mouseX > obj.x &&
mouseX < obj.x + obj.size &&
mouseY > obj.y &&
mouseY < obj.y + obj.size
){

score++;
document.getElementById("score").innerText = "Eliminados: "+score;

objects.splice(index,1);

let x = Math.random()*canvas.width;
let speed = Math.random()*2+1;
objects.push(new FallingObject(x,-50,speed,40));

updateSpeed();

}

});

});

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

objects.forEach(obj=>{
obj.update();
obj.draw();
});

requestAnimationFrame(animate);

}

createObjects();
animate();