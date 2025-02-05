document.documentElement.style.overflow = 'hidden'; // Disable scroll

let spriteSheet;
let spriteWidth = 155;
let spriteHeight = 128;
let totalFrames = 5;
let currentFrame = 0;
let characterX = 70;
let characterY;
let isJumping = false;
let velocity = 0;
let gravity = 0.6;
let groundHeight = 50;
let groundX = 0;
let groundSpeed = 4;
let groundImageHeight = 100;
let infoTextFont;

// Cloud variables
let cloudSpriteSheet;
let cloudWidth = 840;
let cloudHeight = 859;
let clouds = [];
let cloudSpeed = 1.5;
let numCloudFrames = 4;

// Animation speed control
let frameDelay = 6;
let frameCounter = 0;

// Scrolling background
let bgImage;
let bgX = 0;
let bgSpeed = 2;

// Capybara scaling
let capybaraScale = 0.8;

// Ground texture
let groundTexture;

// Special Sprite
let specialSprite;
let specialSpriteInstance;

// Information Text
let infoTextInstance;

// Game state
let gameOver = false;

function preload() {
  spriteSheet = loadImage("images/mini-capy.png");
  cloudSpriteSheet = loadImage("images/clouds.png");
  bgImage = loadImage("images/background1.png");
  groundTexture = loadImage("images/ground.png");
  specialSprite = loadImage("images/int_resume.png");
  infoTextFont = loadFont('fonts/PixeloidSans-Bold.ttf');
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0);
  characterY = height - groundHeight - spriteHeight * capybaraScale;

  // Initialize instances
  specialSpriteInstance = new SpecialSprite();
  infoTextInstance = new InformationText("Welcome to My Interactive Resume!");
}

function draw() {
  if (gameOver) {
    displayGameOver();
    return;
  }

  // Background scrolling
  image(bgImage, bgX, 0, width, height);
  image(bgImage, bgX + width, 0, width, height);
  
  bgX -= bgSpeed;
  if (bgX <= -width) {
    bgX = 0;
  }

  // Generate clouds
  if (frameCount % 100 === 0) {
    clouds.push(new Cloud());
  }

  // Draw clouds
  for (let i = clouds.length - 1; i >= 0; i--) {
    clouds[i].update();
    clouds[i].display();
    if (clouds[i].x + cloudWidth < 0) {
      clouds.splice(i, 1);
    }
  }

  // Draw scrolling ground
  image(groundTexture, groundX, height - groundImageHeight, width, groundImageHeight);
  image(groundTexture, groundX + width, height - groundImageHeight, width, groundImageHeight);

  // Move the ground left
  groundX -= groundSpeed;

  if (groundX <= -width) {
    groundX = 0;
  }

  // Character jump mechanics
  if (isJumping) {
    velocity -= gravity;
    characterY -= velocity;
    if (characterY >= height - groundHeight - spriteHeight * capybaraScale) {
      characterY = height - groundHeight - spriteHeight * capybaraScale;
      isJumping = false;
      velocity = 0;
    }
  }

  // Draw capybara
  push();
  translate(characterX, characterY);
  scale(-capybaraScale, capybaraScale);
  let frameX = currentFrame * spriteWidth;
  image(spriteSheet, -spriteWidth, 0, spriteWidth, spriteHeight, frameX, 0, spriteWidth, spriteHeight);
  pop();

  // Slow animation
  frameCounter++;
  if (frameCounter >= frameDelay) {
    currentFrame = (currentFrame + 1) % totalFrames;
    frameCounter = 0;
  }

  // Update & Display Special Sprite
  specialSpriteInstance.update();
  specialSpriteInstance.display();

  // Update & Display Information Text
  infoTextInstance.update();
  infoTextInstance.display();
}

class SpecialSprite {
  constructor() {
    this.x = width;
    this.y = height / 5;
    this.speed = 3;
    this.active = false;
    this.startTime = millis();
  }

  update() {
    if (millis() - this.startTime >= 1000) {
      this.active = true;
    }

    if (this.active) {
      this.x -= this.speed;
    }

    if (this.x + specialSprite.width < 0) {
      this.active = false;
    }
  }

  display() {
    if (this.active) {
      image(specialSprite, this.x, this.y);
    }
  }
}

class InformationText {
  constructor(text) {
    this.text = text;
    this.x = width;
    this.y = height / 3;
    this.speed = 3;
    this.active = false;
    this.startTime = null;
  }

  update() {
    if (specialSpriteInstance.active && this.startTime === null) {
      this.startTime = millis();
    }

    if (this.startTime !== null && millis() - this.startTime >= 2000) {
      this.active = true;
    }

    if (this.active) {
      this.x -= this.speed;
    }

    if (this.x + textWidth(this.text) < 0) {
      this.active = false;
    }
  }

  display() {
    if (this.active) {
      textSize(32);
      textFont(infoTextFont);
      textAlign(CENTER, CENTER);

      // Gradient effect
      let gradient = drawingContext.createLinearGradient(this.x - 50, this.y - 10, this.x + 200, this.y + 10);
      gradient.addColorStop(0, "yellow");
      gradient.addColorStop(1, "red");
      drawingContext.fillStyle = gradient;

      // Shadow effect
      stroke(0);
      strokeWeight(6);
      text(this.text, this.x, this.y);
    }
  }
}

class Cloud {
  constructor() {
    this.x = width + floor(random(100, 500));
    this.y = floor(random(100, 300));
    this.size = random(0.2, 0.4);
    this.cloudFrame = floor(random(numCloudFrames));
  }

  update() {
    this.x -= cloudSpeed;
  }

  display() {
    let cloudX = this.cloudFrame * cloudWidth;
    image(cloudSpriteSheet, this.x, this.y, cloudWidth * this.size, cloudHeight * this.size, cloudX, 0, cloudWidth, cloudHeight);
  }
}

function keyPressed() {
  if (key === ' ' && !isJumping) {
    isJumping = true;
    velocity = 12;
  }
}

function displayGameOver() {
  textSize(48);
  textAlign(CENTER, CENTER);
  fill(255, 0, 0);
  text("Game Over", width / 2, height / 2);
}
