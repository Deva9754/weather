


const apikey = "0c5dfdbad7f2e35649d42513bb560924";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + apikey; // Fix the API URL

const searchbox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button"); // Fix the selector for search button
const weathericon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiurl + "&q=" + city); // Fix the API request URL

    if (response.status === 400) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      var data = await response.json();
      console.log(data);

      // Use correct selectors to set innerHTML
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + "Km/hr";

      if (data.weather[0].main == "Clouds") {
        weathericon.src = "images/clouds.png";
      } else if (data.weather[0].main == "Clear") {
        weathericon.src = "images/clear.png";
      } else if (data.weather[0].main == "Rain") {
        weathericon.src = "images/rain.png";
      } else if (data.weather[0].main == "Drizzle") {
        weathericon.src = "images/drizzle.png";
      } else if (data.weather[0].main == "Mist") {
        weathericon.src = "images/mist.png";
      }
      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchbox.value);
});

// You should call checkWeather with a default city or handle it appropriately
// For example, checkWeather("defaultCity"); or checkWeather() with a default city
