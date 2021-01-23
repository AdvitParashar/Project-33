const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
var particles = [];
var plinkos = [];
var divisions = [];
var particle;
var backgroundImg;

var divisionHeight = 300;
var score = 0;
var count = 0;
var gameState = "play";

function preload() {
  getBackgroundImg();
}

function setup() {
  createCanvas(1200, 800);
  engine = Engine.create();
  world = engine.world;
 
  ground = new Ground(width / 2, height, width, 20);


  for (var k = 0; k <= width; k = k + 80) {
    divisions.push(new Divisions(k, height - divisionHeight / 2, 10, divisionHeight));
  }


  for (var j = 75; j <= width; j = j + 50) {

    plinkos.push(new Plinko(j, 75));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {

    plinkos.push(new Plinko(j, 175));
  }

  for (var j = 75; j <= width; j = j + 50) {

    plinkos.push(new Plinko(j, 275));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {

    plinkos.push(new Plinko(j, 375));
  }



}

function mousePressed() {
  if (gameState !== "end") {
    count++;
    particle = new Particle(mouseX, 0, 10, 10);
  }
}



function draw() {
  if(backgroundImg)
        background(backgroundImg);


  Engine.update(engine);
  ground.display();


  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }



  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }
  if (particle != null) {
    particle.display();
    if (particle.body.position.y > 760) {
      if (particle.body.position.x < 300) {
        score = score + 500;
      }
      if (particle.body.position.x > 300 && particle.body.position.x < 600) {
        score = score + 100;
      }
      if (particle.body.position.x > 600 && particle.body.position.x < 900) {
        score = score + 200;
      }
      particle = null;
      if (count >= 10) gameState = "end";
    }

  }
  if (gameState === "end") {
    textSize(50);
    text("GAME OVER", 250, 250);
  }

  textSize(25)
  text("Score : " + score, 20, 30);
  text("500", 20, 530);
  text("500", 100, 530);
  text("500", 180, 530);
  text("500", 260, 530);
  text("100", 340, 530);
  text("100", 420, 530);
  text("100", 500, 530);
  text("200", 580, 530);
  text("200", 660, 530);
  text("200", 740, 530);

}

async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  
  if(hour>=06 && hour<=19){
      bg = "bg1.png";
  }
  else{
      bg = "bg2.jpg";
  }

  backgroundImg = loadImage(bg);
  console.log(backgroundImg);
}
