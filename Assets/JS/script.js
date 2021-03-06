// var searchButton = $("#searchButton");
// var selectionHistory = $(".selectionHistory");
// var weatherOutput = $(".weatherOutput");
var selectedCity = $("#selectedCityName");
var userSelection = document.querySelector("#user-selection")
// var currentTemp = $("#tempToday");
// var currentWind = $("#windToday");
// var currentHumid = $("#humidityToday");
// var currentUv = $("#uvToday");
// var currentDay = moment();
// var city = [];

// if (localStorage.getItem("city") != null) {
//   city = JSON.parse(localStorage.getItem("city"));
// }

// function saveSelection() {
//   localStorage.setItem("city", JSON.stringify(city));
// }

// function begin() {
//     weatherOutput.attr("style", "display: none");

//     searchButton.on("click", function () {

//     var cityInput = $("#citySelection").val();
//     display(cityInput);

//     for (var i = 0; i < city.length; i++) {
//         if (cityInput == city[i]) {
//             return;
//         }
//     }

//     city.push(cityInput);

//     });
// }

// function display(entry) {
//     var cityInput = entry;
//     weatherOutput.attr("style", "display: block");

//     var currentForecast = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&appid=5b787b122cd0fc16a703d189885623e5`;

//     fetch(currentForecast)

//     }

// function enteredCity() {
//     selectionHistory.text("");

//     for (var i = 0; i < city.length; i++) {
//         var pEl = document.createElement("p");
//         pEl.textContent = city[i].toUpperCase();
//         pEl.setAttribute("id", "citySelection" + i);
//         document.querySelector(".selectionHistory").appendChild(pEl);
//     }
// }

// function previousEnteredCity() {
//     selectionHistory.on("click", function (event) {
//         var element = event.target;

//         if (element.matches("p") === true) {
//             var index = element.getAttribute("id");

//             for (var i = 0; i < city.length; i++) {
//                 var prevSelectedCity = $("#citySelection" + i)[0].innerText;

//                 if (index == $("#citySelection" + i)[0].id) {
//                 displayWeather(prevSelectedCity);
//                 break;
//                 }
//             }
//         }
//     });
// }

// enteredCity();
// previousEnteredCity();
// begin();

var formSubmitHandler = function (event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var cityName = cityNameInputEl.value.trim();

  if (cityName) {
    getWeatherData(cityName);

    // clear old content
    cityNameInputEl.value = "";
  } else {
    alert("Please enter a valid city");
  }
};

var getWeatherData = function (selectedCity) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?&units=imperial&appid=d74d7d2ca26796562d16f6ec728f47ab=" +
    selectedCity;

  //make a get request to url
  fetch(apiUrl)
    .then(function (response) {
      console.log(response);
      if (response.ok) {
        response.json().then(function (data) {
          weatherView(data);
          console.log(data);
        });
      } else {
        alert("Please enter a valid city");
      }
    })
    .catch(function (error) {
      alert("Unable to get forecast");
    });
};

userSelection.addEventListener("submit", submitHandler );
