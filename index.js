const form = document.getElementById("weatherForm");
const resultDiv = document.getElementById("weatherResult");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const cities = document.getElementById("citiesInput").value.split(',');
    cities.forEach((element) => element.trim());
    resultDiv.innerHTML = "";

    if (!cities) {
        resultDiv.innerHTML = '<div class="alert alert-danger">Please enter a city name.</div>';
        return;
    }

    try {
        const apiKey = "1e988bb69fe10e044d104c082b3616f2";
        
    } catch (error) {
        resultDiv.innerHTML = '<div class="alert alert-danger">${error.message}</div>';
    }
})