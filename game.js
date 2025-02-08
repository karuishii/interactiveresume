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

let nameSpriteInstance;
let nameImage;
let nameScale = 0.6;  // Default scale, you can adjust it
let nameX, nameY;     // Declare without initializing


let SkillsHeader, Skills2;
let SkillsHeaderX, SkillsHeaderY, Skills2X, Skills2Y;
let SkillsHeaderScale = 0.5; // Adjust the scale of SkillsHeader image
let Skills2Scale = 0.3; // Adjust the scale of Skills2 image
let skill1ImagesVisible = false;

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

let sampleImage;
let sampleImageX, sampleImageY;
let sampleImageScale = 0.5;
// Variables to track the sample image position and movement
let imageShowTime = -1; // Will be set to the desired time when to show the image
let imageVisible = false; // Initially, the image is not visible
let sampleImageSpeed = 2; // Speed at which the image moves to the left

// Declare global variables for images, positions, scaling, and timer
let contactImage, emailImage, githubImage, fbImage;
let contactX, emailX, githubX, fbX;
let contactY, emailY, githubY, fbY;
let socialSpeed = 2; // Speed at which icons move across the screen
let showSocialIcons = false; // Control visibility of social icons
let contactScale = 0.3; // Scaling factor for Contact Me image
let emailScale = 0.060; // Scaling factor for Email image
let githubScale = 0.080; // Scaling factor for Github image
let fbScale = 0.050; // Scaling factor for Facebook image
let contactShowTime = -1;

function preload() {
  spriteSheet = loadImage("images/mini-capy.png");
  cloudSpriteSheet = loadImage("images/clouds.png");
  bgImage = loadImage("images/background1.png");
  groundTexture = loadImage("images/ground.png");
  specialSprite = loadImage("images/int_resume.png");
  newSprite = loadImage("images/info2.png");
  thirdSprite = loadImage("images/info1.png");
  instructionImage = loadImage("images/rule1.png");
  SkillsHeader = loadImage("images/skills1.png");
  Skills2 = loadImage("images/skills2.png");
  nameImage = loadImage("images/name.png");
  sampleImage = loadImage("images/sample.png");
  contactImage = loadImage("images/contact.png"); // Contact Me
  emailImage = loadImage("images/gmail.png"); // Email
  githubImage = loadImage("images/github.png"); // Github
  fbImage = loadImage("images/fb.png"); // Facebook
  
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0);
  characterY = height - groundHeight - spriteHeight * capybaraScale;
  
  // Initialize name sprite's X and Y after the canvas size is defined
  nameX = width + 420;    // Starting position for the X-axis (off-screen to the right)
  nameY = height / 3;  // Adjust as needed for Y position
  
  // Set the sample image off-screen initially
  sampleImageX = width;
  sampleImageY = height / 1.5;
  
  // Initialize the name sprite
  nameSpriteInstance = new NameSprite(nameX, nameY);
  
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
  codingProficiencyImage = loadImage("images/cp.png");
  htmlImage = loadImage("images/html.png");
  cssImage = loadImage("images/css.png");
  jsImage = loadImage("images/js.png");
  
codingProficiencyXPos = width + 200;  // Initial X position for "Coding Proficiency" image
proficiencyTextXPos = width + 200;    // Initial X position for proficiency text
htmlXPos = width - 250;  // Initial X position for HTML image
cssXPos = width - 250;   // Initial X position for CSS image
jsXPos = width - 350;    // Initial X position for JavaScript image

  // Record the time when the "Coding Proficiency" image is drawn (i.e., appears)
  instructionImageTime = millis();
  
  SkillsHeaderX = width + 200; // Starting position of SkillsHeader (off-screen to the right)
  SkillsHeaderY = height / 5; // Adjust as necessary

  Skills2X = width + 250; // Starting position of Skills2 (off-screen to the right)
  Skills2Y = height / 2; // Adjust as necessary
  
  // Initialize the icons' X and Y positions (start off screen)
  contactX = width;
  emailX = width + 150;
  githubX = width + 150;
  fbX = width + 150;

  contactY = height / 4; // Initial Y position for Contact Me icon
  emailY = height / 4 + 80; // Email below Contact Me
  githubY = height / 4 + 150; // GitHub below Email
  fbY = height / 4 + 220; // Facebook below GitHub
  
}

function draw() {
	
   if (gameOver) {
    return;  // If the game is over, stop drawing anything
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

  // Reset position when it moves off-screen
  if (groundX <= -width) {
    groundX = 0;
  }
  
if (millis() - instructionImageTime >= 30000) {
  skillImagesVisible = true;  // Start showing skill images after 25 seconds
}

if (skillImagesVisible) {
  codingProficiencyXPos -= 2;  // Move Coding Proficiency image left
  proficiencyTextXPos -= 2;    // Move proficiency text left
  
    // Move skill images left
  htmlXPos -= 2;  // Move HTML image
  cssXPos -= 2;   // Move CSS image
  jsXPos -= 2;    // Move JavaScript image

    // Draw "Coding Proficiency" image at animated position
  let codingProficiencyWidth = codingProficiencyImage.width * codingProficiencyScale;
  let codingProficiencyHeight = codingProficiencyImage.height * codingProficiencyScale;
  image(codingProficiencyImage, codingProficiencyXPos - codingProficiencyWidth / 2, 20, codingProficiencyWidth, codingProficiencyHeight);

// Set the outline color
stroke(0); // Black outline (you can use any color, e.g., color(255, 0, 0) for red)

// Set the thickness of the outline
strokeWeight(3); // You can adjust the thickness here

    // Set the color for proficiency text
    fill(proficiencyTextColor);  // Apply the color for proficiency text

    // Draw proficiency labels (Beginner, Intermediate, Expert) under the "Coding Proficiency" image
    textSize(18);
    textAlign(CENTER, CENTER);
    text("Beginner", proficiencyTextXPos - 220, proficiencyY);  // Adjust X for spacing
    text("Intermediate", proficiencyTextXPos, proficiencyY);   // Adjust X for spacing
    text("Expert", proficiencyTextXPos + 220, proficiencyY);    // Adjust X for spacing
  }
  
  if (skillImagesVisible) {
   // Draw skill images
  image(htmlImage, htmlXPos, htmlY, htmlImage.width * htmlScale, htmlImage.height * htmlScale);
  image(cssImage, cssXPos, cssY, cssImage.width * cssScale, cssImage.height * cssScale);
  image(jsImage, jsXPos, jsY, jsImage.width * jsScale, jsImage.height * jsScale);
  }
  
if (skillImagesVisible) {
  let barHeight = 12; 
  let barWidth = 300; 
  let barX = proficiencyTextXPos - 300; 
  let barYOffset = 20; // Adjust this to move bars up/down

  stroke(0); 
  strokeWeight(3); 
  fill(255, 255, 255);

  // Adjust individual Y positions if necessary
rect(barX, htmlY + 10, barWidth, barHeight); // Move HTML bar down
rect(barX, cssY + 18, barWidth, barHeight);  // Keep CSS bar as is
rect(barX, jsY + 20, barWidth, barHeight);   // Move JavaScript bar up
}

 // Timer logic for showing the skills images
  if (millis() - instructionImageTime >= 45000) {
    skill1ImagesVisible = true;  // Start showing skill images after 25 seconds
  }

  // Move skills images after coding proficiency disappears
  if (skill1ImagesVisible) {
    SkillsHeaderX -= 2; // Move SkillsHeader to the left
    Skills2X -= 2;      // Move Skills2 to the left

    // Draw SkillsHeader and Skills2
    image(SkillsHeader, SkillsHeaderX, SkillsHeaderY, SkillsHeader.width * SkillsHeaderScale, SkillsHeader.height * SkillsHeaderScale);
    image(Skills2, Skills2X, Skills2Y, Skills2.width * Skills2Scale, Skills2.height * Skills2Scale);
  }
  
if (imageShowTime === -1) {
  imageShowTime = instructionImageTime + 50000;
  imageVisible = true;
  sampleImageX = width; // Start off the right side of the canvas
}

if (millis() >= imageShowTime && imageVisible) {
  // Move image left by decreasing sampleImageX
  sampleImageX -= sampleImageSpeed; 

  // Draw the image at the current position
  image(sampleImage, sampleImageX, sampleImageY, sampleImage.width * sampleImageScale, sampleImage.height * sampleImageScale);

  // Check if the image has fully moved off-screen
  if (sampleImageX + sampleImage.width * sampleImageScale <= 0) {
    // Stop drawing the image by setting imageVisible to false
    imageVisible = false; 
  }
}

  // Check if the sampleImage is clicked and redirect
  if (imageVisible && mouseX > sampleImageX && mouseX < sampleImageX + sampleImage.width * sampleImageScale &&
    mouseY > sampleImageY && mouseY < sampleImageY + sampleImage.height * sampleImageScale && mouseIsPressed) {
    window.open("https://youtu.be/w3P7VJIZ5Iw", "_blank"); // Redirect to YouTube link
  }
  
  if (contactShowTime === -1) {
    contactShowTime = instructionImageTime + 65000; // Delay of 3 seconds before showing the sample image
  }
  
  // Move and display the sample image if it should be visible
if (contactShowTime !== -1 && millis() > contactShowTime && !showSocialIcons) {
  showSocialIcons = true;
}

  // Draw the social icons if they're visible
  if (showSocialIcons) {
    moveSocialIcons(); // Move icons across the screen
    displaySocialIcons(); // Display the icons
  }

// Move the social icons from right to left
function moveSocialIcons() {
  // Move each icon towards the middle of the screen
  if (contactX > width / 2 - contactImage.width * contactScale / 2) {
    contactX -= socialSpeed;
  }
  if (emailX > width / 2 - emailImage.width * emailScale / 2) {
    emailX -= socialSpeed;
  }
  if (githubX > width / 2 - githubImage.width * githubScale / 2) {
    githubX -= socialSpeed;
  }
  if (fbX > width / 2 - fbImage.width * fbScale / 2) {
    fbX -= socialSpeed;
  }


  // Check if all icons have reached the middle of the screen
  if (contactX <= width / 2 - contactImage.width * contactScale / 2 &&
    emailX <= width / 2 - emailImage.width * emailScale / 2 &&
    githubX <= width / 2 - githubImage.width * githubScale / 2 &&
    fbX <= width / 2 - fbImage.width * fbScale / 2) {
    
    // End the game when all icons are in place
    finishGame();
	}
}

// Display the social media icons on the screen
function displaySocialIcons() {
  // Display each icon with the specified X, Y, and scaling
  image(contactImage, contactX, contactY, contactImage.width * contactScale, contactImage.height * contactScale);
  image(emailImage, emailX, emailY, emailImage.width * emailScale, emailImage.height * emailScale); // Below contact
  image(fbImage, fbX, fbY, fbImage.width * fbScale, fbImage.height * fbScale); // Below email
  image(githubImage, githubX, githubY, githubImage.width * githubScale, githubImage.height * githubScale); // Below fb
}
  
  // Check if the name sprite should appear
  if (millis() >= specialSpriteAppearTime) {
    nameSpriteInstance.update();  // Update position
    nameSpriteInstance.display(); // Draw the name image
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

// Handle mouse click event to redirect to the appropriate link
function mousePressed() {
  // Check for clicks on each icon and redirect to the appropriate URL
  if (isMouseOverIcon(contactX, contactY, contactImage.width, contactImage.height, contactScale)) {
    window.open('mailto:gg.karu07@gmail.com', '_blank'); // Open email in new tab
  }
  if (isMouseOverIcon(emailX, emailY, emailImage.width, emailImage.height, emailScale)) {
    window.open('mailto:gg.karu07@gmail.com', '_blank'); // Open email in new tab
  }
  if (isMouseOverIcon(fbX, fbY, fbImage.width, fbImage.height, fbScale)) {
    window.open('https://www.facebook.com/karu.kurisuu/', '_blank'); // Open FB in new tab
  }
  if (isMouseOverIcon(githubX, githubY, githubImage.width, githubImage.height, githubScale)) {
    window.open('https://github.com/karuishii', '_blank'); // Open GitHub in new tab
  }
}

// Check if the mouse is over an icon
function isMouseOverIcon(x, y, width, height, scale) {
  // Calculate the scaled width and height
  let scaledWidth = width * scale;
  let scaledHeight = height * scale;
  
  // Check if the mouse is within the boundaries of the icon
  return mouseX > x && mouseX < x + scaledWidth && mouseY > y && mouseY < y + scaledHeight;
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

class NameSprite {
  constructor(x, y) {
    this.x = x;  // Use the passed in position for X
    this.y = y;  // Use the passed in position for Y
    this.speed = 3;  // You can change the speed if you like
    this.active = true;
  }

  update() {
    this.x -= this.speed;  // Move the image to the left
    if (this.x + nameImage.width * nameScale < 0) {
      this.active = false;  // Mark as inactive when it moves off-screen
    }
  }

  display() {
    if (this.active) {
      image(nameImage, this.x, this.y, nameImage.width * nameScale, nameImage.height * nameScale);
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

function finishGame() {
  // Animate the capybara running to the right side
  if (characterX < width + spriteWidth * capybaraScale) {
    characterX += 4;  // Adjust the speed of the animation
  } else {
    // Once the capybara reaches the right side, stop everything
    finishGame1 = true;
    stopGame();
  }
}

function stopGame() {
  // Freeze all movements and stop obstacle generation
  bgSpeed = 0;
  groundSpeed = 0;
  cloudSpeed = 1.5;
  socialSpeed = 0;
  obstacle = null;  // Remove the obstacle
  canMove = false;  // Disable character movement
}