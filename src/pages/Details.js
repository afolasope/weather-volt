import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { WeatherReport, NotesReport } from '../components';
import { useDetailsContext } from '../context/details_context';

const Details = () => {
  const { cities, fetchCityDetails, loadDisplayedDetails, fav_cities } =
    useDetailsContext();

  const { cityId } = useParams();

  useEffect(() => {
    const check = cities.find((item) => {
      return item.id === cityId;
    });
    const checkFav = fav_cities.find((item) => {
      return item.id === cityId;
    });
    if (check) {
      loadDisplayedDetails(check);
    } else if (checkFav) {
      loadDisplayedDetails(checkFav);
    } else {
      fetchCityDetails(cityId);
    }
  }, [cityId]);

  return (
    <section className="section-center section-details">
      <WeatherReport />
      <NotesReport id={cityId} />
    </section>
  );
};

export default Details;
