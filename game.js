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
let groundSpeed = 4; // Same as obstacle speed for consistency
let groundImageHeight = 100; // Adjust this value as needed
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
let specialSpriteInstance; // To manage the sprite's behavior

// InformationText instance
let infoTextInstance; // For the interactive resume text

// Game state
let gameOver = false;

function preload() {
  spriteSheet = loadImage("images/mini-capy.png");
  cloudSpriteSheet = loadImage("images/clouds.png");
  bgImage = loadImage("images/background1.png");
  groundTexture = loadImage("images/ground.png"); // Replace with your ground texture URL
  specialSprite = loadImage("images/int_resume.png");  // Preload the special sprite image
  infoTextFont = loadFont('fonts/PixeloidSans-Bold.ttf');
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0);
  characterY = height - groundHeight - spriteHeight * capybaraScale;

  // Initialize the special sprite instance
  specialSpriteInstance = new SpecialSprite();

  // Initialize the information text
  infoTextInstance = new InformationText();  // Add this line
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

  // Reset position when it moves out of screen
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

  // Update and display the special sprite
  specialSpriteInstance.update();
  specialSpriteInstance.display();

  // Update and display the information text
  infoTextInstance.update();
  infoTextInstance.display();
}

class SpecialSprite {
  constructor() {
    this.x = width;  // Start the sprite off-screen
    this.y = height / 5;  // Set its vertical position
    this.speed = 3;  // Adjust speed if needed
    this.active = false;  // Initially inactive
    this.startTime = millis();  // Store the time it should start appearing
  }

  update() {
    // If it's within the first second, make it appear
    if (millis() - this.startTime < 1000) {
      this.active = true;
    }

    // Move the sprite left
    if (this.active) {
      this.x -= this.speed;
    }

    // If it moves off-screen, stop drawing it
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
  constructor() {
    this.x = width; // Start off-screen
    this.y = height / 2.5; // Set its vertical position
    this.text = `Skills:
JavaScript, HTML, CSS
Experience:
1 Year of Web Development
Hobbies:
Gaming, Reading, Programming`;  // Your interactive resume content
    this.speed = 3;  // Speed at which the text moves
    this.active = false; // Initially inactive
    this.startTime = null; // Will be set when special sprite appears
  }

  update() {
    // Set start time when special sprite first becomes active
    if (specialSpriteInstance.active && this.startTime === null) {
      this.startTime = millis();
    }

    // Start displaying 2 seconds after the special sprite appears
    if (this.startTime !== null && millis() - this.startTime >= 5000) {
      this.active = true;
    }

    // Move text left if active
    if (this.active) {
      this.x -= this.speed;
    }
  }

  display() {
    if (this.active) {
      fill(255, 255, 0); // Yellow text color
      textFont(infoTextFont, 32); // Font and size
      textAlign(LEFT, TOP); // Align from the left
      text(this.text, this.x, this.y);
    }
  }
}

  display() {
    if (this.active) {
      fill(255, 255, 0); // Text color (yellow)
      textFont(infoTextFont, 32); // Set the font and size
      textAlign(LEFT, TOP); // Align text from the left
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
    velocity = 12;  // Jump strength
  }
}

function displayGameOver() {
  textSize(48);
  textAlign(CENTER, CENTER);
  fill(255, 0, 0);
  text("Game Over", width / 2, height / 2);
}
