
let balance = document.getElementById("balance").innerHTML = "$" + 921.48; 

let charts = document.getElementById("charts"); 
let total = document.getElementById("total");
let pourcentage = document.getElementById("pourcentage");

// DAYS
let monday = document.getElementById("monday")

// DAY AMOUNT
let mondayAmount = document.getElementById("mon-amount")

// DISPLAY HOVER AMOUNT
monday.addEventListener("mouseenter", function() {
    mondayAmount.classList.toggle("invisible");
})


fetch("/data.json")
  .then(response => response.json())
  .then(data => {
    console.log(data);

    total = data.reduce((sum, item) => sum + item.amount, 0)
    console.log(total)

    
});

// WHAT DAY R WE 
let today = new Date().getDay();

// TOTAL