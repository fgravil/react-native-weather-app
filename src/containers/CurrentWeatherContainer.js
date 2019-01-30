import React from 'react'
import { connect } from 'react-redux';
import WeatherDetailPage from '../components/pages/WeatherDetailPage';
import { getCurrentWeather } from '../redux/actions/weatherAction';
import {View} from 'react-native';

class CurrentWeatherContainer extends React.PureComponent {
    static navigationOptions = {
        title: 'Current Weather',
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((pos) => {
            console.log('COORDS: ', pos);
            this.props.getCurrentWeather(pos.coords.latitude, pos.coords.longitude);
        })
    }
    render() {
        const { navigation, currentWeather } = this.props;
        return (
            <View>
                {
                    currentWeather &&
                    <WeatherDetailPage
                        navigation={navigation}
                        weatherData={currentWeather} >
                    </WeatherDetailPage>
                }
            </View>

        )
    }
}

const mapStateToProps = state => ({
    currentWeather: state.weather.currentWeather,
});

const mapDispatchToProps = {
    getCurrentWeather: getCurrentWeather
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrentWeatherContainer);

