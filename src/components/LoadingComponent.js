import React from 'react';
import { ActivityIndicator, View, Dimensions } from 'react-native';

const screen = Dimensions.get('window');
const LoadingComponent = ({ top, left }) => {
    const container = styles.container;
    if (top) {
        container.top = top;
    }
    if (left) {
        container.left = left;
    }
    return (
        <View style={container}>
            <ActivityIndicator
                color="#0000ff"
                size="large"
                style={styles.activityIndicator}
            />
        </View>
    );
};
export default LoadingComponent;

const styles = {
    container: {
        position: 'absolute',
        zIndex: 999,
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,//screen.height * 0.5,
        left: screen.width * 0.5 - 20
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};
