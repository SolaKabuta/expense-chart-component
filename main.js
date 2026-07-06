let charts = document.getElementById("charts"); 

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

      let today = new Date().getDay(); 
  
      const weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  
      // DISPLAY CURRENT DAY 
      let currentDayName = weekDays[today];

      // DISPLAY CHART COLOR BASED ON CURRENT DAY 
      let currentDayColor = (item.day === currentDayName) ? 'bg-[#76B5BC] hover:bg-[#B4DFE5]' : 'bg-[#EC755D] hover:bg-[#FF9B87]';
      
      charts.innerHTML +=
        `<li id=${item.day} class="group">
          <div id=${item.amount} class="opacity-0 bg-[#3A2315] p-2  text-white text-center rounded-md transition duration-150 ease-in-out group-hover:opacity-100">
             <p class="font-semibold text-xl"><span>$</span>${item.amount}</p> 
          </div>
          <div style='height:${item.amount*2.5}px;' class="${currentDayColor} transition duration-300  hover:cursor-pointer w-10 rounded-md">
          </div>
          <p class="text-[#B1ACA7] font-semibold text-xs py-2">${item.day}</p>
      </li>`
    }

});



