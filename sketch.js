var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,cash2G,diamondsG,jwelleryG,jwellery2G,swordGroup;
var gameOver;

var cashArray = []
var jwelleryArray = []
var diamondArray = []

var cashCalc = 0;
var cashCalc2 = 0;

var jwelleryCalc = 0;
var jwelleryCalc2 = 0;

var diamondCalc = 0;

var gameSpeed = 3;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);
  // Moving background
  path=createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = gameSpeed;


  //creating boy running
  boy = createSprite(70,580,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;

  gameOver = createSprite(200,200);
  gameOver.addImage(endImg);
  gameOver.scale = 0.85
  gameOver.visible = false;
      
    
  cashG=new Group();
  cash2G = new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  jwellery2G = new Group();
  swordGroup=new Group();
}

function draw() {

  if(gameState === END){

    gameOver.visible = true;

    boy.x = 200;
    boy.y = 700;

    cashG.setVelocityYEach(0);
    cash2G.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0);
    jwelleryG.setVelocityYEach(0);
    jwellery2G.setVelocityEach(0);
    swordGroup.setVelocityYEach(0);

    cashG.destroyEach();
    cash2G.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    jwellery2G.destroyEach();
    swordGroup.destroyEach();
    
    path.velocityY = 0;

    cashG.setLifetimeEach(-1);
    cash2G.setLifetimeEach(-1);
    diamondsG.setLifetimeEach(-1);
    jwelleryG.setLifetimeEach(-1);
    swordGroup.setLifetimeEach(-1);
  }
  else if(gameState===PLAY){
  background(0);

  if(gameSpeed<20 && frameCount%25 === 0){
    gameSpeed+=0.25;
  }

  path.velocityY = gameSpeed;

  cashG.setVelocityYEach(gameSpeed);
  cash2G.setVelocityYEach(gameSpeed);
  diamondsG.setVelocityYEach(gameSpeed);
  jwelleryG.setVelocityYEach(gameSpeed);
  jwellery2G.setVelocityYEach(gameSpeed);
  swordGroup.setVelocityYEach(gameSpeed);

  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  if(cashCalc>0){
    cashCalc--;
    if((250-cashCalc)*gameSpeed >= 625){
      cashArray.pop();
      cashCalc = 0;
    }
  }

  if(cashCalc2>0){
    cashCalc2--;
    if((250-cashCalc2)*gameSpeed >= 625){
      cashArray.pop();
      cashCalc2 = 0;
    }
  }

  if(jwelleryCalc>0){
    jwelleryCalc--;
    if((250-jwelleryCalc)*gameSpeed >= 625){
      jwelleryArray.pop();
      jwelleryCalc = 0;
    }
    console.log(jwelleryArray.length);
  }

  if(jwelleryCalc2>0){
    jwelleryCalc2--;
    if((250-jwelleryCalc2)*gameSpeed >= 625){
      jwelleryArray.pop();
      jwelleryCalc2 = 0;
    }
    console.log(jwelleryArray.length);
  }

  //code to reset the background
  if(path.y > 530 ){
    path.y = height/2;
  }
  
    createCash();
    createCash2();
    createDiamonds();
    createJwellery();
    createJwellery2();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if(cash2G.isTouching(boy)){
      cash2G.destroyEach();
      treasureCollection+=50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection+=500;
    }
      
    else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection+=100;
    }

    else if(jwellery2G.isTouching(boy)) {
      jwellery2G.destroyEach();
      treasureCollection+=100;
    }
      
    if(swordGroup.isTouching(boy)) {
      gameState = END;
    }
  }

  drawSprites();
  textSize(20);
  fill(0);
  text("Treasure: "+ treasureCollection,150,30);
}

function createCash() {
  if(cashArray.length === 0){
  var cash = createSprite(Math.round(random(20, 380),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = gameSpeed;
  cash.lifetime = 625/gameSpeed;
  cashG.add(cash);
  cashArray.push("1");
  cashCalc = 250;
  cash.setCollider("circle",0,0,30);
  }
}

function createCash2() {
  if(cashArray.length === 1){
  var cash2 = createSprite(Math.round(random(20, 380),40, 10, 10));
  cash2.addImage(cashImg);
  cash2.scale=0.12;
  cash2.velocityY = gameSpeed;
  cash2.lifetime = 625/gameSpeed;
  cash2G.add(cash2);
  cashArray.push("1");
  cashCalc2 = 250;
  cash2.setCollider("circle",0,0,30);
  }
}

function createDiamonds() {
  if (World.frameCount % 500 == 0) {
  var diamonds = createSprite(Math.round(random(20, 380),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = gameSpeed;
  diamonds.lifetime = 625/gameSpeed;
  diamondsG.add(diamonds);
  diamonds.setCollider("circle",0,0,30);
}
}

function createJwellery() {
  if (World.frameCount % 135 === 0 && jwelleryArray.length === 0) {
  var jwellery = createSprite(Math.round(random(20, 380),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = gameSpeed;
  jwellery.lifetime = 625/gameSpeed;
  jwelleryG.add(jwellery);
  jwellery.setCollider("circle",0,0,30);
  jwelleryArray.push("j");
  jwelleryCalc = 250;
  }
}

function createJwellery2() {
  if (World.frameCount % 155 === 0 && jwelleryArray.length === 1) {
  var jwellery2 = createSprite(Math.round(random(20, 380),40, 10, 10));
  jwellery2.addImage(jwelleryImg);
  jwellery2.scale=0.13;
  jwellery2.velocityY = gameSpeed;
  jwellery2.lifetime = 625/gameSpeed;
  jwellery2G.add(jwellery2);
  jwellery2.setCollider("circle",0,0,30);
  jwelleryArray.push("j");
  jwelleryCalc2 = 250;
  }
}

function createSword(){
  if (World.frameCount % (145-((gameSpeed*2)+(gameSpeed*2)+(gameSpeed*5/2))) === 0) {
  var sword = createSprite(Math.round(random(20, 380),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = gameSpeed;
  sword.lifetime = 625/gameSpeed;
  sword.setCollider("circle",0,0,30);
  swordGroup.add(sword);
  }

  if (World.frameCount % (150-((gameSpeed*2)+(gameSpeed*2)+(gameSpeed))) === 0) {
  var sword2 = createSprite(Math.round(random(20, 380),40, 10, 10));
  sword2.addImage(swordImg);
  sword2.scale=0.1;
  sword2.velocityY = gameSpeed;
  sword2.lifetime = 625/gameSpeed;
  sword2.setCollider("circle",0,0,30);
  swordGroup.add(sword2);
  }
}