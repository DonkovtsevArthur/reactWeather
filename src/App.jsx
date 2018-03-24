import React, { Component } from "react";

import WeatherIcon from "./components/Weathericon";
import WeatherDetails from "./components/WeatherDetails";

import "./App.css";

class App extends Component {
  state = {
    icon: "",
    time: 1,
    city: "",
    temperatura: "",
    weatherCode: "",
    descraption: "",
    fetching: true
  };

  componentDidMount() {
    this.fetchIP();
  }

  fetchWeatherData = city => {
    const baseUrl = `http://api.openweathermap.org/`;
    const path = `/data/2.5/weather`;
    const appId = `a80f24bae472d67762dae6e0f4c373d4`;
    const query = `units=metric&lang=ru&appid=${appId}`;

    fetch(`${baseUrl}${path}?q=${city}&${query}`)
      .then(response => response.json())
      .then(data => {
        const date = new Date();
        const time = date.getHours();

        this.setState({
          time,
          city,
          temperatura: Math.round(data.main.temp),
          weatherCode: data.weather[0].id,
          description: data.weather[0].description,
          fetching: false
        });
      })
      .catch(error => console.log(error));
  };

  fetchIP = () => {
    fetch("//freegeoip.net/json/")
      .then(response => response.json())
      .then(({ city }) => this.fetchWeatherData(city))
      .catch(error => console.log(error));
  };
  render() {
    const {
      fetching,
      icon,
      city,
      time,
      temperatura,
      weatherCode,
      description
    } = this.state;
    return fetching ? (
      <div className="app">Загрузка...</div>
    ) : (
      <div className="app" data-hour={time}>
        <WeatherIcon icon={icon} weatherCode={weatherCode} time={time} />
        <WeatherDetails
          city={city}
          temperatura={temperatura}
          description={description}
        />
      </div>
    );
  }
}

export default App;
