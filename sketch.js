var tower, towerImage, sppokySound;
var doors,doorImage,doorsGroup;
var climber,climberImage,climbersGroup;
var ghost,ghostImage;
var invisibleBlock, invisibleBlockGroup;
var gameState = "play";
var score;

function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  score = 0;
}

function draw(){
  background("black");
  
  if(gameState === "play"){
    if(tower.y > 400){
    tower.y = 300;
  }
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x - 3;
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 3;
  }
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    gameState = "end";
  }
  
  score = score + Math.round(getFrameRate()/240);
    
  spawnDoors();
  
  drawSprites();
  
  fill("yellow");
  text("Score: "+ score, 500,50);
    
  }
  if(gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",230,250);
  }
}

function spawnDoors(){
  if(frameCount % 240 === 0){
    doors = createSprite(200,-50);
    climber = createSprite(200,10);
    invisibleBlock = createSprite(200,15);
    doors.addImage(doorImage);
    climber.addImage(climberImage); 
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    doors.x = Math.round(random(120,400));
    climber.x = doors.x;
    invisibleBlock.x = doors.x;
    doors.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    doors.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    invisibleBlock.visible = false;
    
    doors.depth = ghost.depth;
    ghost.depth += 1;
    doorsGroup.add(doors);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    
  }
  
}