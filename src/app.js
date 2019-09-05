const path = require("path");
const express = require("express");
const hbs = require("hbs");

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
  res.send({
    location: "São Paulo, Brazil",
    forecast: "It's 14 degrees out."
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
