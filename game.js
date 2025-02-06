let spriteSheet;
let spriteWidth = 1795 / 5;
let spriteHeight = 383;
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
let gameOver = false; // Track if the game is over
let instructionImage;
let instructionImageStartTime;
let instructionImageDuration = 3000; // Duration to show instruction image (in ms)
let instructionImageAlpha = 255; // Opacity for fading effect
let codingProficiencyImage;
let codingProficiencyScale = 0.5;  
let htmlImage, cssImage, jsImage;
let htmlScale = 0.095;   // HTML image scale
let cssScale = 0.095;    // CSS image scale
let jsScale = 0.2;       // JavaScript image scale
let proficiencyTextColor;

// Positions for the skill images
let htmlX, htmlY, cssX, cssY, jsX, jsY;

// Proficiency text positions
let proficiencyX, proficiencyY;

// Timer variables
let instructionImageTime;
let skillImagesVisible = false;
let htmlXPos, cssXPos, jsXPos, codingProficiencyXPos, proficiencyTextXPos;

// Cloud variables
let cloudSpriteSheet;
let cloudWidth = 840;
let cloudHeight = 859;
let clouds = [];
let cloudSpeed = 1.5;
let numCloudFrames = 4;

// Scrolling background
let bgImage;
let bgX = 0;
let bgSpeed = 2;

// Capybara scaling
let capybaraScale = 0.2;

// Ground texture
let groundTexture;

// Special Sprite
let specialSprite;
let specialSpriteInstance;

// New Sprite
let newSprite;
let newSpriteInstance;

// Third Sprite (new image added)
let thirdSprite;
let thirdSpriteInstance;

// Obstacles
let obstacle = null;

let specialSpriteAppearTime;
let newSpriteAppearTime;
let thirdSpriteAppearTime;
let obstacleSpawnTime;

let canMove = true; // Flag to control horizontal movement

// Instruction Image
let showInstructionImage = false;

function preload() {
  spriteSheet = loadImage("https://i.imgur.com/amjrqMj.png");
  cloudSpriteSheet = loadImage("https://i.imgur.com/CmPhMxD.png");
  bgImage = loadImage("https://i.imgur.com/OQjObsY.png");
  groundTexture = loadImage("https://i.imgur.com/OMjspX2.png");
  specialSprite = loadImage("https://i.imgur.com/J3Lgyaz.png");
  newSprite = loadImage("https://i.imgur.com/8YQWEWC.png");
  thirdSprite = loadImage("https://i.imgur.com/ompvN2O.png");
  instructionImage = loadImage("https://i.imgur.com/lF54hwi.png");
  
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0);
  characterY = height - groundHeight - spriteHeight * capybaraScale;
  
  // Define proficiency text color (for example: red)
  proficiencyTextColor = color(255, 255, 255);

  // Initialize sprite instances immediately
  specialSpriteInstance = new SpecialSprite();
  newSpriteInstance = new NewSprite();
  thirdSpriteInstance = new ThirdSprite();

  // Set initial times for when the sprites should start appearing
  specialSpriteAppearTime = millis() + 1000;
  thirdSpriteAppearTime = specialSpriteAppearTime + 6000;
  newSpriteAppearTime = thirdSpriteAppearTime + 7000;
  obstacleSpawnTime = newSpriteAppearTime + 1000;  // Spawn obstacle 1 second earlier

  instructionImageStartTime = newSpriteAppearTime + 8000; // Set when the instruction image should appear
  
  // Define positions after canvas size is available
  htmlY = height / 5;    // HTML image Y position
  cssY = height / 2.75;  // CSS image Y position
  jsY = height / 1.80;   // JavaScript image Y position
  proficiencyY = height / 200 + 120;
  
  //Proficiency 
  codingProficiencyImage = loadImage("https://i.imgur.com/21DQ9Ur.png");
  htmlImage = loadImage("https://i.imgur.com/Fa8gmyo.png");
  cssImage = loadImage("https://i.imgur.com/IAsCSCz.png");
  jsImage = loadImage("https://i.imgur.com/7fwSBUr.png");
  
  // Set the initial X positions for the skill images and proficiency images off the right side
  htmlXPos = width;
  cssXPos = width;
  jsXPos = width;
  codingProficiencyXPos = width;
  proficiencyTextXPos = width;

  // Record the time when the "Coding Proficiency" image is drawn (i.e., appears)
  instructionImageTime = millis();
  
}

function draw() {
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

  // Reset position when it moves off-screen
  if (groundX <= -width) {
    groundX = 0;
  }
  
  // Check if 3 seconds have passed since the "Coding Proficiency" image appeared
  if (millis() - instructionImageTime >= 25000) {
    skillImagesVisible = true;  // Set to true to show the skill images and the proficiency images
  }

  // Only display the "Coding Proficiency" image and proficiency text once skill images should appear
  if (skillImagesVisible) {
    // Animate the "Coding Proficiency" image and proficiency text from right to left
    codingProficiencyXPos -= 2;  // Move Coding Proficiency image to the left
    proficiencyTextXPos -= 2;    // Move proficiency text to the left

    // Draw "Coding Proficiency" image at the animated position with scaling
    let codingProficiencyWidth = codingProficiencyImage.width * codingProficiencyScale;
    let codingProficiencyHeight = codingProficiencyImage.height * codingProficiencyScale;
    image(codingProficiencyImage, codingProficiencyXPos - codingProficiencyWidth / 2, 20, codingProficiencyWidth, codingProficiencyHeight);

    // Set the color for proficiency text
    fill(proficiencyTextColor);  // Apply the color for proficiency text

    // Draw proficiency labels (Beginner, Intermediate, Expert) under the "Coding Proficiency" image
    textSize(18);
    textAlign(CENTER, CENTER);
    text("Beginner", proficiencyTextXPos - 220, proficiencyY);  // Adjust X for spacing
    text("Intermediate", proficiencyTextXPos, proficiencyY);   // Adjust X for spacing
    text("Expert", proficiencyTextXPos + 220, proficiencyY);    // Adjust X for spacing
  }
  
    // Calculate widths based on scaling for each image
  let codingProficiencyWidth = codingProficiencyImage.width * codingProficiencyScale;
  let htmlWidth = htmlImage.width * htmlScale;
  let cssWidth = cssImage.width * cssScale;
  let jsWidth = jsImage.width * jsScale;

  // Adjust the X positions based on the image widths
  htmlXPos = codingProficiencyXPos - (codingProficiencyWidth / 2) - (htmlWidth / 2) - 100;
  cssXPos = codingProficiencyXPos - (codingProficiencyWidth / 2) + (cssWidth / 2) - 200;
  jsXPos = codingProficiencyXPos - (codingProficiencyWidth / 2) + (jsWidth / 2) - 300;

  // Existing logic for displaying skill images if they are visible
  if (skillImagesVisible) {
    htmlXPos -= 2;  // Move HTML image to the left
    cssXPos -= 2;   // Move CSS image to the left
    jsXPos -= 2;    // Move JavaScript image to the left

    // Draw HTML image at the defined position with separate scale
    let htmlWidth = htmlImage.width * htmlScale;
    let htmlHeight = htmlImage.height * htmlScale;
    image(htmlImage, htmlXPos - htmlWidth / 2, htmlY, htmlWidth, htmlHeight);

    // Draw CSS image at the defined position with separate scale
    let cssWidth = cssImage.width * cssScale;
    let cssHeight = cssImage.height * cssScale;
    image(cssImage, cssXPos - cssWidth / 2, cssY, cssWidth, cssHeight);

    // Draw JavaScript image at the defined position with separate scale
    let jsWidth = jsImage.width * jsScale;
    let jsHeight = jsImage.height * jsScale;
    image(jsImage, jsXPos - jsWidth / 2, jsY, jsWidth, jsHeight);
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

  // Check if sprites should appear based on millis() timing
  if (millis() >= specialSpriteAppearTime) {
    specialSpriteInstance.update();
    specialSpriteInstance.display();
  }

  if (millis() >= thirdSpriteAppearTime) {
    thirdSpriteInstance.update();
    thirdSpriteInstance.display();
  }

  if (millis() >= newSpriteAppearTime) {
    newSpriteInstance.update();
    newSpriteInstance.display();
  }

  // Draw capybara
  push();
  translate(characterX, characterY);
  scale(-capybaraScale, capybaraScale);
  let frameX = currentFrame * spriteWidth;
  image(spriteSheet, -spriteWidth, 0, spriteWidth, spriteHeight, frameX, 0, spriteWidth, spriteHeight);
  pop();

  // Slow animation
  if (frameCount % 6 === 0) {
    currentFrame = (currentFrame + 1) % totalFrames;
  }

  // Update and display obstacle if the new sprite has disappeared
  if (!newSpriteInstance.active && obstacle === null) {  
    obstacle = new Obstacle(); // Spawn obstacle only when newSprite is gone
  }

  if (obstacle !== null) {
    obstacle.update();
    obstacle.display();

    // Check for collision with obstacle
    if (obstacle.hits(characterX, characterY)) {
      canMove = false;  // Disable movement if collision occurs
      moveCapybaraWithObstacle(obstacle); // Push capybara with obstacle
    } else {
      canMove = true;  // Re-enable movement if no collision
    }

    if (obstacle.x + obstacle.width < 0) {
      obstacle = null; // Remove obstacle when it moves off-screen
    }
  }
  
  // Check and log timing for debugging
  console.log("millis:", millis(), "instructionImageStartTime:", instructionImageStartTime);

  // Display instruction image if it's time
  if (millis() >= instructionImageStartTime && millis() <= instructionImageStartTime + instructionImageDuration) {
    console.log("Displaying instruction image");
    image(instructionImage, width / 2 - instructionImage.width / 2, height / 3 - instructionImage.height / 2);
  }

  // Handle horizontal movement (left/right only)
  if (canMove) {
    moveCapybara();
  }

  // Check if capybara is off the screen after moving with obstacle
  if (characterX < 0) {
    endGame();  // Call the game over function
  }
}

function endGame() {
  console.log("Game Over!");
  gameOver = true; // Set the game over state

  // Display a game over message
  fill(255, 0, 0);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("Game Over!", width / 2, height / 2);

  // Stop the game loop
  noLoop();
}


// Dynamically move the capybara horizontally based on key press
function moveCapybara() {
  // Prevent capybara from moving off the left side of the canvas
  if (keyIsDown(65) && characterX > 0) {  // 'A' key
    characterX -= 5; // Move left
  }
  
  // Prevent capybara from moving off the right side of the canvas
  if (keyIsDown(68) && characterX + spriteWidth * capybaraScale < width) {  // 'D' key
    characterX += 5; // Move right
  }
}

function moveCapybaraWithObstacle(obstacle) {
  let obstacleSpeed = obstacle.speed;

  // Move capybara with obstacle horizontally until it's off-screen
  characterX -= obstacleSpeed;
}

class Obstacle {
  constructor() {
    this.x = width;
    this.y = height - groundHeight - 50; // Adjust based on obstacle height
    this.width = 50;
    this.height = 50;
    this.speed = 5;
  }

  update() {
    this.x -= this.speed;
  }

  display() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.width, this.height);
  }

  // Updated hit detection for capybara
  hits(x, y) {
    // Using scaled width and height for the capybara
    let capybaraWidth = spriteWidth * capybaraScale;
    let capybaraHeight = spriteHeight * capybaraScale;

    return (
      x + capybaraWidth > this.x &&  // Right edge of capybara past left edge of obstacle
      x < this.x + this.width &&      // Left edge of capybara past right edge of obstacle
      y + capybaraHeight > this.y && // Bottom edge of capybara past top edge of obstacle
      y < this.y + this.height       // Top edge of capybara past bottom edge of obstacle
    );
  }
}

class SpecialSprite {
  constructor() {
    this.x = width;  // Initialize at the right side of the screen
    this.y = height / 5;
    this.speed = 3;
    this.active = true;
  }

  update() {
    this.x -= this.speed;
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

class NewSprite {
  constructor() {
    this.x = width;  // Start at the right side of the screen
    this.y = height / 7;
    this.speed = 3;
    this.active = true; // Track if it's still visible
  }

  update() {
    this.x -= this.speed;
    if (this.x + newSprite.width < 0) {  
      this.active = false; // Mark as inactive when fully off-screen
    }
  }

  display() {
    if (this.active) {
      image(newSprite, this.x, this.y);
    }
  }
}

class ThirdSprite {
  constructor() {
    this.x = width;  // Initialize at the right side of the screen
    this.y = height / 5;
    this.speed = 3;
    this.active = true;
  }

  update() {
    this.x -= this.speed;
    if (this.x + thirdSprite.width < 0) {
      this.active = false;
    }
  }

  display() {
    image(thirdSprite, this.x, this.y);
  }
}

class Cloud {
  constructor() {
    this.x = width + floor(random(100, 500));
    this.y = floor(random(100, 300));
    this.size = random(0.2, 0.4);
  }

  update() {
    this.x -= cloudSpeed;
  }

  display() {
    let cloudFrame = floor(random(numCloudFrames));
    image(cloudSpriteSheet, this.x, this.y, cloudWidth * this.size, cloudHeight * this.size);
  }
}

function keyPressed() {
  if (key === ' ' && gameOver) {
    restartGame();  // Restart when space is pressed after game over
  } else if (key === ' ' && !isJumping) {
    isJumping = true;
    velocity = 12; // Adjust for jump height
  }
}

function restartGame() {
  console.log("Restarting game...");

  // Reset all game variables
  characterX = 70;
  characterY = height - groundHeight - spriteHeight * capybaraScale;
  isJumping = false;
  velocity = 0;

  // Reset background and ground
  bgX = 0;
  groundX = 0;

  // Clear obstacles
  obstacle = null;

  // Reset sprite instances
  specialSpriteInstance = new SpecialSprite();
  newSpriteInstance = new NewSprite();
  thirdSpriteInstance = new ThirdSprite();

  // Reset sprite appear times
  specialSpriteAppearTime = millis() + 1000;
  thirdSpriteAppearTime = specialSpriteAppearTime + 6000;
  newSpriteAppearTime = thirdSpriteAppearTime + 5000;
  obstacleSpawnTime = newSpriteAppearTime + 1000;

  // Reset movement flag
  canMove = true;

  // Reset game over flag
  gameOver = false;

  // Restart the game loop
  loop();
}
