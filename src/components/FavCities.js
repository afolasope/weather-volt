import React from 'react';
import { Link } from 'react-router-dom';
import BookmarkCity from './BookmarkCity';
import DeleteCity from './DeleteCity';
import { useCitiesContext } from '../context/cities_context';

const FavCities = () => {
  const { fav_cities } = useCitiesContext();

  if (!fav_cities) {
    return null;
  }
  const handleClick = () => {};

  return (
    fav_cities.length > 0 && (
      <section>
        <h3 className="section-title">Favorite cities</h3>
        <div className="card-wrapper">
          {fav_cities.map(({ current, location, id, isFave }) => {
            const { weather_icons, temperature } = current;
            const { country, name } = location;
            return (
              <article key={id} className="card">
                <Link
                  className="card-link"
                  to={`./details/${id}`}
                  onClick={() => handleClick(id)}
                >
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
    )
  );
};

export default FavCities;
