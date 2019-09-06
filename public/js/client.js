const log = console.log;

const weatherForm = document.querySelector("div.main-content form");
const search = document.querySelector("div.main-content form input");
const errorLocation = document.querySelector("div.main-content p#error-loc");
const forecast = document.querySelector("div.main-content p#forecast");

weatherForm.addEventListener("submit", event => {
  event.preventDefault();

  const location = search.value;

  errorLocation.textContent = "Loading...";
  forecast.textContent = "";

  fetch(`/weather?address=${location}`).then(response => {
    response.json().then(parsedData => {
      if (parsedData.error) {
        errorLocation.textContent = parsedData.error;
      } else {
        errorLocation.textContent = parsedData.location;
        forecast.textContent = parsedData.forecast;
      }
    });
  });
});
