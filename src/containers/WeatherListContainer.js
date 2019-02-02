import React from 'react';
import { connect } from 'react-redux';
import { addCity, updateWeather, getCurrentWeather } from '../redux/actions/weatherAction';
import WeatherListPage from '../components/pages/WeatherListPage';
import { Location, Permissions } from 'expo';

class WeatherListContainer extends React.Component {
  static navigationOptions = {
    title: 'Enter Address',
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(this.props.currentWeather){
      return;
    }
    this.getLocation();
  }

  async getLocation() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log('No permissions granted.');
      return;
    }
    const { coords } = await Location.getCurrentPositionAsync({});
    this.props.getCurrentWeather(coords.latitude, coords.longitude);
  }
  render() {
    const { savedCities, navigation, addCity, loading, updateWeather } = this.props;
    return (
      <WeatherListPage
        savedCities={savedCities}
        navigation={navigation}
        addCity={addCity}
        updateWeather={updateWeather}
        loading={loading}
      />
    );
  }
}

const mapStateToProps = state => ({
  savedCities: state.weather.savedCities || [],
  currentWeather: state.weather.currentWeather,
  loading: state.weather.loading
});

const mapDispatchToProps = {
  addCity: addCity,
  updateWeather: updateWeather,
  getCurrentWeather: getCurrentWeather
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherListContainer);
