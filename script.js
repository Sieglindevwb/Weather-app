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
    return data.results[0];
}

async function getWeatherData(location) {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude='+ location.latitude +'&longitude='+ location.longitude)
    const data = await response.json();
    return data;
}

async function startWeatherApp(){
    const getCityInput = document.querySelector('#cityName').value;

    const geo = await getGeoData(getCityInput);

    // Check if geo-location data is available
    if (geo) {
        const weather = await getWeatherData(geo);

         // Log the entire weather object to inspect its structure
         console.log('Full Weather Data:', weather);

        const currentTemperature = weather.current_weather.temperature;
        const conditions = weather.current_weather.conditions;
        const description = weather.current_weather.description; 
        // Now you can work with the weather data
        console.log('current temperature: ' + currentTemperature + '°C');
        console.log('conditions: ' + conditions);
        console.log('Description: ' + description);
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


