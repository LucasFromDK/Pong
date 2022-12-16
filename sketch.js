let ball;
let player1;
let player2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = new Ball();
  player1 = new Paddle(windowWidth * 0.1, windowHeight/2);
  player2 = new Paddle(windowWidth * 0.9, windowHeight/2);
}

function displayScores() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(player1.score, width/4, height/8);
  text(player2.score, 3*width/4, height/8);
}


function draw() {
  background(0);
  displayScores()
  
  player1.update();
  player1.show();
  
  player2.update();
  player2.show();
  
  ball.update();
  ball.show();
  
  ball.checkPaddleCollision(player1);
  ball.checkPaddleCollision(player2);
}

class Ball {
  constructor() {
    this.diameter = windowHeight * 0.08;
    this.speed = 3;
    this.xVelocity = this.speed;
    this.yVelocity = this.speed;
    this.reset();
  }
  
  update() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    
    if (this.y < 0 || this.y > height) {
      this.yVelocity *= -1;
    }
    
    if (this.x < 0) {
      this.reset();
      player2.score++;
    } else if (this.x > width) {
      this.reset();
      player1.score++;
    }
  }
  
  reset() {
    this.x = width/2;
    this.y = height/2;
    this.xVelocity = -this.xVelocity;
  }
  
  show() {
    fill(255);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
  
  checkPaddleCollision(paddle) {
    if (this.x - this.diameter/2 < paddle.x + paddle.w/2 && 
        this.x + this.diameter/2 > paddle.x - paddle.w/2 &&
        this.y - this.diameter/2 < paddle.y + paddle.h/2 &&
        this.y + this.diameter/2 > paddle.y - paddle.h/2) {
          this.xVelocity *= -1;
        }
  }
}

class Paddle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = windowWidth * 0.01;
    this.h = windowHeight * 0.2;
    this.score = 0;
    this.upKey = (x === windowWidth * 0.1) ? 87 : UP_ARROW;
    this.downKey = (x === windowWidth * 0.1) ? 83 : DOWN_ARROW;
  }
  
  update() {
    if (keyIsDown(this.upKey)) {
      this.y -= 5;
    }
    if (keyIsDown(this.downKey)) {
      this.y += 5;
    }
  }
  
  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }
}