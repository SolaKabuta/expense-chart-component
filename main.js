let charts = document.getElementById("charts"); 
let pourcentage = document.getElementById("pourcentage");

// DISPLAY HOVER AMOUNT
// charts.addEventListener("mouseenter", function() {
//     chart.classList.toggle("invisible");
// })

fetch("/data.json")
  .then(response => response.json())
  .then(data => {
    
    let balance = document.getElementById("balance").innerHTML = 921.48; 

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
      charts.innerHTML +=
        `<li id=${item.day} class="group flex justify-end ">
          <div id=${item.amount} class="opacity-0 bg-[#3A2315] p-2  text-white text-center rounded-md transition duration-150 ease-in-out group-hover:opacity-100">
             <p class="font-semibold text-xl"><span>$</span>${item.amount}</p> 
          </div>
          <div style="height:${item.amount}px" class="bg-[#EC755D] transition duration-300 hover:bg-[#FF9B87] w-10 rounded-md">
          </div>
          <p class="text-[#B1ACA7] text-md font-semibold">${item.day}</p>
      </li>`

      

    }

    // WHAT DAY R WE 
    let today = new Date().getDay(); 
    console.log(today)
});



