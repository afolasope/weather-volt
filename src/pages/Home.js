import React from 'react';
import { FavCities, TopCities } from '../components';
import { useCitiesContext } from '../context/cities_context';

const Home = () => {
  const { error } = useCitiesContext();

  if (error) {
    return (
      <div>
        <h3> Something went wrong...</h3>
      </div>
    );
  }

  return (
    <section className="section-center">
      <FavCities />
      <TopCities />
    </section>
  );
};

export default Home;
