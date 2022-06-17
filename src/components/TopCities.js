import React from 'react';
import { useCitiesContext } from '../context/cities_context';
import { Link } from 'react-router-dom';
import BookmarkCity from './BookmarkCity';
import DeleteCity from './DeleteCity';

const TopCities = () => {
  const { top_cities } = useCitiesContext();

  return (
    <section>
      <h3 className="section-title">Top cities</h3>
      <div className="card-wrapper">
        {top_cities.map(({ current, location, id, isFave }) => {
          const { weather_icons, temperature } = current;
          const { country, name } = location;
          return (
            <article key={id} className="card">
              <Link className="card-link" to={`./details/${id}`}>
                <div className="card-details">
                  <div className="card-info">
                    <p className="info-name">{name},</p>
                    <p className="info-capital">{country}</p>
                    <p className="info-temp">{temperature}ºC</p>
                  </div>
                  <div className="card-img">
                    <img src={weather_icons[0]} alt="weather situation" />
                  </div>
                </div>
              </Link>
              <div className="btns-cta">
                <BookmarkCity id={id} isFave={isFave} />
                <DeleteCity id={id} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default TopCities;
