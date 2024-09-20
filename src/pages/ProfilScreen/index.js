import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { auth } from '../../configs/myConfig';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { VictoryChart, VictoryGroup, VictoryBar } from "victory-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation, route }) {
    const [userEmail, setUserEmail] = React.useState('');

    useEffect(() => {
        const currentUser = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUserEmail(currentUser.email);
            }
        });

    }, []);

    const handleLogout = async () => {
        // await AsyncStorage.removeItem('email');
        auth.signOut().then(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        });
        // Remove the email from AsyncStorage
        // await AsyncStorage.removeItem('email');
        // Navigate back to the LoginScreen
        // navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Card style={styles.cardBox}>
                <Title
                    style={styles.tInput}
                >Welcome!</Title>
                <Paragraph>
                    Kamu sedang login menggunakan email
                </Paragraph>
                <Paragraph style={{ color: '#e67817', fontWeight: 'bold' }}>
                    {userEmail}
                </Paragraph>
            </Card>
            <Title
                style={styles.tInputSum}
            >Summary</Title>
            <VictoryChart style={styles.chartWrapper}>
                <VictoryGroup
                    offset={20}
                    colorScale={["#1a237e", "#e67817", "#727ef7"]}
                    animate={{
                        duration: 4000,
                        onLoad: { duration: 2000 }
                    }}
                    width={Dimensions.get("window").width / 2 - 50}
                    height={Dimensions.get("window").width / 2 - 50}
                >
                    <VictoryBar
                        data={[{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 5 }]}
                    />
                    <VictoryBar
                        data={[{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 7 }]}
                    />
                    <VictoryBar
                        data={[{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 9 }]}
                    />
                </VictoryGroup>
            </VictoryChart>
            <Button title="Log out"
                onPress={handleLogout}
                mode="contained"
                style={styles.button}
            >
                <Text
                    style={styles.activeButtonText}
                >Logout</Text>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f3f9',
    },
    tInput: {
        color: 'black',
    },
    tInputSum: {
        color: 'black',
        marginBottom:-20,
        marginTop:10,
    },
    button: {
        backgroundColor: '#1a237e',
        width: 150,
        // marginTop: 20,
    },
    activeButtonText: {
        color: 'white',
    },
    cardBox: {
        padding: 20,
        margin: 10,
        width: '90%',
    },
})
