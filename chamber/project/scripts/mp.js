
/* JavaScript File */

document.addEventListener("DOMContentLoaded", function () {
    // ✅ Check if weather widget exists before updating it
    const weatherWidget = document.getElementById("weather-widget");
    
    // ✅ Replace with your actual API key
    const apiKey = "6ccf135f390e619440faea8be0d967f0"; 
    const city = "Lagos"; 

    if (weatherWidget) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=4&appid=${apiKey}`)
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
    } else {
        console.warn("Element #weather-widget not found in HTML.");
    }
})

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

async function fetchData() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        displayContent(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayContent(items) {
    const contentSection = document.querySelector('.dynamic-content');
    contentSection.innerHTML = '';

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <a href="${item.link}" target="_blank">Learn More</a>
        `;
        contentSection.appendChild(card);
    });
    
}


      // Display current year and last modified date
    const currentYear = new Date().getFullYear();
    document.getElementById("year").textContent = currentYear;
    document.getElementById("lastModified").textContent = document.lastModified;


    