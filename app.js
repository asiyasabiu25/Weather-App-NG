// Load state and city dropdowns
function updateCities() {
  const state = document.getElementById("stateSelect").value;
  const citySelect = document.getElementById("citySelect");

  citySelect.innerHTML = ""; // Clear previous cities

  nigeriaLocations[state].forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });
}

// Fetch weather from WeatherAPI
function getWeather() {
  const city = document.getElementById("citySelect").value;
  const apiKey = "0238f9837ff945e891a143140251307"; // <- Replace this with your real key

  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Weather not found.");
      }
      return response.json();
    })
    .then((data) => {
      const resultDiv = document.getElementById("weatherResult");
      resultDiv.innerHTML = `
        <h3>Weather in ${data.location.name}, ${data.location.country}</h3>
        <p><strong>${data.current.temp_c}°C</strong> - ${data.current.condition.text}</p>
        <img src="${data.current.condition.icon}" alt="Icon" />
        <p>Humidity: ${data.current.humidity}%</p>
        <p>Wind: ${data.current.wind_kph} km/h</p>
      `;
    })
    .catch((error) => {
      document.getElementById("weatherResult").innerHTML =
        "<p style='color: red;'>Unable to fetch weather data.</p>";
      console.error(error);
    });
}

// Load state dropdown
window.onload = function () {
  const stateSelect = document.getElementById("stateSelect");
  for (const state in nigeriaLocations) {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    stateSelect.appendChild(option);
  }
  updateCities(); // Load initial cities
};
