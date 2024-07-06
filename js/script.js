document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://restcountries.com/v3.1/all';
    const weatherApiUrl = 'https://openweathermap.org/';
    const weatherApiKey = 'https://openweathermap.org/';

    // Fetch countries data from Restcountries API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                // Create Bootstrap card dynamically
                const card = document.createElement('div');
                card.classList.add('col-md-4', 'mb-4');
                card.innerHTML = `
                    <div class="card">
                        <img src="${country.flags.png}" class="card-img-top" alt="Flag">
                        <div class="card-body">
                            <h5 class="card-title">${country.name.common}</h5>
                            <p class="card-text">Capital: ${country.capital[0]}</p>
                            <p class="card-text">Region: ${country.region}</p>
                            <p class="card-text">Country Code: ${country.cca2}</p>
                            <button class="btn btn-primary" data-toggle="modal" data-target="#weatherModal${country.cca2}">Show Weather</button>
                        </div>
                    </div>
                `;
                document.getElementById('country-cards').appendChild(card);

                // Fetch weather data for each country on button click
                const weatherButton = card.querySelector('.btn-primary');
                weatherButton.addEventListener('click', function() {
                    fetch(`${weatherApiUrl}?q=${country.capital[0]}&appid=${weatherApiKey}&units=metric`)
                        .then(response => response.json())
                        .then(weatherData => {
                            // Display weather data in modal
                            const modalContent = `
                                <div class="modal fade" id="weatherModal${country.cca2}" tabindex="-1" role="dialog" aria-labelledby="weatherModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="weatherModalLabel">${country.name.common} Weather</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <p>Capital: ${country.capital[0]}</p>
                                                <p>Latitude: ${country.latlng.join(', ')}</p>
                                                <img src="${country.flags.png}" alt="Flag" style="max-width: 50px;">
                                                <p>Region: ${country.region}</p>
                                                <p>Weather: ${weatherData.weather[0].main}</p>
                                                <p>Temperature: ${weatherData.main.temp}°C</p>
                                                <p>Humidity: ${weatherData.main.humidity}%</p>
                                                <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                            document.body.insertAdjacentHTML('beforeend', modalContent);
                            $(`#weatherModal${country.cca2}`).modal('show');
                        })
                        .catch(error => {
                            console.error('Error fetching weather data:', error);
                            alert('Failed to fetch weather data. Please try again later.');
                        });
                });
            });
        })
        .catch(error => {
            console.error('Error fetching countries data:', error);
            alert('Failed to fetch countries data. Please try again later.');
        });
});