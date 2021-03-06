import store from '../store/weather';
export const ADD_CITY = "ADD_CITY";
export const REMOVE_CITY = "REMOVE_CITY";
export const CURRENT_WEATHER = "CURRENT_WEATHER";
export const UPDATE_WEATHER = "UPDATE_WEATHER";
export const LOADING = "LOADING";

export const initialState = store;

export default function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CITY: {
      const weather = action.data;
      if (weather) {
        const newState = { ...state } || {};
        newState.savedCities.push(weather);
        return newState;
      }
      return state;
    }
    case REMOVE_CITY: {
      const city = action.data;
      const foundIndex = (state.savedCities || []).findIndex(item => item.location.name === city);
      const newState = { ...state };
      const { currentWeather } = newState;

      if (currentWeather) {
        newState.currentWeather = city === currentWeather.location.name ? null : currentWeather;
      }

      newState.savedCities.splice(foundIndex, 1);
      return newState;
    }
    case CURRENT_WEATHER: {
      const newState = { ...state };
      newState.currentWeather = action.data;
      (newState.savedCities || []).unshift(action.data);
      return newState;
    }
    case UPDATE_WEATHER: {
      const newState = { ...state };
      newState.savedCities = action.data;
      return newState;
    }
    case LOADING: {
      return { ...state, loading: action.data };
    }

    default:
      return state;
  }
}
