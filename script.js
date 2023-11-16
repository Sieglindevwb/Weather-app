// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method:'POST',
//     body: JSON.stringify({
//         title: 'foo',
//         body: 'bar',
//         userId: 1,
//     }),
//     headers: {
//         'content-type': 'application/json; charset=UTF-8',
//     },
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json));
const button = document.querySelector(".submitCityName");
const inputField = document.querySelector('#cityName');

async function getGeoData(cityName){
    const response = await fetch('https://geocoding-api.open-meteo.com/v1/search?name=' + cityName + '&count=10&language=en&format=json');
    const data = await response.json();
    const cityNameElement = document.querySelector('#city');
    
    cityNameElement.textContent = data.results[0].name + ', ' + data.results[0].country;
    console.log(data);
    console.log(data.results[0].country);
    return data.results[0];
}

async function getWeatherData(location) {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude='+ location.latitude +'&longitude='+ location.longitude + '&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_clear_sky_max,precipitation_sum&timezone=Europe%2FLondon');
    const data = await response.json();
    console.log('Weather Data Response:', data);
    return data;
}

function updateWeatherDisplay(weather) {
    const temperature = weather.current.temperature_2m;
    const description =
      "Description: " +
      (weather.current.precipitation > 0 ? "It's raining" : "Clear sky");
  
    // Select the HTML elements where you want to display weather information
    const temperatureElement = document.querySelector('#temperature');
    const descriptionElement = document.querySelector('#description');
    const dailyForecastElement = document.querySelector('#daily-forecast');
    const iconElement = document.querySelector('#weather-icon');
  
    // Update the content of the selected elements
    temperatureElement.textContent = 'Temperature: ' + temperature + '°C';
    descriptionElement.textContent = description;

    // Get the weather icon URL
    const weatherIcon = getWeatherIcon(weather.current.precipitation);

    // Set the weather icon
    iconElement.src = weatherIcon;
  
    // Update the daily forecast information
    const dailyForecastData = weather.daily;
  
    // Clear existing content in the daily forecast element
    dailyForecastElement.innerHTML = '';
  
    // Iterate over each day in the forecast data
    dailyForecastData.time.forEach((day, index) => {
        const date = new Date(day);
        // Inside the loop where you create daily forecast items
        const dayElement = document.createElement('div');
        dayElement.classList.add('daily-forecast-item');

        // Create separate paragraphs for each piece of information
        const dateParagraph = document.createElement('p');
        dateParagraph.textContent = date.toDateString();

        const maxTemperatureParagraph = document.createElement('p');
        maxTemperatureParagraph.textContent = 'Max ' + dailyForecastData.temperature_2m_max[index] + '°C';

        const minTemperatureParagraph = document.createElement('p');
        minTemperatureParagraph.textContent = 'Min ' + dailyForecastData.temperature_2m_min[index] + '°C';

        const precipitationParagraph = document.createElement('p');
        precipitationParagraph.textContent = 'Precipitation ' + dailyForecastData.precipitation_sum[index] + 'mm';

        // Append paragraphs to the daily forecast item
        dayElement.appendChild(dateParagraph);
        dayElement.appendChild(maxTemperatureParagraph);
        dayElement.appendChild(minTemperatureParagraph);
        dayElement.appendChild(precipitationParagraph);

        // Append the daily forecast item to the daily forecast container
        dailyForecastElement.appendChild(dayElement);
    });
}

function getWeatherIcon(precipitation) {
    // Assuming that you have an icon URL for rainy and clear weather
    return precipitation > 0
        ? './icons/rain.gif'
        : './icons/sun.gif';
}

async function startWeatherApp(){
    const getCityInput = document.querySelector('#cityName').value;

    const geo = await getGeoData(getCityInput);

    // Check if geo-location data is available
    if (geo) {
        const weather = await getWeatherData(geo);

        // Update the HTML elements with weather information
        updateWeatherDisplay(weather);
        document.getElementById('daily-forecast').style.display = 'flex';
         // Select all elements with the class 'daily-forecast-item'
         const forecastItems = document.querySelectorAll('.daily-forecast-item');

         // Loop through each item and set its display style
         forecastItems.forEach(item => {
             item.style.display = 'flex';
         });
    } else {
        console.error('Error fetching geo-location data');
    }
}

inputField.addEventListener('keyup', (event) => {
    if (event.code === "Enter") {
        event.preventDefault();
        startWeatherApp()
    }
})
button.addEventListener('click', (event) => {
    event.preventDefault();
    startWeatherApp();
})

// function createFormWithInputAndButton(labelText, buttonLabel) {
//     //create form
//     let form = document.createElement("form");

//     //create h1 element
//     let label = document.createElement("h1");
//     label.textContent = labelText;
//     form.appendChild(label);
//     console.log("label:", labelText);
    
//     // Create input element
//     let input = document.createElement("input");
//     input.setAttribute("type", "text");
//     form.appendChild(input);
//     console.log("input created");

//     // create submit button
//     let submitButton = document.createElement("button")
//     submitButton.setAttribute("type", "submit");
//     submitButton.textContent = buttonLabel || "Submit";
//     form.appendChild(submitButton);

//     document.body.appendChild(form);

//     form.addEventListener("submit", (event) => {
//         event.preventDefault();
//         console.log("City input created:", input.value);
//     });
    
//  // Return the input element in case you want to do further operations with it
// return form;
// }

// // Example usage
// let form = createFormWithInputAndButton("Choose city");
// console.log("City input created:", form);


// TODO: Use an api to get the weather data for at least the next 5 days


