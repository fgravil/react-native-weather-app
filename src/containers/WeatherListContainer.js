import React from 'react';
import { connect } from 'react-redux';
import { addCity, updateWeather } from '../redux/actions/weatherAction';
import WeatherListPage from '../components/pages/WeatherListPage';

class WeatherListContainer extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.updateWeather();
  }
  render() {
    const { savedCities, navigation, addCity } = this.props;
    return (<WeatherListPage savedCities={savedCities} navigation={navigation} addCity={addCity} />);
  }
}

const mapStateToProps = state => ({
  savedCities: state.weather.savedCities || [],
  lastRequest: state.weather.lastRequest
});

const mapDispatchToProps = {
  addCity: addCity,
  updateWeather: updateWeather
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherListContainer);
