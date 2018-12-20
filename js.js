var ScoreP2 = 0;
var ScoreP1 = 0;
var sec = 1;
var timertest;
var sec2 = 1;
var timertest2;
var timertest3;
var timertest4;
var ammoSpeed2 = 5;
var ammoSpeed = -5;
var death = false;
var shootingspeed = 1000;
var shootingspeed2 = 1000;
var ammunition1 = 0;
var ammunition2 = 0;

(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();


var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    santa = document.getElementById("santa"),
    pacman = document.getElementById("pacman"),
    background = document.getElementById("background"),
    width = document.body.clientWidth,
    height = window.innerHeight,
    X2= 60;
    Y2 = height -80;
    X1= width - 100;
    Y1 = height -80;
    player = {
        x: width - 100,
        y: height - 80,
        width: 40,
        height: 80,
        speed: 3,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false,
    },

    player2 = {
        x: 100,
        y: height - 80,
        width: 40,
        height: 80,
        speed: 3,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false,

    },

    keys = [],
    friction = 0.8,
    gravity = 0.3;

var ammoP1 = [];

var ammoP2 = [];

var boxes = [];

// dimensions
// map
//must have
boxes.push({
    x: 0,
    y: 0,
    width: 10,
    height: height
});
boxes.push({
    x: 0,
    y: height - 2,
    width: width,
    height: 50
});
boxes.push({
    x: width - 10,
    y: 0,
    width: 50,
    height: height
});
//must not have
boxes.push({
    x: width/2 - ((width/8) / 2),
    y: height-400,
    width: width/8,
    height: 10
});
boxes.push({
    x: width/2 - ((width/4) / 2),
    y: height-300,
    width: width/4,
    height: 10
});
boxes.push({
    x: width/2 - ((width/2.6) / 2),
    y: height-200,
    width: width/2.6,
    height: 10
});
boxes.push({
    x: width/2 - ((width/1.4) / 2),
    y: height-100,
    width: width/1.4,
    height: 10
});

//danger blocks
var deathBox = [];
// dimensions
deathBox.push({
  x: width/2-15,
  y: height - ((Math.floor(Math.random() * 5))*(100) + 30),
  width: 30,
  height: 30
});

canvas.width = width;
canvas.height = height;

function update() {
    // check keys
    if (keys[38]) {
        // up arrow or space
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            player.grounded = false;
            player.velY = -player.speed * 3;
        }
    }
    if (keys[39]) {
        // right arrow
        if (player.velX < player.speed) {
            player.velX++;
            ammoSpeed = 5;
        }
    }
    if (keys[40]) {
        // right arrow
        if (!player.jumping && player.grounded) {
            player.height = 30;
        }
    }

        if (!keys[40]) {
        // right arrow
        if (!player.jumping && player.grounded) {
            player.height = 80;
        }
    }
    if (keys[37]) {
        // left arrow
        if (player.velX > -player.speed) {
            player.velX--;
            ammoSpeed = -5;
        }
    }

    if (keys[87]) {
        // up arrow or space
        if (!player2.jumping && player2.grounded) {
            player2.jumping = true;
            player2.grounded = false;
            player2.velY = -player2.speed * 3;
        }
    }
    if (keys[68]) {
        // right arrow
        if (player2.velX < player2.speed) {
            player2.velX++;
            ammoSpeed2 = 5;
        }
    }
    if (keys[65]) {
        // left arrow
        if (player2.velX > -player2.speed) {
            player2.velX--;
            ammoSpeed2 = -5;
        }
    }

        if (keys[83]) {
        // right arrow
        if (!player2.jumping && player2.grounded) {
            player2.height = 30;
        }
    }

        if (!keys[83]) {
        // right arrow
        if (!player2.jumping && player2.grounded) {
            player2.height = 80;
        }
    }

    if (keys[45]) {

        if (sec == 1) {
      ammoP1.push({
      x: player.x + (player.width/2),
      y: player.y + (player.height/3),
      height: 10,
      width: 10,
      speed: ammoSpeed,
      velX: 0
    });
      if (ammunition1 > 0) {ammunition1--;}
      if (ammunition1 == 0) {shootingspeed = 1000;}
      sec = 0;
      timertest = setTimeout(function(){sec = 1; clearTimeout(timertest);}, shootingspeed);
    }
    }

    if (keys[32]) {

        if (sec2 == 1) {
      ammoP2.push({
      x: player2.x + (player2.width/2),
      y: player2.y + (player2.height/3),
      height: 10,
      width: 10,
      speed: ammoSpeed2,
      velX: 0,
    });
      if (ammunition2 > 0) {ammunition2--;}
      if (ammunition2 == 0) {shootingspeed2 = 1000;}
      sec2 = 0;
      timertest2 = setTimeout(function(){sec2 = 1; clearTimeout(timertest2);}, shootingspeed2);
    }
    }


    player.velX *= friction;
    player.velY += gravity;

    player2.velX *= friction;
    player2.velY += gravity;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "black";
    ctx.beginPath();
    
    player.grounded = false;
    for (var i = 0; i < boxes.length; i++) {
        ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
        
        var dir = colCheck(player, boxes[i]);

        if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
        } else if (dir === "t") {
            player.velY *= -1;
        }

    }

    //

    player2.grounded = false;
    for (var i = 0; i < boxes.length; i++) {
        ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
        
        var dir = colCheck(player2, boxes[i]);


        if (dir === "l" || dir === "r") {
            player2.velX = 0;
            player2.jumping = false;
        } else if (dir === "b") {
            player2.grounded = true;
            player2.jumping = false;
        } else if (dir === "t") {
            player2.velY *= -1;
        }

    }

        ctx.drawImage(background, 0, 0, width, height);

    ctx.fill();
    ctx.fillStyle = "#F68E5F";
    ctx.drawImage(santa,  player.x, player.y, player.width, player.height);
    ctx.fillStyle = "#586BA4";
    ctx.drawImage(pacman, player2.x, player2.y, player2.width, player2.height);

    for (var i = 0; i < ammoP1.length; i++) {
      ctx.fillStyle = "red"
      ctx.fillRect(ammoP1[i].x, ammoP1[i].y, ammoP1[i].width, ammoP1[i].height);
      var dir = colCheck(player2, ammoP1[i]);
      if (dir === "l" || dir === "r") {
            player2.velX = 0;
            player2.jumping = false;
            ammoP2.splice(0,ammoP2.length);
            ammoP1.splice(0,ammoP1.length);
            ScoreP1++;
            document.getElementById("ScoreP1").innerHTML = ScoreP1;
            document.getElementById("Win").innerHTML = "P2 won";
            player2.x=X2;
            player2.y=Y2;
            player.x=X1;
            player.y=Y1;
            death = true;
            ammunition1 = 0;
            ammunition2 = 0;

        } else if (dir === "b") {
            player2.grounded = true;
            player2.jumping = false;
            ammoP2.splice(0,ammoP2.length);
            ammoP1.splice(0,ammoP1.length);
            ScoreP1++;
            document.getElementById("ScoreP1").innerHTML = ScoreP1;
            document.getElementById("Win").innerHTML = "P2 won";
            player2.x=X2;
            player2.y=Y2;
            player.x=X1;
            player.y=Y1;
            death = true;
            ammunition1 = 0;
            ammunition2 = 0;

        } else if (dir === "t") {
            player2.velY *= -1;
            ammoP2.splice(0,ammoP2.length);
            ammoP1.splice(0,ammoP1.length);
            ScoreP1++;
            document.getElementById("ScoreP1").innerHTML = ScoreP1;
            document.getElementById("Win").innerHTML = "P2 won";
            player2.x=X2;
            player2.y=Y2;
            player.x=X1;
            player.y=Y1;
            death = true;
            ammunition1 = 0;
            ammunition2 = 0;
        }
      ammomove();


    }

    /////////////

    for (var i = 0; i < ammoP2.length; i++) {
      ctx.fillStyle = "red"
      ctx.fillRect(ammoP2[i].x, ammoP2[i].y, ammoP2[i].width, ammoP2[i].height);
      var dir = colCheck(player, ammoP2[i]);
      if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
            ammoP2.splice(0,ammoP2.length);
            ammoP1.splice(0,ammoP1.length);
            ScoreP2++;
            document.getElementById("ScoreP2").innerHTML = ScoreP2;
            document.getElementById("Win").innerHTML = "P1 won";
            player2.x=X2;
            player2.y=Y2;
            player.x=X1;
            player.y=Y1;
            death = true;
            ammunition1 = 0;
            ammunition2 = 0;

        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
            ammoP2.splice(0,ammoP2.length);
            ammoP1.splice(0,ammoP1.length);
            ScoreP2++;
            document.getElementById("ScoreP2").innerHTML = ScoreP2;
            document.getElementById("Win").innerHTML = "P1 won";
            player2.x=X2;
            player2.y=Y2;
            player.x=X1;
            player.y=Y1;
            death = true;
            ammunition1 = 0;
            ammunition2 = 0;

        } else if (dir === "t") {
            player.velY *= -1;
            ammoP2.splice(0,ammoP2.length);
            ammoP1.splice(0,ammoP1.length);
            ScoreP2++;
            document.getElementById("ScoreP2").innerHTML = ScoreP2;
            document.getElementById("Win").innerHTML = "P1 won";
            player2.x=X2;
            player2.y=Y2;
            player.x=X1;
            player.y=Y1;
            death = true;
            ammunition1 = 0;
            ammunition2 = 0;
        }
      ammomove2();


    }


        ctx.fillStyle = "red";
        for (var i = 0; i < deathBox.length; i++) {
        ctx.fillRect(deathBox[i].x, deathBox[i].y, deathBox[i].width, deathBox[i].height);

        
        var dir = colCheck(player2, deathBox[i]);

        if (dir === "l" || dir === "r") {
            player2.velX = 0;
            player2.jumping = false;
            deathBox.splice(i,1);
            ammunition2 = 5;
            shootingspeed2 = 300;
            timertest5 = setTimeout(function(){deathBox.splice(0, deathBox.length); deathBox.push({
                          x: width/2-15,
                          y: height - ((Math.floor(Math.random() * 5))*(100) + 30),
                          width: 30,
                          height: 30
                          });
                          clearTimeout(timertest5);
                          }, 10000);

        } else if (dir === "b") {
            player2.grounded = true;
            player2.jumping = false;
            deathBox.splice(i,1);
            ammunition2 = 5;
            shootingspeed2 = 300;
            timertest5 = setTimeout(function(){deathBox.splice(0, deathBox.length); deathBox.push({
                          x: width/2-15,
                          y: height - ((Math.floor(Math.random() * 5))*(100) + 30),
                          width: 30,
                          height: 30
                          });
                          clearTimeout(timertest5);
                          }, 10000);

        } else if (dir === "t") {
            player2.velY *= -1;
            deathBox.splice(i,1);
            ammunition2 = 5;
            shootingspeed2 = 300;
            timertest5 = setTimeout(function(){deathBox.splice(0, deathBox.length); deathBox.push({
                          x: width/2-15,
                          y: height - ((Math.floor(Math.random() * 5))*(100) + 30),
                          width: 30,
                          height: 30
                          });
                          clearTimeout(timertest5);
                          }, 10000);
        }

    }

    for (var i = 0; i < deathBox.length; i++) {

        ctx.fillRect(deathBox[i].x, deathBox[i].y, deathBox[i].width, deathBox[i].height);
        
        var dir = colCheck(player, deathBox[i]);

        if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
            deathBox.splice(i,1);
            ammunition1 = 5;
            shootingspeed = 300;
            timertest5 = setTimeout(function(){deathBox.splice(0, deathBox.length); deathBox.push({
                          x: width/2-15,
                          y: height - ((Math.floor(Math.random() * 5))*(100) + 30),
                          width: 30,
                          height: 30
                          });
                          clearTimeout(timertest5);
                          }, 10000);
            
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
            deathBox.splice(i,1);
            ammunition1 = 5;
            shootingspeed = 300;
            timertest5 = setTimeout(function(){deathBox.splice(0, deathBox.length); deathBox.push({
                          x: width/2-15,
                          y: height - ((Math.floor(Math.random() * 5))*(100) + 30),
                          width: 30,
                          height: 30
                          });
                          clearTimeout(timertest5);
                          }, 10000);
            
        } else if (dir === "t") {
            player.velY *= -1;
            deathBox.splice(i,1);
            ammunition1 = 5;
            shootingspeed = 300;
            timertest5 = setTimeout(function(){deathBox.splice(0, deathBox.length); deathBox.push({
                          x: width/2-15,
                          y: height - ((Math.floor(Math.random() * 5))*(100) + 30),
                          width: 30,
                          height: 30
                          });
                          clearTimeout(timertest5);
                          }, 10000);

        }

    }

        if(player.grounded){
         player.velY = 0;
    }
    if(player2.grounded){
         player2.velY = 0;
    }
    

    player.x += player.velX;
    player.y += player.velY;
    player2.x += player2.velX;
    player2.y += player2.velY;




    /*
    ctx.drawImage(img, player.x, player.y, player.width, player.height);
    ctx.drawImage(img, player2.x, player2.y, player2.width, player2.height);
    */
    function ammomove() {
    
      for (let i = 0; i < ammoP1.length; i++) {
        ammoP1[i].x += ammoP1[i].speed;
        if (ammoP1[i].x < 0 || ammoP1[i].x > width) {
          ammoP1.splice(i,1);
        }
      }
    }
     function ammomove2() {
    
      for (let i = 0; i < ammoP2.length; i++) {
        ammoP2[i].x += ammoP2[i].speed;
        if (ammoP2[i].x < 0 || ammoP2[i].x > width) {
          ammoP2.splice(i,1);
        }
      }
    }

    if (death == false) {requestAnimationFrame(update);}
    else {timertest3 = setTimeout(function(){requestAnimationFrame(update);
      clearTimeout(timertest3); timertest4 = setTimeout(function() {document.getElementById("Win").innerHTML = ""; clearTimeout(timertest4);},1000);},1000); death = false;}

}

function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
              /*
                colDir = "t";
                shapeA.y += oY;
              */
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});


window.addEventListener("load", function () {
    update();
});
