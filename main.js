

let total = document.getElementById("total");
let pourcentage = document.getElementById("pourcentage");

// DAYS
let monday = document.getElementById("monday")

// DAY AMOUNT
let mondayAmount = document.getElementById("mon-amount")

// DISPLAY AMOUNT
monday.addEventListener("mouseenter", displayMonday)

function displayMonday() {
  mondayAmount.classList.toggle("invisible")
}

fetch("/data.json")
  .then(response => response.json())
  .then(data => {
    console.log(data);
});


// TOTAL