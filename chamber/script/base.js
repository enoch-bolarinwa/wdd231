document.addEventListener("DOMContentLoaded", function () {
    const weatherWidget = document.getElementById("weather-widget");
    const apiKey = "c5d8c0c4f89e18b31a70a21202cd79e8";
    const city = "Lagos";

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${Lagos}&units=metric&cnt=4&appid=${c5d8c0c4f89e18b31a70a21202cd79e8}`)
        .then(response => response.json())
        .then(data => {
            const currentWeather = data.list[0];
            const forecast = data.list.slice(1, 4);

            let weatherHTML = `<p>Current: ${currentWeather.main.temp}°C, ${currentWeather.weather[0].description}</p>`;
            weatherHTML += `<h3>3-Day Forecast:</h3><ul>`;
            forecast.forEach(day => {
                const date = new Date(day.dt * 1000).toLocaleDateString();
                weatherHTML += `<li>${date}: ${day.main.temp}°C, ${day.weather[0].description}</li>`;
            });
            weatherHTML += `</ul>`;

            weatherWidget.innerHTML = weatherHTML;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            weatherWidget.innerHTML = "Weather data unavailable";
        });
    })
    // Load business spotlights
    fetch("members.json")
        .then(response => response.json())
        .then(members => {
            const goldSilverMembers = members.filter(member => member.level === "Gold" || member.level === "Silver");
            const selectedMembers = goldSilverMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

            const spotlightSection = document.querySelector(".spotlights");
            spotlightSection.innerHTML = "<h2>Business Spotlights</h2>";
            
            selectedMembers.forEach(member => {
                const memberHTML = `
                    <div class="spotlight">
                        <img src="${member.logo}" alt="${member.name} Logo">
                        <h3>${member.name}</h3>
                        <p>${member.address}</p>
                        <p>${member.phone}</p>
                        <a href="${member.website}" target="_blank">Visit Website</a>
                        <p class="membership">${member.level} Member</p>
                    </div>
                `;
                spotlightSection.innerHTML += memberHTML;
            });
        })
        .catch(error => console.error("Error loading members data:", error));

