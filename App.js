import React from "react";
import { Provider } from 'react-redux'
import { store, persistor } from './src/redux/index';
import { PersistGate } from 'redux-persist/es/integration/react';
import WeatherListContainer from "./src/containers/WeatherListContainer";
import { createStackNavigator, createAppContainer } from "react-navigation";
import WeatherDetailContainer from "./src/containers/WeatherDetailContainer";
import LoadingComponent from "./src/components/LoadingComponent";

const MainStack = createStackNavigator(
  {
    list: WeatherListContainer,
  },
  {
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

const RootStack = createStackNavigator(
  {
    main: MainStack,
    detail: WeatherDetailContainer,
  },
  {
    initialRouteName: 'main',
    mode: 'modal',
    headerMode: 'none'
  }
);

export const AppNavigator = createAppContainer(RootStack);


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<LoadingComponent />} persistor={persistor}>

          <AppNavigator />
        </PersistGate>
      </Provider>
    );
  }
}