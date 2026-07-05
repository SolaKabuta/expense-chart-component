
let balance = document.getElementById("balance").innerHTML = "$" + 921.48; 

let charts = document.getElementById("charts"); 
let total = document.getElementById("total");
let pourcentage = document.getElementById("pourcentage");

// DAYS
// let monday = document.getElementById("monday")

// // DAY AMOUNT
// let mondayAmount = document.getElementById("mon-amount")

// DISPLAY HOVER AMOUNT
// monday.addEventListener("mouseenter", function() {
//     mondayAmount.classList.toggle("invisible");
// })


fetch("/data.json")
  .then(response => response.json())
  .then(data => {

    total = data.reduce((sum, item) => sum + item.amount, 0)
    console.log(total)

    data.map(displayDay)

    function displayDay(item) {
      console.log(item.day)
      charts.innerHTML += `<li id="monday">
          <div id="mon-amount" class="invisible bg-[#3A2315] p-2  text-white text-center rounded-lg">
             <p>${item.amount}</p> 
          </div>
          <div class="bg-[#EC755D] w-10 h-20 rounded-md relative">
              <span class="absolute -top-6 left-1/2 -translate-x-1/2 text-sm opacity-0">
                  $17.45
              </span>
          </div>
          <p class="opacity-60">${item.day}</p>
      </li>`
    }

    

    
});

// WHAT DAY R WE 
let today = new Date().getDay();

// TOTAL