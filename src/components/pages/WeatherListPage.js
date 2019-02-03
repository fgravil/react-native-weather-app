import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ImageBackground,
    ScrollView,
    Platform,
    Keyboard,
    RefreshControl
} from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import { NavigationEvents } from "react-navigation";
import Autocomplete from 'react-native-autocomplete-input';
import { AUTOCOMPLETE_URL } from '../../../config';
import uuidv1 from 'uuid/v1';
import LoadingComponent from '../LoadingComponent';

const isAndroid = Platform.OS === 'android';
export const styles = StyleSheet.create({
    weatherCard: {
        borderColor: '#fff',
        borderWidth: .5,
        width: '100%',
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
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 2,
        marginBottom: 100
    }
});

export const WeatherCard = ({ weatherData, Content }) => {
    const { current, location } = weatherData;

    return (
        <ImageBackground source={require('./../../../assets/weather.jpg')} style={styles.weatherCard}>
            <View accessible={true} style={styles.mainContent}>
                <View accessible={true} style={{ width: '75%', paddingLeft: 24 }}>
                    <Text style={styles.temp}>{Math.round(current.temp_f)}&deg;</Text>

                    <Text style={styles.location}>
                        <Text style={{ fontWeight: 'bold' }}>{location.name}</Text>

                        {`${location.region ? ', ' + location.region : ''} ${location.country ? ', ' + location.country : ''}`}
                    </Text>
                </View>

                <Image
                    style={{ width: 100, height: 100, justifyContent: 'flex-end' }}
                    source={{ uri: `https:${weatherData.current.condition.icon}` }}
                />
            </View>
            {Content && <Content />}
        </ImageBackground>
    )
}


export const WeatherList = ({ cities, navigation }) => (
    <FlatList
        data={cities}
        keyExtractor={(item, index) => uuidv1(index.toString())}
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
    sessionToken = '';

    constructor(props) {
        super(props);
        this.state = { query: '', error: '', cities: [], refreshing: false };
    }

    componentDidMount() {
        this.sessionToken = uuidv1();
    }

    refresh() {
        const state = this.state;
        this.setState({ ...state, refreshing: true });
        this.props.updateWeather().then(() => this.setState({ ...state, refreshing: false }));
    }

    autoComplete(newText) {
        const invalidInput = !/^[A-Za-z\s]{1,}-{0,1}[A-Za-z\s]{1,}$/.test(newText);
        this.setState({
            query: newText,
            error: invalidInput ? 'Invalid city' : '',
            cities: [],
            refreshing: false
        });

        if (invalidInput) {
            return;
        }

        fetch(AUTOCOMPLETE_URL.replace('{input}', newText).replace('{sessiontoken}', this.sessionToken))
            .then(async res => {
                const json = await res.json();
                const cities = (json.predictions || []).map(val => val.description);
                this.setState({ ...this.state, cities });
            })
    }
    submit(text) {
        this.setState({ ...this.state, query: text, cities: [], refreshing: true });

        this.props.addCity(text).then(() => {
            this.setState({ ...this.state, query: '', refreshing: false });
            Keyboard.dismiss();
        }).catch(err => {
            this.setState({ ...this.state, error: err, refreshing: false });
        });
    }

    render() {
        const { navigation, savedCities, loading } = this.props;
        const { query, cities } = this.state;

        return (
            <View style={{ marginBottom: 20 }}>
                <NavigationEvents
                    onWillFocus={() => {
                        this.setState({ text: '', error: '' })
                    }}
                />
                <Autocomplete
                    placeholder="Add New City"
                    data={cities}
                    defaultValue={query}
                    containerStyle={isAndroid ? styles.autocompleteContainer : { position: 'relative', zIndex: 100 }}
                    onChangeText={text => this.autoComplete(text)}
                    renderItem={item => (
                        <TouchableOpacity onPress={() => this.submit(item)}>
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    )}
                />

                {/* {loading && <LoadingComponent />} */}
                <ScrollView
                    style={isAndroid ? { marginTop: 40 } : {}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.refresh()}
                        />}
                >
                    <WeatherList cities={savedCities} navigation={navigation} />
                </ScrollView>
            </View>
        )
    }
}
