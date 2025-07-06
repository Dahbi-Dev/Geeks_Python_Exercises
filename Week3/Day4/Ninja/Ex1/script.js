// Second Part: Hide the total tip initially
document.getElementById("totalTip").style.display = "none";

// Add event listener to the calculate button
document.getElementById("calculate").onclick = function () {
  calculateTip();
};

// First Part: Define the calculateTip function
function calculateTip() {
  const billAmount = document.getElementById("billamt").value;
  const serviceQuality = document.getElementById("serviceQual").value;
  let numberOfPeople = document.getElementById("peopleamt").value;

  if (billAmount === "" || serviceQuality == 0) {
    alert("Please enter a valid bill amount and select service quality.");
    return;
  }

  if (numberOfPeople === "" || numberOfPeople < 1) {
    numberOfPeople = 1;
    document.getElementById("each").style.display = "none";
  } else {
    document.getElementById("each").style.display = "inline";
  }

  const total = (billAmount * serviceQuality) / numberOfPeople;
  const roundedTotal = total.toFixed(2);

  document.getElementById("totalTip").style.display = "block";
  document.getElementById("tip").innerText = roundedTotal;
}
