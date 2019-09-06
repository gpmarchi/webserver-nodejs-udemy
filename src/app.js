const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const log = console.log;
const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Gustavo Marchi"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Gustavo Marchi"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Gustavo Marchi",
    helpText: "This is where the help message goes."
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.send({
      error:
        "You must provide an address for the weather service to run a query."
    });
  }

  // passing a default empty object to deconstruct for the case where an invalid
  // query is sent to the api
  geocode(address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast,
        location,
        address
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Gustavo Marchi",
    errorMessage: "Help article not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Gustavo Marchi",
    errorMessage: "Page not found"
  });
});

app.listen(3000, () => {
  log("Server is up on port 3000.");
});
