import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, ScrollView } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import { NavigationEvents } from "react-navigation";
import { TextField } from 'react-native-material-textfield';

export const styles = StyleSheet.create({
    weatherCard: {
        backgroundColor: '#ff9c00',
        borderColor: '#fff',
        borderWidth: .5
    },
    mainContent: {
        width: '100%',
        flexDirection: 'row',
    },
    temp: {
        fontSize: 72,
        fontWeight: '100',
        color: '#fff',
    },
    location: {
        fontSize: 24,
        paddingLeft: 8,
        color: '#fff'
    }
});

export const WeatherCard = ({ weatherData, Content }) => {
    const { current, location } = weatherData;

    return (<View accessible={true} style={styles.weatherCard}>
        <View accessible={true} style={styles.mainContent}>
            <View accessible={true} style={{ width: '80%', paddingLeft: 24 }}>
                <Text style={styles.temp}>{Math.round(current.temp_f)}&deg;</Text>

                <Text style={styles.location}>
                    <Text style={{ fontWeight: 'bold' }}>{location.name}</Text>

                    {`${location.region ? ', ' + location.region : ''} ${location.country ? ', ' + location.country : ''}`}
                </Text>
            </View>

            <Image
                style={{ width: 150, height: 150, justifyContent: 'flex-end' }}
                source={{ uri: `https:${weatherData.current.condition.icon}` }}
            />
        </View>
        {Content && <Content />}
    </View>)
}


export const WeatherList = ({ cities, navigation }) => (
    <FlatList
        data={cities}
        renderItem={
            ({ item }) =>
                <TouchableOpacity
                    accessibilityLabel="Click me!"
                    accessibilityHint="Navigates to the detail screen"
                    onPress={() => navigation.navigate('detail', { weatherData: item })}>
                    <WeatherCard weatherData={item} />
                </TouchableOpacity>
        }
    />
)
export default class WeatherListPage extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '', error: '' };
    }

    submit = () => {
        if (this.state.error) return;

        this.props.addCity(this.state.text).then(() => {
            this.setState({ text: '' });
        }).catch(err => {
            this.setState({ ...this.state, error: err });
        });
    }

    render() {
        const { navigation, savedCities } = this.props;

        return (
            <View style={{ paddingBottom: 20 }}>
                <NavigationEvents
                    onWillFocus={() => {
                        this.setState({ text: '' })
                    }}
                />
                <View>
                    <TextField
                        label="Add New City"
                        value={this.state.text}
                        error={this.state.error}
                        onChangeText={(newText) =>
                            this.setState({
                                text: newText,
                                error: !/^[A-Za-z\s]{1,}-{0,1}[A-Za-z\s]{1,}$/.test(newText)
                                    ? 'Invalid city' : ''
                            })
                        }
                        onSubmitEditing={this.submit}
                    >
                    </TextField>
                </View>

                <ScrollView>
                    <WeatherList cities={savedCities} navigation={navigation} />
                </ScrollView>
            </View>
        )
    }
}
