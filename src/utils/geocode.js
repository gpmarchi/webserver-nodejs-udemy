const request = require("request");

const apiToken =
  "pk.eyJ1Ijoib25ld2FudWkiLCJhIjoiY2swNWthYnlsMDFwODNnbHFleHhvcWRtaiJ9.8XGGG3XurWHT6utJreUOVQ";

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${apiToken}&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    const { message, features } = body;

    if (error) {
      callback("Unable to connect to geo-location service!", undefined);
    } else if (message || features.length === 0) {
      callback(
        "Unable to find geo-location by search terms provided or invalid query format!",
        undefined
      );
    } else {
      callback(undefined, {
        longitude: features[0].center[0],
        latitude: features[0].center[1],
        location: features[0].place_name
      });
    }
  });
};

module.exports = geocode;
