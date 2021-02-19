class Food{
  constructor(){
      this.image = loadImage("Milk.png");
      
  }

  getFoodStock(){
      var foodStockRef=database.ref('foodStock');
      foodStockRef.on("value",function(data){foodStock=data.val()});
  }

  updateFoodStock(foodS){
      database.ref('/').set({foodStock:foodS, feedTime: hour()});
  }

  display(){
     var x=80,y=100;
     imageMode(CENTER);
     image(this.image,720,220,70,70);
     if(foodStock!=0){
         for(var i=0;i<foodStock;i++){
             if(i%10===0){
                 x=80;
                 y=y+50;
             }
             image(this.image,x,y,50,50);
             x=x+30;
         }
     }
  }
}
