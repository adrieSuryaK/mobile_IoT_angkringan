import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { auth, getUserData } from '../../configs/myConfig';
import { Dimensions } from "react-native";
import { VictoryChart, VictoryPie, VictoryArea } from "victory-native";
import SwiperFlatList from 'react-native-swiper-flatlist';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBolt, faPlug, faPowerOff } from '@fortawesome/free-solid-svg-icons';

const Beranda = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const uid = user.uid;
                getUserData(uid, setUserData);
            }
        });
        return () => {
            // Unsubscribe from Firebase's real-time updates when the component unmounts
            unsubscribe();
        };
    }, []);


    const data = [
        { id: 1, label: 'Volt', value: userData?.voltage, icon: faBolt },
        { id: 2, label: 'Ampere', value: userData?.current, icon: faPlug },
        { id: 3, label: 'Watt', value: userData?.power, icon: faPowerOff },
    ];

    const renderDataItem = ({ item }) => (
        <View style={{ alignItems: 'center' }}>
            <View style={styles.dataItem}>
                <Text style={styles.valueCar}>{item.value}</Text>
            </View>
            <View style={{
                marginTop: 10,
            }}>
                <Text style={styles.labelCar}>
                    {item.label}
                </Text>
            </View>
            <FontAwesomeIcon icon={item.icon} size={15} color="#e87817" style={{
                top: 10,
                left: 30,
                position: 'absolute',
            }} />
        </View>
    );

    const windData = [
        { x: '1st', y: userData?.wind.first },
        { x: '2nd', y: userData?.wind.second },
        { x: '3rd', y: userData?.wind.third },
        { x: '4th', y: userData?.wind.fourth },
        { x: '5th', y: userData?.wind.fifth },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.boxContainer}>
                <View style={[styles.box, styles.tempbox]}>
                    <View style={styles.chartWrapper}>
                        <Text style={styles.labelPie}>Suhu | °C</Text>
                        <VictoryPie
                            data={[
                                { x: "Temperature", y: userData ? userData.temperature : 0 },
                                { x: "Max Temperature", y: userData ? 100 - userData.temperature : 100 }
                            ]}
                            width={Dimensions.get("window").width / 2 - 40}
                            height={Dimensions.get("window").width / 2 - 40}
                            colorScale={["#1a237e", "#f8f3f9"]}
                            innerRadius={50}
                            labels={() => null}
                            animate={{ duration: 1000 }}
                        />
                        <View style={styles.temperatureWrapper}>
                            <Text style={styles.temperatureText}>
                                {userData ? userData.temperature : 0}
                            </Text>
                        </View>
                    </View>
                </View>
                {userData && (
                    <View style={[styles.box, styles.bagiduaBox]}>
                        <Text style={styles.label}>Kelembaban</Text>
                        <Text style={{
                            position:'absolute',
                            left: 95,
                            top:70,
                            fontSize:20,
                            color:'#1a237e',
                            fontWeight:'bold',
                        }}>
                            %
                        </Text>
                        <Text style={styles.value}>{userData.humidity}</Text>
                    </View>
                )}
            </View>
            {userData && (
                <>
                    <View style={styles.windBox}>
                        <VictoryChart>
                            <VictoryArea
                                data={windData}
                                interpolation="natural"
                                x="x"
                                y="y"
                                style={{
                                    data: {
                                        fill: "#f8f3f9",
                                        stroke: "#1a237e", strokeWidth: 10,
                                    },
                                }}
                            />
                        </VictoryChart>
                    </View>
                    <View style={styles.windBoxText}>
                        <Text
                            style={styles.winText}
                        >Ultrasonic</Text>
                    </View>
                </>
            )}
            <View>
                <SwiperFlatList
                    data={data}
                    renderItem={renderDataItem}
                    style={styles.carousel}
                    showPagination
                    paginationStyle={styles.carouselPagination}
                    autoplay
                    autoplayDelay={5}
                    autoplayLoop
                    paginationDefaultColor='white'
                    paginationActiveColor='#1a237e'

                />
            </View>
            {userData && (
                <>
                    <View style={styles.boxContainerNormal}>
                        <View style={styles.bagiduaBoxNormal}>
                            <Text style={styles.labelnormal}>Intensitas Cahaya</Text>
                            <Text style={styles.valueNormal}>{userData.irradiance}</Text>
                        </View>
                        <View style={styles.bagiduaBoxNormal}>
                            <Text style={styles.labelnormal}>{userData.gas_sensor.gas_notice}</Text>
                            {userData.gas_sensor.gas_notice === 'Gas detected' ? (
                                <Image source={require('../../../assets/warning-gas.png')} style={styles.image} />
                            ) : (
                                <Image source={require('../../../assets/safety-gas.png')} style={styles.image} />
                            )}
                        </View>
                    </View>
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingBottom: 50,
        backgroundColor: '#f8f3f9',
    },
    image: {
        width: 60,
        height: 100,
        bottom: 10,
        top:-10,
    },
    carousel: {
        width: "100%",
        marginBottom: 40,
        marginTop: 15,
    },
    carouselPagination: {
        position: 'absolute',
        bottom: 5,
        alignSelf: 'center',
    },
    labelCar: {
        color: 'black',
        marginBottom: 10,
    },
    valueCar: {
        textAlign: 'center',
        color: 'white',
        fontSize: 40,
    },
    dataItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1a237e',
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 4,
        padding: 20,
        marginHorizontal: 15,
        width: Dimensions.get("window").width / 2.5,
    },
    chartWrapper: {
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        height: Dimensions.get("window").width / 2 - 40,
        width: Dimensions.get("window").width / 2 - 40,
        marginBottom: 15,
    },
    temperatureWrapper: {
        position: "absolute",
        top: "25%",
        left: "25%",
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        height: "50%",
    },
    temperatureText: {
        fontSize: 20,
        textAlign: "center",
        color: "#1a237e",
        marginTop: 45,
    },
    boxContainer: {
        flexDirection: "row",
        margin: 10,
        justifyContent: "space-between",
    },
    boxContainerNormal: {
        flexDirection: "row",
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 25,
        justifyContent: "space-between",
    },
    box: {
        marginHorizontal: 5,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 4,
        padding: 10,
    },
    bagiduaBox: {
        width: "45%",
    },
    bagiduaBoxNormal: {
        marginHorizontal: 5,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 4,
        padding: 15,
        width: "45%",
    },
    tempbox: {
        width: "45%",
    },
    windBoxText: {
        marginTop: 20,
        left: '60%',
        position: 'absolute',
        top: 200,
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
    winText: {
        color: 'white',
    },
    windBox: {
        marginTop: 25,
    },
    elbox: {
        flex: 1,
        marginHorizontal: 10,
    },
    label: {
        top: "10%",
        color: 'black',
        position: "absolute",
    },
    labelnormal: {
        color: 'black',
        marginBottom: 30,
    },
    labelgas: {
        color: 'black',
    },
    labelPie: {
        color: 'black',
        marginTop:30,
    },
    value: {
        textAlign: 'center',
        color: '#1a237e',
        fontSize: 45,
        marginTop: 20,
    },
    valueNormal: {
        textAlign: 'center',
        color: '#1a237e',
        fontSize: 45,
        marginBottom: 40,
    },
});

export default Beranda;