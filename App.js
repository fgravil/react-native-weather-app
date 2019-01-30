import React from "react";
import { Provider } from 'react-redux'
import { store, persistor } from './src/redux/index';
import { PersistGate } from 'redux-persist/es/integration/react';
import WeatherListContainer from "./src/containers/WeatherListContainer";
import { createStackNavigator, createAppContainer } from "react-navigation";
import WeatherDetailContainer from "./src/containers/WeatherDetailContainer";
import CurrentWeatherContainer from "./src/containers/CurrentWeatherContainer";

const MainStack = createStackNavigator(
  {
    list: WeatherListContainer,
    detail: WeatherDetailContainer,
    current: CurrentWeatherContainer
  },
  {
    initialRouteName: 'list',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#ededed',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);

export const AppNavigator = createAppContainer(MainStack);


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    );
  }
}