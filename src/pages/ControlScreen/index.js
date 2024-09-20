import React, { useState, useEffect, } from 'react'
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, Slider, ScrollView, Image } from 'react-native';
import { lampuRef, auth, database, updateControl, getUserData, servoRef } from '../../configs/myConfig';
import { Card, Title, Paragraph } from 'react-native-paper';
// import LinearGradient from 'react-native-linear-gradient';
import AwesomeAlert from 'react-native-awesome-alerts';

const ControlScreen = () => {
    const [userData, setUserData] = useState(null);
    const [lampu_led, setLampu] = useState();
    const [servoPosition, setServoPosition] = useState(90);
    const [showAlertOff, setShowAlertOff] = useState(false);
    const [showAlertOn, setShowAlertOn] = useState(false);
    const [showAlertServo, setShowAlertServo] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const uid = user.uid;
                getUserData(uid, setUserData);
            }
        });
        return () => {
            setShowAlertOff(false);
            setShowAlertOn(false);
            setShowAlertServo(false);
            unsubscribe();
        };
    }, []);

    const hideAlert = () => {
        setShowAlertOff(false);
        setShowAlertOn(false);
        setShowAlertServo(false);
    };

    const handleOnConfirmPressed = () => {
        hideAlert();
    };

    const ControlLampu = (value) => {
        setLampu(value);
        const uid = auth.currentUser?.uid; // read UID from Firebase Auth state
        if (uid) {
            const lampuPath = `users/${uid}`; // construct path to user data
            updateControl(lampuRef(database, lampuPath), { 'lampu_led': value }).then(() => {
                // Do nothing here, as the state has already been updated
            }).catch((error) => {
                console.log(error);
            });
        }
    };

    const ControlServo = (value) => {
        setServoPosition(value);
        const uid = auth.currentUser?.uid; // read UID from Firebase Auth state
        if (uid) {
            const servoPath = `users/${uid}`; // construct path to user data
            updateControl(servoRef(database, servoPath), { 'servo': value }).then(() => {
                // Do nothing here, as the state has already been updated
            }).catch((error) => {
                console.log(error);
            });
        }
    };


    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1a237e" />
            {userData && (
                <>
                    <View style={styles.boxContainerImage}>
                        {userData.rain_sensor.rain_condition === 'Tidak ada air hujan' ? (
                            <Image source={require('../../../assets/cerah.png')} style={styles.image} />
                        ) : userData.rain_sensor.rain_condition === 'Terjadi gerimis' ? (
                            <Image source={require('../../../assets/gerimis.png')} style={styles.image} />
                        ) : (
                            <Image source={require('../../../assets/hujan.png')} style={styles.image} />
                        )}
                        {/* <Text style={styles.value}>{userData.rain_sensor.rain_condition}</Text> */}
                    </View>
                    <View style={styles.cuacaBox}>
                        <Text style={{ color: 'white' }}>
                            Stasiun Cuaca
                        </Text>
                    </View>
                    <Paragraph
                        style={{
                            color: 'black',
                            marginHorizontal: 15,
                            marginTop: -20,
                            marginBottom: 10,
                            textAlign:'justify',

                        }}>
                        Kondisi cuaca saat ini&nbsp;
                        <Paragraph style={{ color: '#e67817', fontWeight: 'bold' }}>
                            {userData.rain_sensor.rain_condition}
                        </Paragraph>
                        ,&nbsp;prediksi sistem untuk cuaca jangka dekat adalah&nbsp;
                        <Paragraph style={{ color: '#e67817', fontWeight: 'bold' }}>
                            {userData.prediksi_hujan}
                        </Paragraph>.
                    </Paragraph>
                </>
            )}
            <Card style={styles.boxContainer}
                mode='elevated'
            >
                <Text style={styles.label}>
                    Switch Lampu
                </Text>
                <View style={styles.buttonContainer}>
                    {/* <LinearGradient
                        colors={['#ab3d30', '#e55f3c', '#ee8043']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.btn}
                    > */}
                    <TouchableOpacity
                        style={[styles.button, lampu_led === 0 && styles.activeButton]}
                        onPress={() => {
                            ControlLampu(0);
                            setShowAlertOff(true);
                        }}
                    >
                        <Text
                            style={[styles.buttonText, lampu_led === 0 && styles.activeButtonText]}>
                            OFF</Text>
                    </TouchableOpacity>
                    <AwesomeAlert
                        show={showAlertOff}
                        showProgress={true}
                        title="Success!"
                        message="Lampu berhasil dimatikan"
                        closeOnTouchOutside={false}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={true}
                        confirmText="OK"
                        confirmButtonColor="#1a237e"
                        onConfirmPressed={handleOnConfirmPressed}
                        onCancelPressed={hideAlert}
                    />
                    <TouchableOpacity
                        style={[styles.button, lampu_led === 1 && styles.activeButton]}
                        onPress={() => {
                            ControlLampu(1);
                            setShowAlertOn(true);
                        }}
                    >
                        <Text
                            style={[styles.buttonText, lampu_led === 1 && styles.activeButtonText]}>
                            ON</Text>
                    </TouchableOpacity>
                    {/* </LinearGradient> */}
                    <AwesomeAlert
                        show={showAlertOn}
                        showProgress={true}
                        title="Success!"
                        message="Lampu berhasil dinyalakan"
                        closeOnTouchOutside={false}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={true}
                        confirmText="OK"
                        confirmButtonColor="#1a237e"
                        onConfirmPressed={handleOnConfirmPressed}
                        onCancelPressed={hideAlert}
                    />
                </View>
            </Card>
            <Card style={styles.boxContainer} mode='elevated'>
                <Text style={styles.label}>
                    Servo Position
                </Text>
                <View style={styles.sliderContainer}>
                    <Slider
                        style={{ width: '100%', height: 40 }}
                        minimumValue={0}
                        maximumValue={180}
                        minimumTrackTintColor="#1a237e"
                        maximumTrackTintColor="#000000"
                        step={1}

                        value={servoPosition}
                        onSlidingComplete={(value) => {
                            ControlServo(value);
                            setShowAlertServo(true);
                        }}
                    />
                    <Text style={styles.sliderText}>{servoPosition}</Text>
                    <AwesomeAlert
                        show={showAlertServo}
                        showProgress={true}
                        title="Success!"
                        message="Posisi servo berhasil diubah"
                        closeOnTouchOutside={false}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={true}
                        confirmText="OK"
                        confirmButtonColor="#1a237e"
                        onConfirmPressed={handleOnConfirmPressed}
                        onCancelPressed={hideAlert}
                    />
                </View>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 50,
        backgroundColor: '#f8f3f9',
    },
    boxContainer: {
        margin: 10,
        height: 120,
        backgroundColor: 'white',
    },
    boxContainerImage: {
        marginTop: 60,
        height: 160,
        alignItems: 'center',
    },
    box: {
        flex: 1,
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,

        elevation: 4,
    },
    label: {
        marginBottom: 5,
        marginTop: 15,
        textAlign: 'center',
        color:'black',
    },
    value: {
        textAlign: 'center',
        color: '#1a237e',
        fontSize: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    slider: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#f8f3f9',
        borderRadius: 25,
        margin: 15,
        flex: 1,
    },
    activeButton: {
        backgroundColor: '#1a237e',
    },
    buttonText: {
        color: 'black',
        // fontWeight: 'bold',
        textAlign: 'center',
    },
    activeButtonText: {
        color: 'white',
    },
    sliderContainer: {
        marginVertical: 10,
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    sliderText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    image: {
        width: '60%',
        height: '80%',
    },
    cuacaBox: {
        left: '60%',
        position: 'absolute',
        backgroundColor: '#1a237e',
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 4,
        borderRadius: 15,
    },
});

export default ControlScreen;
