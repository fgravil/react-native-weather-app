import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { WeatherCard } from './WeatherListPage';
import { FlatList } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import uuidv1 from 'uuid/v1';

const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
    weatherDayContainer: {
        height: 140,
        width: 140,
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
        height: '100%'
    },
    map: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
})

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const WeatherDay = ({ weatherData }) => (
    <View accessible={true} style={styles.weatherDayContainer}>
        <View accessible={true} >
            <Image
                style={{ width: 100, height: 100, justifyContent: 'center' }}
                source={{ uri: `https:${weatherData.day.condition.icon}` }}
            />
        </View>
        <View accessible={true} style={{ marginTop: 3 }}>
            <Text style={styles.weatherDayText}>
                <Text style={{ color: '#ff8c00' }}>
                    {weekDays[(new Date(weatherData.date)).getDay()]}
                </Text>
                {' ' + Math.round(weatherData.day.maxtemp_f)}-{Math.round(weatherData.day.mintemp_f)}
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
            keyExtractor={(item, index) => uuidv1(index.toString())}
            renderItem={({ item }) => <WeatherDay weatherData={item} />}
        />
    );

export default class WeatherDetailPage extends Component {
    render() {
        const { weatherData, navigation } = this.props;
        return (
            <View style={styles.mapView}>
                <MapView
                    style={styles.map}
                    region={{
                        latitude: weatherData.location.lat,
                        longitude: weatherData.location.lon,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1
                    }}
                >
                </MapView>
                <WeatherCard
                    style={{ position: "absolute", top: 0 }}
                    weatherData={this.props.weatherData}
                    Content={() => (<WeatherDayList days={weatherData.forecast.forecastday} />)}
                />
                <TouchableOpacity
                    style={{ position: "absolute", left: 10, bottom: 0 }}
                    accessible={true}
                    accessibilityLabel="Go Back"
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name={isAndroid ? "md-arrow-back" : "ios-arrow-back"}
                        size={50}
                        color="blue"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ position: "absolute", right: 50, bottom: 0 }}
                    accessible={true}
                    accessibilityLabel="Delete City"
                    onPress={() => {
                        this.props.removeCity(weatherData.location.name); navigation.pop()
                    }}
                >
                    <Ionicons
                        name={isAndroid ? "md-trash" : "ios-trash"}
                        size={50}
                        color="red"
                    />
                </TouchableOpacity>

            </View>
        )
    }
}
