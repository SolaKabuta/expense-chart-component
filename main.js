
let balance = document.getElementById("balance").innerHTML = 921.48; 
let charts = document.getElementById("charts"); 
let monthTotal = document.getElementById("total");
let pourcentage = document.getElementById("pourcentage");

// DAYS
// let monday = document.getElementById("monday")

// // DAY AMOUNT
// let mondayAmount = document.getElementById("mon-amount")

// DISPLAY HOVER AMOUNT
// charts.addEventListener("mouseenter", function() {
//     chart.classList.toggle("invisible");
// })


fetch("/data.json")
  .then(response => response.json())
  .then(data => {

    // CALCULATE EXPENSES SUM
    let expensesSum = data.reduce((sum, item) => sum + item.amount, 0)
    console.log(expensesSum) // 227,94

    
    let total = document.getElementById("total-amount");

    let result = balance - expensesSum

    // DISPLAY TOTAL AFTER EXPENSES 
    total.innerHTML = result

    
    // MAP THROUGH DATA.JSON 
    data.map(displayDay)

    // DISPLAY DAILY CHART
    function displayDay(item) {
      charts.innerHTML += `<li id=${item.day}>
          <div id=${item.amount} class="invisible bg-[#3A2315] p-2  text-white text-center rounded-lg">
             <p>${item.amount}</p> 
          </div>
          <div class="bg-[#EC755D] w-10 h-20 rounded-md relative">
              <span class="absolute -top-6 left-1/2 -translate-x-1/2 text-sm opacity-0">
                  $17.45
              </span>
          </div>
          <p class="opacity-60">${item.day}</p>
      </li>`

      let mon = document.getElementById('mon');

      

    }

    
});

// WHAT DAY R WE 
let today = new Date().getDay();

