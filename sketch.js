  var jungle, jungleImage;
  var monkey , monkey_running, monkey_collided;
  var banana ,bananaImage, obstacle, obstacleImage;
  var bananasGroup, obstaclesGroup;
  var invisibleGround,invisibleImage;
  var score;
  var gameState;
  var PLAY = 1;
  var TOUCHED_OBSTACLE = 0;
  var END = -1;
  var PLAY2 = 2;
  var restart, restartImage;

  function preload()
  {
    //loading all reqired Images
    monkey_running =                  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
    
    monkey_collided = loadImage("sprite_1.png");
    
    bananaImage = loadImage("banana.png");

    obstacleImage = loadImage("obstacle.png");

    jungleImage = loadImage("jung.jpg");

    invisibleImage = loadImage("ground2.png");
    
    restartImage = loadImage("resart.png");
    
    jungle2Image = loadImage("jung-1.jpg");
  }

  function setup() 
  {
    createCanvas(400, 400);
    
    gameState = PLAY;
    
    //making a background and givivng animation to it
    jungle = createSprite(320,150,60,100);
    jungle.addAnimation("ground3",jungleImage);
    jungle.scale = 0.9;
    jungle.velocityX = -4;
    
    //creating an invisible ground
    invisibleGround = createSprite(300, 350);
    invisibleGround.addAnimation("ground2",invisibleImage);
    invisibleGround.visible = false;
    
    //creating the monkey and setting animation to it
    monkey = createSprite(75,280,10,10);
    monkey.addAnimation("monkey",monkey_running);
    monkey.addImage("monkey2", monkey_collided);
    monkey.scale = 0.1;
    
    //making a restart icon
    restart = createSprite(200,300);
    restart.addImage(restartImage);
    restart.scale = 0.2;
    
    //making groups for bananas and obstacles
    obstaclesGroup = createGroup();
    bananasGroup = createGroup();
    
    score = 0;
  }

  function draw()
  {
    background("white");//background as white
   
    //making game work during 2 play states to give 2 chances for monkey
    if (gameState === PLAY||gameState === PLAY2)
    {
      //making background move
      jungle.velocityX = -4;
      
      //making restart icon invisible while playing
      restart.visible = false; 
      
      //calling functions to display obstacles and bananas 
      obstacles();
      bananas();
         
      //when space key is pressed monkey jumps one time
      if(keyDown("space")&& monkey.y >= 305)
      {
        monkey.velocityY = -8;
      }
      
      //setting a collider for the monkey
      monkey.setCollider("circle",-2,2,50);
      
      //giving gravity to the monkey
      monkey.velocityY = monkey.velocityY + 0.4;
      
      //making the background reset itself
      if (jungle.x < 0)
      {
        jungle.x = 200;
      }
  
      //when the monkey touches banana destroy them and increase score
      if(monkey.isTouching(bananasGroup))
      {
        bananasGroup.destroyEach();
        score = score +10;
        //if the monkey eats a banana, it should become bigger
        //but it should not become too big; hence increase size till 
        //score is 40
        if(score===10||score===20||score===30||score===40)
        {
          monkey.scale = monkey.scale + 0.02;
        }
      }
    } 
      //when monkey touches rock first time game stops 
    //if(obstaclesGroup.isTouching(monkey)&&gameState===PLAY)
    //{
      //gameState = PLAY2;
        //monkey.changeImage("monkey",monkey_running);
        //monkey.velocityY = -8;
        //jungle.velocityX = -4;
        //obstaclesGroup.destroyEach();
       // bananasGroup.destroyEach();
        //obstaclesGroup.setVelocityXEach(-4);
        //bananasGroup.setVelocityXEach(-4);
    //}    
 //but when the space is pressed game starts
    //if(obstaclesGroup.isTouching(monkey)&&gameState===TOUCHED_OBSTACLE)
      //{ 
        
      //}
    
    //when monkey touches obstacle again game ENDS
    if(obstaclesGroup.isTouching(monkey)&&gameState===PLAY)
    {
        gameState = END;
        monkey.changeImage("monkey2", monkey_collided);
        restart.visible = true;
        monkey.velocityY =  0;
        jungle.velocityX = 0;
        obstaclesGroup.setVelocityXEach(0);
        bananasGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        bananasGroup.setLifetimeEach(-1);
     }
    
    //monkey should collide invisible ground
    monkey.collide(invisibleGround);
    
    //when restart icon is clicked reset the game
    if(mousePressedOver(restart)&&restart.visible===true) 
    {
      reset();
    } 

   drawSprites();
    
    //displaying text that game ENDs
    if (gameState === END)
    {
      stroke("black");
      textSize(30);
      fill("yellow");
      text("MONKEY COLLIDED!",65,225);
      fill("red");
      text("GAME ENDs", 100, 250);
    }
    
    //displaying score during all states 
    if(gameState===PLAY||gameState===PLAY2||gameState===END)
    {
      stroke("black");
      textSize(25);
      fill("black")
      text("score :"+score,250,100);
    }
    
    //displaying text during the first collide of monkey
    if(gameState===TOUCHED_OBSTACLE){
      stroke("green");
      textSize(25);
      fill("white");
      text("Press 'space' to continue",100,200);
    }
  //creating reqired functions    
  function bananas()
  {
     if(frameCount % 80===0)
     {
      banana = createSprite(250,300);
      banana.addAnimation("banana",bananaImage);
      banana.velocityX = -(5 + 3* score/100)
      banana.y = Math.round(random(300,250));
      banana.scale = 0.1;
      banana.lifetime = 100;
      bananasGroup.add(banana);
      }
   }  
  function obstacles()
  {
   if(frameCount % 80===0)
   {
     obstacle = createSprite(250,350);
     obstacle.addAnimation("obstacle", obstacleImage);
     obstacle.velocityX = -(5 + 3* score/100);
     obstacle.scale = 0.1; 
     obstacle.lifetime = 400;
     obstaclesGroup.add(obstacle);
   } 
  }

  function reset()
  {
    gameState = PLAY;
    monkey.changeImage("monkey",monkey_running);
    jungle.velocityX = -4;
    restart.visible = false;
    obstaclesGroup.destroyEach();
    bananasGroup.destroyEach();
    monkey.scale = 0.1;
    score = 0;
  }
 }






