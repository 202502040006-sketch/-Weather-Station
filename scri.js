
// Starting city: Pune
let lat = 18.5204;
let lon = 73.8567;
let city = "Pune";

// Weather codes to descriptions
const weatherNames = {
    0: "Clear Sky",
    1: "Mostly Clear",
    2: "Partly Cloudy",
    3: "Cloudy",
    45: "Fog",
    48: "Depositing Rime Fog",
    51: "Light Drizzle",
    53: "Drizzle",
    55: "Heavy Drizzle",
    61: "Light Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    80: "Rain Showers",
    81: "Moderate Showers",
    82: "Heavy Showers",
    95: "Thunderstorm"
};

// Load weather information
async function loadWeather() {

    const message = document.getElementById("message");

    message.textContent = "Getting weather information...";

    const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}` +
        `&longitude=${lon}` +
        `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m` +
        `&timezone=auto`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Weather API is not responding");
        }

        const data = await response.json();

        if (!data.current) {
            throw new Error("Weather information unavailable");
        }

        const now = data.current;

        // Update weather information
        document.getElementById("location").textContent = city;

        document.getElementById("temperature").textContent =
            now.temperature_2m + " °C";

        document.getElementById("humidity").textContent =
            now.relative_humidity_2m + " %";

        document.getElementById("status").textContent =
            weatherNames[now.weather_code] || "Unknown";

        document.getElementById("wind").textContent =
            now.wind_speed_10m + " km/h";

        message.textContent = "Station online";

        document.getElementById("stationStatus").textContent =
            "Online";

        document.getElementById("updateText").textContent =
            "Last updated: " + new Date().toLocaleString();

        // Save weather data
        await saveReading(now);

    } catch (error) {

        console.error("Weather error:", error);

        message.textContent =
            "Could not load weather. Please try again.";

        document.getElementById("stationStatus").textContent =
            "Offline";
    }
}

// Save weather information in MongoDB
async function saveReading(now) {

    try {

        const response = await fetch("/weather/update", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                city: city,
                temperature: now.temperature_2m,
                humidity: now.relative_humidity_2m,
                status: weatherNames[now.weather_code] || "Unknown",
                wind: now.wind_speed_10m
            })
        });

        if (!response.ok) {
            throw new Error("Could not save weather data");
        }

        console.log("Weather data saved successfully");

    } catch (error) {

        console.error("Database error:", error);
    }
}

// Search city
async function searchCity() {

    const input = document.getElementById("cityInput");
    const message = document.getElementById("message");

    const cityName = input.value.trim();

    if (!cityName) {
        message.textContent = "Please enter a city name.";
        return;
    }

    message.textContent = "Searching city...";

    try {

        const url =
            "https://geocoding-api.open-meteo.com/v1/search?name=" +
            encodeURIComponent(cityName) +
            "&count=10&language=en&format=json";

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City search failed");
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            message.textContent = "City not found. Try another city.";
            return;
        }

        // Prefer an Indian city when available
        const selectedCity =
            data.results.find(place => place.country_code === "IN") ||
            data.results[0];

        lat = selectedCity.latitude;
        lon = selectedCity.longitude;
        city = selectedCity.name;

        // Load selected city's weather
        await loadWeather();

    } catch (error) {

        console.error("City search error:", error);

        message.textContent =
            "Unable to search city. Try again.";
    }
}

// Initialize website
document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("searchBtn")
        .addEventListener("click", searchCity);

    document.getElementById("refreshButton")
        .addEventListener("click", loadWeather);

    document.getElementById("cityInput")
        .addEventListener("keydown", (event) => {

            if (event.key === "Enter") {
                searchCity();
            }
        });

    // Load Pune weather automatically
    loadWeather();
});
