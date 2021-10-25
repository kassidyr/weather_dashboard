var searchButton = $("#searchButton");
var selectionHistory = $(".selectionHistory");
var weatherOutput = $(".weatherOutput");
var selectedCity = $("#selectedCityName");
var currentTemp = $("#tempToday");
var currentWind = $("#windToday");
var currentHumid = $("#humidityToday");
var currentUv = $("#uvToday");
var currentDay = moment();

var city = [];
if (localStorage.getItem("city") != null) {
  city = JSON.parse(localStorage.getItem("city"));
}
function saveCity() {
  localStorage.setItem("city", JSON.stringify(city));
}

function initial() {
  weatherOutput.attr("style", "display: none");

  searchButton.on("click", function () {
    var cityInput = $("#city").val();
    displayWeather(cityInput);

    for (var i = 0; i < city.length; i++) {
      if (cityInput == city[i]) {
        return;
      }
    }

    city.push(cityInput);

  });
}

function displayWeather(x) {
  var cityInput = x;
  weatherContainer.attr("style", "display: block");

  var currentConditions = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&appid=5b787b122cd0fc16a703d189885623e5`;

  fetch(currentConditions)
    .then(function (response) {
      // console.log(response.status);
      if (response.status === 404 || response.status === 400) {
        alert("Error: City not found, please try again.");
        location.reload();
      } else {
        renderCity();
        saveCity();
      }
      return response.json();
    })
    .then(function (data) {
      var currentDate = currentDay.format("L");
      var iconcode = data.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
      $("#weatherIcon").attr("src", iconurl);

      selectedCity.text(`${data.name} (${currentDate})`);
      currentTemp.text(`Temp: ${data.main.temp}° F`);
      currentWind.text(`Wind: ${data.wind.speed} MPH`);
      currentHumid.text(`Humidity: ${data.main.humidity} %`);

      var lat = data.coord.lat;
      var lon = data.coord.lon;
      var uvIndex = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=5b787b122cd0fc16a703d189885623e5`;

      fetch(uvIndex)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          currentUv.text(`UV Index: ${data.current.uvi}`);
          currentUv.removeClass("favorable-uv")
          currentUv.removeClass("moderate-uv")
          currentUv.removeClass("severe-uv")
          if (data.current.uvi < 2) {
            currentUv.addClass("favorable-uv");
          } else if (data.current.uvi > 2 && data.current.uvi < 7) {
            currentUv.addClass("moderate-uv");
          } else {
            currentUv.addClass("severe-uv");
          }

          for (var i = 1; i < 6; i++) {
            var dateFive = $("#day" + i);
            var tempFive = $("#tempDay" + i);
            var windFive = $("#windDay" + i);
            var humidityFive = $("#humidityDay" + i);
            var weatherIcon5 = $("#weatherIcon" + i);
            var nextDay = new Date(data.daily[i].dt * 1000);
            var date = moment(nextDay).format("MM/DD/YYYY");
            var iconcode = data.daily[i].weather[0].icon;
            var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";

            dateFive.text(date);
            weatherIcon5.attr("src", iconurl);
            tempFive.text(`Temp: ${data.daily[i].temp.day}° F`);
            windFive.text(`Wind: ${data.daily[i].wind_speed} MPH`);
            humidityFive.text(`Humidity: ${data.daily[i].humidity} %`);
          }
        });
    });
}

function enteredCity() {
  selectionHistory.text("");

  for (var i = 0; i < city.length; i++) {
    var pEl = document.createElement("p");
    pEl.textContent = city[i].toUpperCase();
    pEl.setAttribute("id", "city-" + i);
    document.querySelector(".city-searched").appendChild(pEl);
  }
}

function previousEnteredCity() {
  selectionHistory.on("click", function (event) {
    var element = event.target;

    if (element.matches("p") === true) {
      var index = element.getAttribute("id");

      for (var i = 0; i < city.length; i++) {
        var oldCity = $("#city-" + i)[0].innerText;

        if (index == $("#city-" + i)[0].id) {
          displayWeather(oldCity);
          break;
        }
      }
    }
  });
}

enteredCity();
previousEntereddCity();
initial();