import React, { useContext, useEffect, useReducer } from 'react';
import { cities_reducer as reducer } from '../reducers/cities_reducer';
import {
  GET_CITIES_ERROR,
  GET_CITIES_BEGIN,
  GET_CITIES_SUCCESS,
  ADD_TO_FAVLIST,
  REMOVE_FROM_FAVLIST,
  DELETE_CITY,
  LOAD_DISPLAYED_DETAILS,
} from '../actions';
import topCites, { getLocalStorage } from '../utils/helper';

const API_ENDPOINT = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_STACK_API_KEY}&query=`;

const CitiesContext = React.createContext();

let localTopCitiesInfo = JSON.parse(localStorage.getItem('top-cities-r'));
let localFavCitiesInfo = JSON.parse(localStorage.getItem('fav-cities-r'));

const initialState = {
  isLoading: false,
  cities_error: false,
  top_cities: getLocalStorage(localTopCitiesInfo),
  fav_cities: getLocalStorage(localFavCitiesInfo),
  displayed_details: {},
};

export const CitiesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCity = async (city) => {
    const data = await fetch(`${API_ENDPOINT}${city}`);
    const response = await data.json();
    console.log(response);
    return response;
  };

  const fetchTopCities = async () => {
    try {
      const topCitiesList = topCites.map(async (city) => {
        dispatch({ type: GET_CITIES_BEGIN });
        let data = await fetchCity(city);
        data = {
          ...data,
          id: `${data.location.name}, ${data.location.country}`,
          isFave: false,
        };
        console.log(data);
        return data;
      });
      const response = await Promise.all(topCitiesList);
      console.log(response);
      dispatch({ type: GET_CITIES_SUCCESS, payload: response });

      return response;
    } catch (error) {
      dispatch({ type: GET_CITIES_ERROR });
    }
  };

  const getDisplayedDatafromDetails = (details) => {
    if (details) {
      dispatch({ type: LOAD_DISPLAYED_DETAILS, payload: details });
    } else {
      return;
    }
  };

  useEffect(() => {
    if (!localTopCitiesInfo) {
      // eslint-disable-next-line
      fetchTopCities();
      // eslint-disable-next-line
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('top-cities-r', JSON.stringify(state.top_cities));
    localStorage.setItem('fav-cities-r', JSON.stringify(state.fav_cities));
  }, [state.top_cities, state.fav_cities]);

  const addToFavlist = (id) => {
    dispatch({ type: ADD_TO_FAVLIST, payload: id });
  };
  const removeFromFavlist = (id) => {
    dispatch({ type: REMOVE_FROM_FAVLIST, payload: id });
  };
  const deleteCity = (id) => {
    dispatch({ type: DELETE_CITY, payload: id });
  };

  return (
    <CitiesContext.Provider
      value={{
        ...state,
        addToFavlist,
        removeFromFavlist,
        deleteCity,
        fetchCity,
        API_ENDPOINT,
        getDisplayedDatafromDetails,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export const useCitiesContext = () => {
  return useContext(CitiesContext);
};
