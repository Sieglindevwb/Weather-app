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
let geoLocation = ('https://geocoding-api.open-meteo.com/v1/search');

async function getGeoLocation(){
    // Use fetch to make the API request
    let response = await fetch(geoLocation);

    // Use response.json() to parse the response body as JSON
    let data = await response.json();

    // Now you can work with the parsed JSON datav
    console.log(data);
}

function createFormWithInputAndButton(labelText, buttonLabel) {
    //create form
    let form = document.createElement("form");

    //create h1 element
    let label = document.createElement("h1");
    label.textContent = labelText;
    form.appendChild(label);
    console.log("label:", labelText);
    
    // Create input element
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    form.appendChild(input);
    console.log("input created");

    // create submit button
    let submitButton = document.createElement("button")
    submitButton.setAttribute("type", "submit");
    submitButton.textContent = buttonLabel || "Submit";
    form.appendChild(submitButton);

    document.body.appendChild(form);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("City input created:", input.value);
    });
    
 // Return the input element in case you want to do further operations with it
return form;
}

// Example usage
let form = createFormWithInputAndButton("Choose city");
console.log("City input created:", form);


// TODO: Use an api to get the weather data for at least the next 5 days


