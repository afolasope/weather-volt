import React from 'react';
import BookmarkCity from './BookmarkCity';
import { useDetailsContext } from '../context/details_context';

const WeatherReport = () => {
  const { displayedDetails, isLoading } = useDetailsContext();

  if (!displayedDetails.current) {
    return null;
  }

  const {
    pressure,
    precip,
    humidity,
    wind_degree,
    wind_dir,
    wind_speed,
    observation_time,
    temperature,
    weather_descriptions,
    weather_icons,
  } = displayedDetails.current;
  const { localtime, timezone_id, lat, lon, region, country, name } =
    displayedDetails.location;

  if (isLoading) {
    return (
      <article className="section-wrapper">
        <div className=" details-header">
          <svg
            className="loading"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="40" cy="40" r="35" />
          </svg>
        </div>
      </article>
    );
  }

  return (
    <article className="section-wrapper">
      <div className=" details-header">
        <h3>Weather Report</h3>
        <BookmarkCity
          id={displayedDetails.id}
          isFave={displayedDetails.isFave}
        />
      </div>
      <div className="details-top">
        <div>
          <p>{name},</p>
          <p>{country}</p>
        </div>
        <div>
          <p>{temperature}℃</p>
          <p>{weather_descriptions[0]}</p>
        </div>
        <div>
          <img src={weather_icons[0]} alt="weather icon" />
        </div>
      </div>
      <div className="details-bottom">
        <p>
          <span>Region</span>
          <span>{region}</span>
        </p>
        <p>
          <span>Longitude</span>
          <span>{lon}</span>
        </p>
        <p>
          <span>Latitude</span>
          <span>{lat}</span>
        </p>
        <p>
          <span>Timezone</span>
          <span>{timezone_id}</span>
        </p>
        <p>
          <span>Local Time</span>
          <span>{localtime}</span>
        </p>
        <p>
          <span>Observation Time</span>
          <span>{observation_time}</span>
        </p>
        <p>
          <span>Wind Direction</span>
          <span>{wind_dir}</span>
        </p>
        <p>
          <span>Wind Speed</span>
          <span>{wind_speed} Kmph</span>
        </p>
        <p>
          <span>Wind Degree</span>
          <span>{wind_degree}º</span>
        </p>
        <p>
          <span>Precipitation</span>
          <span>{precip} mm</span>
        </p>
        <p>
          <span>Pressure</span>
          <span>{pressure} mb</span>
        </p>
        <p>
          <span>Humidity</span>
          <span>{humidity}</span>
        </p>
      </div>
    </article>
  );
};

export default WeatherReport;
