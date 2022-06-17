import {
  ADD_TO_FAVLIST,
  DELETE_CITY,
  GET_CITIES_BEGIN,
  GET_CITIES_ERROR,
  GET_CITIES_SUCCESS,
  LOAD_DISPLAYED_DETAILS,
  REMOVE_FROM_FAVLIST,
} from '../actions';

export const cities_reducer = (state, action) => {
  if (action.type === GET_CITIES_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_CITIES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      cities_error: false,
      top_cities: action.payload,
    };
  }
  if (action.type === GET_CITIES_ERROR) {
    return { ...state, isLoading: false, cities_error: true };
  }
  if (action.type === LOAD_DISPLAYED_DETAILS) {
    return { ...state, displayed_details: action.payload };
  }
  // manipulate top cities and fav cities
  if (action.type === ADD_TO_FAVLIST) {
    const check = state.top_cities.find((item) => item.id === action.payload);
    let tempFav;

    if (check) {
      state.top_cities.map((item) => {
        if (item.id === action.payload) {
          item.isFave = true;
        }
        return item;
      });

      tempFav = state.top_cities.find((item) => {
        return item.id === action.payload;
      });
    } else if (!check) {
      state.displayed_details.isFave = true;
      tempFav = state.displayed_details;
    } else {
      return;
    }

    return { ...state, fav_cities: [...state.fav_cities, tempFav] };
  }
  if (action.type === REMOVE_FROM_FAVLIST) {
    const tempCities = state.top_cities.map((item) => {
      if (item.id === action.payload) {
        item.isFave = false;
      }
      return item;
    });

    const tempFav = state.fav_cities.filter((item) => {
      return item.id !== action.payload;
    });
    // change isfave to false here to fix bookmark
    return { ...state, fav_cities: tempFav, top_cities: tempCities };
  }
  if (action.type === DELETE_CITY) {
    const tempCities = state.top_cities.filter(
      (item) => item.id !== action.payload
    );
    const tempFav = state.fav_cities.filter(
      (item) => item.id !== action.payload
    );
    return { ...state, top_cities: tempCities, fav_cities: tempFav };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};
