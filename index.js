const form = document.getElementById("weather-form");
const resultDiv = document.getElementById("weatherResult");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const inputs = document.getElementById("citiesInput").value.split(',');
    const cities = [];
    inputs.forEach((city) => cities.push(city.trim()));
    resultDiv.innerHTML = "";

    if (!cities) {
        resultDiv.innerHTML = `<div class="alert alert-danger">Please enter a city name.</div>`;
        return;
    }
    const apiKey = "1e988bb69fe10e044d104c082b3616f2";
    const responses = cities.map(async (city) => await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    ));

    Promise.all(responses).then(async (responses) => {
        for (const response of responses) {
            if (!response.ok) {
                throw new Error("City not found.");
            }

            const data = await response.json();
            
            resultDiv.innerHTML += `
            <div class="card result-card p-3">
                <div class="card-body text-center">
                <h5 class="card-title">${data.name}, ${data.sys.country} <i class="fas fa-map-marker-alt text-info"></i></h5>
                <p class="mb-2"><i class="fas fa-temperature-high text-danger"></i> <strong>${data.main.temp}°C</strong></p>
                <p class="mb-2"><i class="fas fa-cloud text-primary"></i> ${data.weather[0].description}</p>
                <p class="mb-0"><i class="fas fa-tint text-info"></i> Humidity: ${data.main.humidity}%</p>
                </div>
            </div>
            `;
        }
    }).catch( error => {
        resultDiv.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
    });
})