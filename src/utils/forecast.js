const request = require('request');
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv').config();
}

const forecast = (latitude, longitude, callback) => {
  const access_key = process.env.FORECAST_ACCESS_KEY;
  const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${latitude},${longitude}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}%.`
      );
    }
  });
};

module.exports = forecast;
