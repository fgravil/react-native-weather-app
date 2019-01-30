import { default as weather } from './weatherReducer';

const rehydrated = (state = false, action) => {
    switch (action.type) {
        case 'persist/REHYDRATE':
            return state;
        default:
            return action.payload || state;
    }
};

export default {
    rehydrated,
    weather
}