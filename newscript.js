// Use an empty object literal
let obj = {};

// Select the button
let button = document.querySelector("#button");

button.addEventListener("click", (e) => {
  // Get input values
  let inputamt = document.querySelector("#inputamt").value;
  let inputcurr = document.querySelector("#sel1").value;
  let outputcurr = document.querySelector("#sel2").value;

  // Check if both currencies are selected
  if (!inputcurr || !outputcurr) {
    alert("Please select both currencies.");
    return;
  }

  // Fetch the exchange rates
  fetch("https://v6.exchangerate-api.com/v6/7b9f4591d3dd5ba804380290/latest/USD")
    .then(response => response.json())
    .then(data => {
      // Ensure both currencies are in the fetched data
      if (data.conversion_rates[inputcurr] && data.conversion_rates[outputcurr]) {
        // Calculate exchange rate from input currency to output currency
        obj.exchrate = data.conversion_rates[outputcurr] / data.conversion_rates[inputcurr];
        
        // Calculate and display the converted amount
        document.querySelector("#result").innerHTML = `${(inputamt * obj.exchrate).toFixed(2)}`;

        // Update the exchange rate and currencies in the UI
        document.querySelector("#span1").innerHTML = `${inputcurr}`;
        document.querySelector("#span2").innerHTML = `${obj.exchrate.toFixed(2)}`;
        document.querySelector("#span3").innerHTML = `${outputcurr}`;
        document.querySelector('.Image').src = "nami.png";
        document.querySelector('.para').style.color = "black";
      } else {
        alert("Selected currencies are not available in the API.");
      }
    })
    .catch(error => {
      console.error("Error fetching the exchange rates:", error);
      alert("An error occurred while fetching the exchange rates.");
    });
});


