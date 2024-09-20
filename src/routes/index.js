import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faUser, faLightbulb } from '@fortawesome/free-solid-svg-icons';

import SplashScreen from '../pages/SplashScreen';
import LoginScreen from '../pages/LoginScreen';
import Beranda from '../pages/Beranda';
import ControlScreen from '../pages/ControlScreen';
import ProfilScreen from '../pages/ProfilScreen';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName='Beranda'
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: '#1a237e',
          height: 60,
          marginTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          marginBottom: 5,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#727ef7',
        tabBarIconStyle: { marginTop: 10, }
      }}
    >
      <Tab.Screen
        name="Beranda"
        component={Beranda}
        options={{
          tabBarShowLabel: true,
          tabBarLabel: 'Beranda',
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon icon={faHome} size={25} color={focused ? 'white' : '#727ef7'} />
          ),
        }}
      />
      <Tab.Screen
        name="Kontrol"
        component={ControlScreen}
        options={{
          tabBarShowLabel: true,
          tabBarLabel: 'Kontrol',
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon icon={faLightbulb} size={25} color={focused ? 'white' : '#727ef7'} />
          ),
        }}
      />
          <Tab.Screen
        name="Profil"
        component={ProfilScreen}
        options={{
          tabBarShowLabel: true,
          tabBarLabel: 'Profil',
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon icon={faUser} size={25} color={focused ? 'white' : '#727ef7'} />
          ),
        }}
      />
    </Tab.Navigator >
  )
}


const Stackrouter = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stackrouter.Navigator
      initialRouteName="splashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stackrouter.Screen name="SplashScreen" component={SplashScreen} />
      <Stackrouter.Screen name="Login" component={LoginScreen} />
      <Stackrouter.Screen name="Route" component={MyTabs} />
    </Stackrouter.Navigator>
  );
};

export default Routes;
