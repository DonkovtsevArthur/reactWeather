import React from 'react';

const WeatherDetails = ({ city, temperatura, description }) => {
  return <div className="weather-details">
      <div className="city">{city}</div>
      <div className="temperatura">{temperatura} ℃</div>
      <div className="description">{description}</div>
    </div>;
};


export default WeatherDetails;