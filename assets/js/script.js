// TODO: Declare any global variables we need
let totalCount = 0;
let headsCount = 0;
let tailsCount = 0;

document.addEventListener("DOMContentLoaded", function () {
  // This is just a sanity check to make sure your JavaScript script is getting loaded
  // You can remove it once you see it in your browser console in the developer tools
  console.log("Hi");

  // DOM elements
  // BUTTONS
  let flipBtn = document.getElementById("flip");
  let clearBtn = document.getElementById("clear");
  // SCOREBOARD CELLS
  let headsCountData = document.getElementById("heads");
  let headsPercentData = document.getElementById("heads-percent");
  let tailsCountData = document.getElementById("tails");
  let tailsPercentData = document.getElementById("tails-percent");
  // IMG
  let pennyImg = document.getElementById("penny-img");
  // MESSAGE
  let message = document.getElementById("message");

  // TODO: Add event listener and handler for flip and clear buttons

  // Flip Button Click Handler
  flipBtn.addEventListener("click", function () {
    // TODO: Determine flip outcome
    totalCount++;
    let flippedHeads = Math.random() < 0.5;

    // if (check) - what did they flip?
    if (flippedHeads) {
      pennyImg.src = "assets/images/penny-heads.jpg";
      message.textContent = "You flipped heads!";
      headsCount++;
      headsCountData.textContent = headsCount;
    } else {
      pennyImg.src = "assets/images/penny-tails.jpg";
      message.textContent = "You flipped tails!";
      tailsCount++;
      tailsCountData.textContent = tailsCount;
    }

    let headsPercentage = Math.round((headsCount / totalCount) * 100);
    let tailsPercentage = Math.round((tailsCount / totalCount) * 100);
    headsPercentData.textContent = `${headsPercentage}%`;
    tailsPercentData.textContent = `${tailsPercentage}%`;

    // TODO: Update image and status message in the DOM

    // Update the scorboard
    // TODO: Calculate the total number of rolls/flips
    // Make variables to track the percentages of heads and tails
    // TODO: Use the calculated total to calculate the percentages
    // HINT: Make sure not to divide by 0! (if total is 0, percent will be 0 as well)
    // TODO: Update the display of each table cell
  });

  // Clear Button Click Handler
  // TODO: Reset global variables to 0
  // TODO: Update the scoreboard (same logic as in flip button click handler)
});
