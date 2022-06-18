import React, { useContext, useEffect, useReducer } from 'react';
import {
  LOAD_CITIES,
  GET_CITY_DETAIL_BEGIN,
  GET_CITY_DETAIL_SUCCESS,
  GET_CITY_DETAIL_ERROR,
  ADD_TO_NOTE,
  DELETENOTE,
  EDITNOTE,
} from '../actions';
import { details_reducer as reducer } from '../reducers/details_reducer';
import { getLocalStorage } from '../utils/helper';
import { useCitiesContext } from './cities_context';

const DetailsContext = React.createContext();

let localNote = JSON.parse(localStorage.getItem('local-note-r'));

const initialState = {
  isLoading: false,
  cities: [],
  fav_cities: [],
  city_error: false,
  displayedDetails: {},

  notes: getLocalStorage(localNote),
  is_editing: false,
  edit_id: '',
};
export const DetailsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { top_cities, fav_cities, API_ENDPOINT, getDisplayedDatafromDetails } =
    useCitiesContext();

  const loadDisplayedDetails = (res) => {
    dispatch({ type: GET_CITY_DETAIL_SUCCESS, payload: res });
  };

  const fetchCityDetails = async (param) => {
    try {
      dispatch({ type: GET_CITY_DETAIL_BEGIN });
      const data = await fetch(`${API_ENDPOINT}${param}`);
      let res = await data.json();
      res = {
        ...res,
        id: `${res.location.name}, ${res.location.country}`,
        isFave: false,
      };
      loadDisplayedDetails(res);
    } catch (error) {
      dispatch({ type: GET_CITY_DETAIL_ERROR });
    }
  };

  const addToNote = (id, value, textId) => {
    dispatch({ type: ADD_TO_NOTE, payload: { id, value, textId } });
  };
  const deleteNote = (id, textId) => {
    dispatch({ type: DELETENOTE, payload: { id, textId } });
  };
  const editNote = (editId) => {
    dispatch({ type: EDITNOTE, payload: { editId } });
  };

  useEffect(() => {
    getDisplayedDatafromDetails(state.displayedDetails);
    // eslint-disable-next-line
  }, [state.displayedDetails]);

  useEffect(() => {
    dispatch({ type: LOAD_CITIES, payload: { top_cities, fav_cities } });
  }, [top_cities, fav_cities]);

  useEffect(() => {
    localStorage.setItem('local-note-r', JSON.stringify(state.notes));
  }, [state.notes]);

  return (
    <DetailsContext.Provider
      value={{
        ...state,
        fetchCityDetails,
        loadDisplayedDetails,
        addToNote,
        deleteNote,
        editNote,
      }}
    >
      {children}
    </DetailsContext.Provider>
  );
};

export const useDetailsContext = () => {
  return useContext(DetailsContext);
};
