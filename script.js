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
let geoLocation = ('https://geocoding-api.open-meteo.com/v1/search?name=Canberra&count=10&language=en&format=json');

async function getGeoLocation(){

}

function createFormWithInputAndButton(labelText, buttonLabel) {
    //create form
    let form = document.createElement("form");

    //create p element
    let label = document.createElement("h1");
    label.textContent = labelText;
    form.appendChild(label);
    console.log("label");
    
    // Create input element
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    form.appendChild(input);
    console.log("geoLocation");

    // create submit button
    let submitButton = document.createElement("button")
    submitButton.setAttribute("type", "submit");
    submitButton.textContent = buttonLabel || "Submit";
    form.appendChild(submitButton);

    document.body.appendChild(form);
    
 // Return the input element in case you want to do further operations with it
return form;
}

// Example usage
let cityInput = createFormWithInputAndButton("Choose city");
console.log("City input created:", cityInput);



