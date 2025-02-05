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
            console.log(data.name);
        }
    }).catch( error => {
        resultDiv.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
    });
})