import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, Button } from 'react-native';
import { WeatherCard } from './WeatherListPage';
import { FlatList } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
    weatherDayContainer: {
        height: 130,
        width: 130,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginLeft: 20,
        marginTop: 40,
        marginBottom: 20,
        borderRadius: 10
    },
    weatherDayText: {
        fontSize: 16,
        fontWeight: '700',
        color: 'gray'
    },
    mapView: {
        width: '100%',
        height: '40%'
    },
    map: {
        position: 'absolute',
        top: 0,
        bottom: 50,
        left: 0,
        right: 0,
    }
})

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const WeatherDay = ({ weatherData }) => (
    <View accessible={true} style={styles.weatherDayContainer}>
        <View accessible={true} style={{ flex: 2 }}>
            <Image
                style={{ width: 100, height: 100, justifyContent: 'center' }}
                source={{ uri: `https:${weatherData.day.condition.icon}` }}
            />
        </View>
        <View accessible={true} style={{ flex: 1 }}>
            <Text style={styles.weatherDayText}>
                <Text style={{ color: '#ff8c00' }}>
                    {weekDays[(new Date(weatherData.date)).getDay() - 1]}
                </Text>
                {Math.round(weatherData.day.maxtemp_f)}-{Math.round(weatherData.day.mintemp_f)}
            </Text>
        </View>
    </View>
);

export const WeatherDayList = ({ days }) =>
    (
        <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={days}
            renderItem={({ item }) => <WeatherDay weatherData={item}
            keyExtractor={(item, index) => index.toString()} />}
        />
    );

export default class WeatherDetailPage extends Component {
    render() {
        const { weatherData, navigation } = this.props;
        return (
            <View>
                <WeatherCard
                    weatherData={this.props.weatherData}
                    Content={() => (<WeatherDayList days={weatherData.forecast.forecastday} />)}
                />
                <View style={styles.mapView}>
                    <MapView style={styles.map}
                        region={{
                            latitude: weatherData.location.lat,
                            longitude: weatherData.location.lon,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1
                        }}
                    >
                    </MapView>
                </View>

                <Button
                    accessible={true}
                    accessibilityLabel="Delete City"
                    title="Delete"
                    color="red"
                    onPress={() => {
                        this.props.removeCity(weatherData.location.name); navigation.pop()
                    }}
                >
                </Button>
            </View>
        )
    }
}
