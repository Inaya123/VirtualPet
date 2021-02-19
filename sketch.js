var dog,sadDog,happyDog;
var feedButton,addButton;
var food;
var database;
var foodStock;
var lastFed=null;
var nameInput,confirmButton,dogName,greeting;

function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happydog.png");
}

function setup() {
  createCanvas(1000,400);
  database=firebase.database();
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  food=new Food();
  food.getFoodStock();

  feedButton=createButton("Feed Dog");
  feedButton.position(700,95);
  feedButton.mousePressed(feedDog);

  addButton=createButton("Add Food");
  addButton.position(800,95);
  addButton.mousePressed(addFood);

 
}

function draw() {
  background(46,139,87);

  food.display();

  drawSprites();

  textSize(15);
  fill("black");
  if(lastFed!=null){
    if(lastFed===0){
      text("Last fed at 12 AM",350,30);
    }
    else if(lastFed<=12){
      text("Last fed at "+lastFed+" AM",350,30);
    }
    else{
      text("Last fed at "+lastFed%12+" PM",350,30);
    }
  }
  else{
    text("Last fed at ",350,30);
  }
}

function addFood(){
  food.updateFoodStock(foodStock+1);
  food.getFoodStock();
}

function feedDog(){
    if(foodStock<=0){
      food.updateFoodStock(foodStock*0);
    }
    else{
      dog.addImage(happyDog);
      food.updateFoodStock(foodStock-1);
      var lastFedRef=database.ref('feedTime');
      lastFedRef.on("value",function(data){lastFed=data.val()});
    }
    food.getFoodStock();
  
}
