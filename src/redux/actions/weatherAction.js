import { WEATHER_ID, GOOGLE_API_KEY } from '../../../config';
import { ADD_CITY, REMOVE_CITY, UPDATE_WEATHER, LOADING } from '../reducers/weatherReducer';
import { store } from '../index';

export const addCity = (city) => (dispatch) => {
    return fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&key=${GOOGLE_API_KEY}`)
        .then(async res => {
            const json = await res.json();
            const location = json.predictions[0] || '';
            if (!location) throw `City doesn't exist`;

            const desc = location.description.split(',');

            dispatch({ type: LOADING, data: true });
            fetch(`http://api.apixu.com/v1/forecast.json?key=${WEATHER_ID}&q=${desc[0]}&days=7`)
                .then(async res => {
                    const json = await res.json();
                    dispatch({ type: ADD_CITY, data: json });
                    dispatch({ type: LOADING, data: false });
                });
        })
}

export const updateWeather = () => (dispatch) => {
    const state = { ...store.getState() };
    return Promise.all(state.weather.savedCities.map(item =>
        fetch(`http://api.apixu.com/v1/forecast.json?key=${WEATHER_ID}&q=${(item.location || {}).name}&days=7`)
    )).then(values => {
        Promise.all(values.map(v => v.json())).then(jsonValues => {
            dispatch({ type: UPDATE_WEATHER, data: jsonValues })
        })
    });
}

export const getCurrentWeather = (lat, lon) => (dispatch) => {
    dispatch({ type: LOADING, data: true });
    return fetch(`http://api.apixu.com/v1/forecast.json?key=${WEATHER_ID}&q=${lat},${lon}&days=7`)
        .then(async res => {
            const json = await res.json();
            dispatch({ type: UPDATE_WEATHER, data: json });
            dispatch({ type: LOADING, data: false });
        });
}

export const removeCity = (city) => (dispatch) => dispatch({ type: REMOVE_CITY, data: city })