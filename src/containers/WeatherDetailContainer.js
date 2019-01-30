import React from 'react'
import { connect } from 'react-redux';
import WeatherDetailPage from '../components/pages/WeatherDetailPage';
import { removeCity } from '../redux/actions/weatherAction';

class WeatherDetailContainer extends React.PureComponent {
  static navigationOptions = {
    title: 'Details',
  };
  
  constructor(props) {
    super(props);
    this.weatherData = props.navigation.getParam('weatherData');
  }
  render() {
    const {navigation, removeCity} = this.props;
    return (
      <WeatherDetailPage navigation={navigation} weatherData={this.weatherData} removeCity={removeCity}>

      </WeatherDetailPage>
    )
  }
}

const mapStateToProps = state => ({
  savedCities: state.weather.savedCities || [],
  lastRequest: state.weather.lastRequest
});

const mapDispatchToProps = {
  removeCity: removeCity
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherDetailContainer);

