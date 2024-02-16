var bg;
var splashScreenImg;
var playButton;

var player,playerImg;
var laserB,laserBImg;

var meteor,meteorImg;

var brokenShipImg;

var enemy,enemylvl2,enemyImg1,enemyImg2,enemyImg3,enemyLvl2Img4,enemyLvl2Img5,enemyLvl2Img6;

var laserBGroup,enemyGroup,enemyLvl2Group;

var laserBSound;

var gameState = "wait"
var score = 0;
var playerLife = 3;
var level = 0;

function preload(){
        bg = loadImage("Assets/Screens/backdrop.jpeg");
        splashScreenImg = loadImage("Assets/Screens/splashScreen.gif");

        playerImg = loadImage("Assets/Player/rocket.png");
        laserBImg = loadImage("Assets/Player/laserB2.gif");

        enemyLvl2Img7 = loadImage("Assets/Obstacles/rock.png");

        enemyImg1 = loadImage("Assets/Enemys/ufo1.png");
        enemyImg2 = loadImage("Assets/Enemys/ufo2.png");
        enemyImg3 = loadImage("Assets/Enemys/ufo3.png");
        enemyLvl2Img4 = loadImage("Assets/Enemys/ufo4.png");
        enemyLvl2Img5 = loadImage("Assets/Enemys/ufo5.png");
        enemyLvl2Img6 = loadImage("Assets/Enemys/ufo6.png");

        brokenShipImg = loadImage("Assets/brokenship.png");

        laserBSound = loadSound("Assets/Sounds/laserSound.mp3");
        clickSound = loadSound("Assets/Sounds/clickingSound.mp3");
}


function setup(){
    createCanvas(900,800);
    

    player = createSprite(440,674,10,10);
    player.addImage(playerImg);
    player.scale = 0.5;

    playButton = createImg("Assets/Buttons/play.png");
    playButton.position(410,400);
    playButton.size(width / 6,width / 6);
    playButton.hide();

    laserBGroup = new Group();

    enemyGroup = new Group();

    enemyLvl2Group = new Group();

}   


function draw(){
   if(gameState == "wait"){
    background(splashScreenImg);
    playButton.show();
    player.visible = false;
    playerLife = 3;
    score = 0;
    level = 0;
    console.log("player life: ",playerLife);

   }

   playButton.mousePressed(() =>{
    clickSound.play();
    playButton.hide();
    gameState = "level1";
   })

    if(gameState == "level1"){
        background(bg);
        player.visible = true;
        level = 1;
        playerMovement();               
        spawnEnemies();

        for(var i = 0; i < enemyGroup.length; i++){
            if(laserBGroup.isTouching(enemyGroup.get(i))){
                score += 5;
                enemyGroup.get(i).remove();
                laserBGroup.destroyEach();
            }
            }

        for(var i = 0; i < enemyGroup.length; i++){
            if(player.isTouching(enemyGroup.get(i)) || enemyGroup.get(i).position.y > 800){
                console.log(enemyGroup.get(i).position.y )
                playerLife -= 1;
                enemyGroup.get(i).remove();
                
                if(playerLife == 0){
                    gameOver();
                 }            
            }
        }
    }
    if(playerLife > 0 && score >=10){
        gameState = "level1Win";
        score = 0;
        playerLife = 3;
        level1Win();
    }

    

    
    if(gameState == "level2"){
        background(bg);
        player.visible = true;
        level = 2;
        playerMovement();               
        spawnEnemiesLevel2();

        if(playerLife > 0 && score >=10){
            gameState = "gameWin";
            score = 0;
            playerLife = 3;
       
        }
    
        
        for(var i = 0; i < enemyLvl2Group.length; i++){
            if(laserBGroup.isTouching(enemyLvl2Group.get(i))){
                score += 5;
                enemyLvl2Group.get(i).remove();
                laserBGroup.destroyEach();
            }
            }

        for(var i = 0; i < enemyLvl2Group.length; i++){
            if(player.isTouching(enemyLvl2Group.get(i)) || enemyLvl2Group.get(i).position.y > 800){
                console.log(enemyLvl2Group.get(i).position.y )
                playerLife -= 1;
                enemyLvl2Group.get(i).remove();
                
                if(playerLife == 0){
                    gameOver();
                 }            
            }
        }

       


    }
    if(gameState == "gameWin"){
        gameWin();
    }

   
    drawSprites();
    if(gameState == "level1" || gameState == "level2"){
        fill("white");
        textSize(30);
        text("Score : "+score,700,80);

        fill("white");
        textSize(30);
        text("Player Life : "+playerLife, 100,80);

        fill("white");
        textSize(30);
        text("Level : "+level,420,80);
    }


}


function playerMovement(){

    if(player.x < 10){
        player.x = 10;
    }

    if(player.x > 868){
        player.x = 865;
    }

    if(player.y < 86){
        player.y = 85;
    }

    if(player.y > 700){
        player.y = 700;
    }

    if(keyDown("w")){
        player.y -= 4;
    }

    if(keyDown("s")){
        player.y += 4
    }

    if(keyDown("a")){
        player.x -= 4;
    }

    if(keyDown("d")){
        player.x += 4;
    }

    if(keyDown("SPACE")){
        spawnLaserB();
        laserBSound.setVolume(0.1);
        laserBSound.play();
    }
}


function spawnLaserB(){
    laserB = createSprite(player.position.x + 2,player.position.y - 80,10,40);
    laserB.addImage(laserBImg);
    laserB.scale = 0.4;
    laserB.velocityY = -8;
    laserB.depth = player.depth;
    player.depth += 1;
    laserBGroup.add(laserB);
}

function spawnEnemies(){

  if(frameCount % 50 == 0){  
    enemy = createSprite(random(850,50),40,10,10);
    //enemy.lifetime = 200;
    

    var rand = Math.round((Math.random()*3)+1);
    switch(rand){
        case 1: 
        enemy.addImage(enemyImg1);
        enemy.scale = 0.5;
        enemy.velocityY = 3;
        break;

        case 2: 
        enemy.addImage(enemyImg2);
        enemy.scale = 0.5;
        enemy.velocityY =3;
        break;

        case 3:
        enemy.addImage(enemyImg3);
        enemy.scale = 0.5;
        enemy.velocityY =3;
        break;    

        default:
        break;
    }
    enemyGroup.add(enemy);
  }
}


function spawnEnemiesLevel2(){
    if(frameCount % 40 == 0){
        enemylvl2 = createSprite(random(850,50),40,10,10);

        var rand2 = Math.round((Math.random()*4)+1);

        switch(rand2){
            
            case 1 :
            enemylvl2.addImage(enemyLvl2Img4);
            enemylvl2.scale = 0.3;
            enemylvl2.velocityY = 3;
            break;   

            case 2 :
            enemylvl2.addImage(enemyLvl2Img5);
            enemylvl2.scale = 0.3;
            enemylvl2.velocityY = 3;
            break;   
            
            case 3 :
            enemylvl2.addImage(enemyLvl2Img6);
            enemylvl2.scale = 0.3;
            enemylvl2.velocityY = 3;
            break;    

            case 4:
            enemylvl2.addImage(enemyLvl2Img7);
            enemylvl2.scale = 0.3;
            enemylvl2.velocityY =3;
            break;    
            
            default :
            break;
        }
        enemyLvl2Group.add(enemylvl2);
    }
}


function level1Win(){
    enemyGroup.destroyEach();
    player.visible = false;
    swal({
        title: "Level Win",
        text: "Press the Button to Continue.",
        textAlign: "CENTER",
        imageUrl:"Assets/brokenship.png",
        imageSize: "150x150",
        confirmButtonText:"CONTINUE",
        confirmButtonColor :"Red",
    },
    function(){
        gameState = "level2";
    })
}


function gameOver(){
    playerLife = 3;
    enemyGroup.destroyEach();
    gameState = "wait"
    swal({
        title: "Game Over",
        text: "Try Again",
        textAlign: "CENTER",
        imageUrl:"Assets/brokenship.png",
        imageSize: "150x150",
        confirmButtonText:"Try Again",
        confirmButtonColor :"Red",
    },
    function(){
        gameState = "wait";
    })

}

function gameWin(){
    enemyGroup.destroyEach();
    player.visible = false;
    console.log("gameWin");
    swal({
        title:"Game Win",
        text: "Click to Restart.",
        textAlign: "CENTER",
        confirmButtonText: "Restart",
        confirmButtonColor:"Green"
    },
    function(){
        gameState = "wait";
    })
}