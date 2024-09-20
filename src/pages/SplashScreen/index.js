import React, { Component } from 'react';
import { View, Image, Text, StatusBar } from 'react-native'
import { StackActions } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.dispatch(StackActions.replace('Login'));
        }, 4000);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" backgroundColor="#1a237e"/>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white'
                }}>
                    <LottieView source={require('../../../assets/iot-angkringan-logo.json')} autoPlay loop style={{
                        flex: 1,
                        backgroundColor: '#f8f3f9'
                    }} />
                </View>
            </View>

        );
    }
}

export default SplashScreen;