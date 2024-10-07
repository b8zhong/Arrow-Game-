/* global mouseX, mouseY, cursor, color, resetGame, homeScreenClosed, gameOver, keyCode, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW, currentArrows, isWithinRange, pointsHolder, outlineArrowsList, pointMessage, currentStreak, points */

/* 

I used this file to store any P5 listeners, just to make the main script.js file shorter

*/

function buttonHover() {
  // This function handles the hover changes for the buttons on the start page and the game over page
  if (530 < mouseX && 530 + 140 > mouseX && 430 < mouseY && 430 + 50 > mouseY) {
    cursor("pointer");
    return color(104, 81, 143);
  } else {
    cursor("auto");
  }
  return color(57, 30, 102);
}

function mousePressed(event) {
  // This if statement checks if the user clicked the button on either the home or game over screen and changes the game state accordingly
  if (530 < mouseX && 530 + 140 > mouseX && 450 < mouseY && 450 + 50 > mouseY) {
    if (gameOver) {
      gameOver = false;
      resetGame();
    } else if (!homeScreenClosed) {
      homeScreenClosed = true;
    }
  }
}

function keyPressed() {
  let applyToDir = 0; // 0. left, 1. up, 2. right, 3.down

  switch (keyCode) {
    case LEFT_ARROW:
      applyToDir = 0;
      break;
    case RIGHT_ARROW:
      applyToDir = 2;
      break;
    case UP_ARROW:
      applyToDir = 1;
      break;
    case DOWN_ARROW:
      applyToDir = 3;
      break;
  }

  let addPoints = 0;

  // Changes points/streaks depending on how close the arrow was to the arrow outline when the user pressed the keyboard arrow
  if (currentArrows[applyToDir].length > 0) {
    if (
      isWithinRange(
        -5,
        5,
        outlineArrowsList[applyToDir].y - currentArrows[applyToDir][0].y
      )
    ) {
      addPoints += pointsHolder[0].getScore();
      pointMessage = pointsHolder[0].getText();
      currentArrows[applyToDir].shift();
      pointsHolder[0].addCount();
      currentStreak++;
    } else if (
      isWithinRange(
        -15,
        15,
        outlineArrowsList[applyToDir].y - currentArrows[applyToDir][0].y
      )
    ) {
      addPoints += pointsHolder[1].getScore();
      pointMessage = pointsHolder[1].getText();
      currentArrows[applyToDir].shift();
      pointsHolder[1].addCount();
      currentStreak++;
    } else if (
      isWithinRange(
        -25,
        25,
        outlineArrowsList[applyToDir].y - currentArrows[applyToDir][0].y
      )
    ) {
      addPoints += pointsHolder[2].getScore();
      pointMessage = pointsHolder[2].getText();
      currentArrows[applyToDir].shift();
      pointsHolder[2].addCount();
      currentStreak++;
    } else if (
      isWithinRange(
        -50,
        50,
        outlineArrowsList[applyToDir].y - currentArrows[applyToDir][0].y
      )
    ) {
      addPoints += pointsHolder[3].getScore();
      pointMessage = pointsHolder[3].getText();
      currentArrows[applyToDir].shift();
      pointsHolder[3].addCount();
      currentStreak++;
    }
  }

  points += addPoints;
}
