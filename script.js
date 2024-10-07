/*global soundFormats, loadSound, loadFont, createCanvas, colorMode, RGB, ArrowOutline, ArrowPoint, EnterStatus, color, textFont, background, noStroke, random, textAlign, fill, round, LEFT, CENTER, rect, textSize, text, buttonHover*/

let outlineLeft,
  outlineRight,
  outlineUp,
  outlineDown,
  arrow1,
  arrow2,
  arrow3,
  arrow4,
  columnX,
  currentArrows,
  outlineArrowsList,
  directionsList,
  arrowTracker,
  soundtrack,
  soundStarted,
  points,
  gameOver,
  myFont,
  pointMessage,
  timePassed,
  currentStreak,
  longestStreak,
  timeLeft,
  arrowsGenerated,
  arrowDistribution,
  pointsHolder,
  homeScreenClosed,
  homeArrows;

function preload() {
  // Preload sounds and font files
  soundFormats("mp3", "ogg");
  soundtrack = loadSound(
    "https://cdn.glitch.com/8672d98d-7a35-4fdf-9bbd-601b11556f21%2FfantageFeverComet.mp3"
  );
  myFont = loadFont(
    "https://cdn.glitch.com/8672d98d-7a35-4fdf-9bbd-601b11556f21%2FSquadaOne-Regular.otf?v=1596008934780"
  );
}

function setup() {
  createCanvas(1200, 600);
  colorMode(RGB, 255, 255, 255, 1);

  currentArrows = [[], [], [], []]; // Current arrows on the screen for left, up, right, down
  columnX = [350, 550, 850, 1050]; // Constants for the x-position of the arrows
  directionsList = ["left", "up", "right", "down"];

  outlineArrowsList = [];
  outlineArrowsList.push(new ArrowOutline("left", columnX[0], 100));
  outlineArrowsList.push(new ArrowOutline("up", columnX[1], 150));
  outlineArrowsList.push(new ArrowOutline("right", columnX[2], 100));
  outlineArrowsList.push(new ArrowOutline("down", columnX[3], 150));

  pointsHolder = [];
  pointsHolder.push(new EnterStatus("Perfect!", 10, color(17, 255, 0)));
  pointsHolder.push(new EnterStatus("Great", 5, color(217, 255, 0)));
  pointsHolder.push(new EnterStatus("Good", 2, color(235, 164, 52)));
  pointsHolder.push(new EnterStatus("Close...", 0, "white"));
  pointsHolder.push(new EnterStatus("Miss", 0, "white"));

  homeScreenClosed = false;
  homeArrows = [];
  homeArrows.push(new ArrowPoint("left", 150, 550, 14));
  homeArrows.push(new ArrowPoint("right", 1050, 550, 14));
  homeArrows.push(new ArrowPoint("up", 110, 550, 8));
  homeArrows.push(new ArrowPoint("down", 1020, 550, 8));

  arrowTracker = [0, 10, 2]; // x1, x2, interval (for spacing out arrows)
  points = 0;
  soundStarted = false;
  gameOver = false;
  textFont(myFont);
  pointMessage = "...";
  timePassed = 0;
  currentStreak = 0;
  longestStreak = 0;
  timeLeft = soundtrack.duration();
  arrowsGenerated = 0;
}

function draw() {
  background("black");
  noStroke();

  if (!homeScreenClosed) {
    // Home Screen
    showHomeScreen();
  } else if (!gameOver && homeScreenClosed) {
    // Gameplay

    // Start soundtrack
    if (!soundtrack.isPlaying() && soundtrack.isLoaded()) {
      soundtrack.setLoop(false);
      soundtrack.play();
      soundStarted = true;
    }

    // Timer
    timePassed += 1;
    timeLeft =
      Math.round((soundtrack.duration() - timePassed / 60) * 100) / 100;
    if (timeLeft <= 0) {
      gameOver = true;
      timeLeft = 0;
    }

    background(color(57, 30, 102));
    boardSetup();
    updateStreak();

    // Draw arrow outlines
    for (let i = 0; i < outlineArrowsList.length; i++)
      outlineArrowsList[i].drawArrow();

    // Update Arrows -- loops through each column and then each arrow in each column
    for (let i = 0; i < currentArrows.length; i++) {
      for (let j = 0; j < currentArrows[i].length; j++) {
        let arrow = currentArrows[i][j];
        arrow.drawArrow();
        arrow.moveUp();
        if (arrow.isTooHigh()) {
          currentArrows[i].shift();
          pointMessage = pointsHolder[4].getText();
          pointsHolder[4].addCount();
          currentStreak = 0;
        }
      }
    }

    // This next bit manages the spacing between generated arrows -- ensures they're random
    arrowTracker[0] += 1;
    if (
      arrowTracker[0] - arrowTracker[1] == arrowTracker[2] &&
      timeLeft > 1.5
    ) {
      addArrow();
      arrowsGenerated += 1;
      arrowTracker[2] = round(random(20, 50));
      arrowTracker[1] = arrowTracker[0];
    }
  } else {
    // Game over folks
    if (soundtrack.isPlaying()) soundtrack.stop();
    gameOverScreen();
    timeLeft = 0;
  }
}

function addArrow() {
  // Generated a new arrow in a random direction with a random speed
  let randNewArrow = random(directionsList);
  let randNewArrowPos = directionsList.indexOf(randNewArrow);
  let randNewArrowSpeed = Math.round(random(6, 8));

  currentArrows[randNewArrowPos].push(
    new ArrowPoint(
      randNewArrow,
      columnX[randNewArrowPos],
      550,
      randNewArrowSpeed
    )
  );
}

function boardSetup() {
  textAlign(LEFT);
  fill("black");
  rect(250, 20, 930, 560, 50);

  fill("black");
  rect(25, 20, 200, 560, 40);

  fill("white");
  textSize(32);
  text(`Score: ${points}`, 60, 120);

  textSize(21);
  text(`Time Left: ${timeLeft}`, 60, 80);

  text(`Current Streak: ${currentStreak}`, 60, 280);
  text(`Longest Streak: ${longestStreak}`, 60, 310);

  switch (pointMessage) {
    case pointsHolder[0].getText():
      fill(pointsHolder[0].getColor());
      text(pointMessage, 60, 180);
      textSize(50);
      text("+10", 60, 230);
      break;
    case pointsHolder[1].getText():
      fill(pointsHolder[1].getColor());
      text(pointMessage, 60, 180);
      textSize(50);
      text("+5", 60, 230);
      break;
    case pointsHolder[2].getText():
      fill(pointsHolder[2].getColor());
      text(pointMessage, 60, 180);
      textSize(50);
      text("+2", 60, 230);
      break;
    case pointsHolder[3].getText():
    case pointsHolder[4].getText():
      text(pointMessage, 60, 180);
      break;
  }

  fill(color(15, 59, 25));
  rect(250, 20, 200, 560, 40, 0, 0, 40);

  fill(color(15, 38, 59));
  rect(490, 20, 210, 560);

  fill(color(59, 15, 15));
  rect(740, 20, 210, 560);

  fill(color(59, 50, 15));
  rect(990, 20, 190, 560, 0, 40, 40, 0);
}

function updateStreak() {
  if (currentStreak > longestStreak) {
    longestStreak = currentStreak;
  }
}

function gameOverScreen() {
  showSideArrows();
  fill("red");
  textSize(60);
  textAlign(CENTER);
  text("GAME OVER", 600, 150);

  fill("white");
  textSize(30);
  text(`Longest Streak: ${longestStreak}`, 600, 190);
  text(`Final Score: ${points} + ${longestStreak} = `, 600, 240);

  textSize(50);
  fill(pointsHolder[0].getColor());
  text(points + longestStreak, 600, 296);
  fill("white");

  textSize(24);
  let arrowsScored = 0;

  for (let i = 0; i < 3; i++) arrowsScored += pointsHolder[i].getCount();

  text(`Arrow Generated: ${arrowsGenerated}`, 500, 340);
  text(`Arrow Scored: ${arrowsScored}`, 700, 340);
  text(
    `${Math.round((arrowsScored / arrowsGenerated) * 100)}% Scored`,
    600,
    370
  );

  for (let i = 0; i < 5; i++) {
    fill(pointsHolder[i].getColor());
    text(
      `${pointsHolder[i].getText()}: ${pointsHolder[i].getCount()}`,
      300 + 100 * (i + 1),
      410
    );
  }

  fill(buttonHover());
  rect(530, 450, 140, 50, 10);
  fill("white");
  text(`Play Again?`, 600, 480);
}

function showHomeScreen() {
  fill(color(117, 253, 255));
  textSize(60);
  textAlign(CENTER);
  text("A R R O W B I C S", 600, 150);

  textSize(30);
  fill("white");
  text("Instructions:", 400, 210);
  textSize(20);
  text("Arrows will fly up the screen!", 438, 250);
  text(
    "When it reaches the outline at the top, press the corresponding arrow on",
    595,
    290
  );
  text(
    "your keyboard! The closer you are to the outline, the more points you get!",
    598,
    310
  );
  text(
    "You also go on streaks when you don't miss consecutive arrows,",
    568,
    360
  );
  text("and your longest streak gives you more points!", 503, 380);

  fill(color(252, 163, 255));
  text("Can you beat the creator's record of 500?", 600, 420);

  fill(buttonHover());
  rect(530, 450, 140, 50, 10);
  textSize(24);
  fill("white");
  text(`PLAY`, 600, 480);

  textSize(18);
  fill("white");
  text(`Note: There is music.`, 600, 530);

  showSideArrows();
}

function showSideArrows() {
  // Side arrow animation for home and game over screen
  for (let i = 0; i < homeArrows.length; i++) {
    homeArrows[i].drawArrow();
    homeArrows[i].moveUp();

    if (homeArrows[i].isTooHigh()) homeArrows[i].resetY(550);
  }
}

function resetGame() {
  // Reset variables for new game
  textAlign(LEFT);
  arrowTracker = [0, 10, 2];
  points = 0;
  soundStarted = false;
  gameOver = false;
  pointMessage = "...";
  timePassed = 0;
  currentStreak = 0;
  longestStreak = 0;
  timeLeft = soundtrack.duration();
  arrowsGenerated = 0;

  // Restart sound
  if (!soundtrack.isPlaying() && soundtrack.isLoaded()) {
    soundtrack.setLoop(false);
    soundtrack.play();
    soundStarted = true;
  }
}

function isWithinRange(min, max, val) {
  return min < val && val < max;
}
