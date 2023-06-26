import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';
import Details from '../screens/Details';
import Settings from '../screens/Settings';
import Alquran from '../screens/Alquran';
import JadwalShalat from '../screens/JadwalShalat';
import Wirid from '../screens/Wirid';
import DoaTahlil from '../screens/DoaTahlil';
import BottomNavigator from '../components/tab/BottomNavigator';
import {detailStore} from '../utils/api/zustand/detailStore';
import ThemeContext from '../utils/context/themeContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  const {theme} = useContext(ThemeContext);

  return (
    <Tab.Navigator
      tabBar={props => <BottomNavigator {...props} theme={theme} />}>
      <Tab.Screen
        name="Beranda"
        component={Home}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Pengaturan"
        component={Settings}
        options={{
          headerBlurEffect: 'light',
          headerStyle: {backgroundColor: '#009788'},
          headerTitle: `Pengaturan`,
          headerTitleStyle: {color: '#fff'},
        }}
      />
    </Tab.Navigator>
  );
};

const Routes = () => {
  const navigate = useNavigation();

  const {title} = detailStore(state => state);

  return (
    <Stack.Navigator initialRouteName="MainApp">
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerBlurEffect: 'light',
          headerStyle: {backgroundColor: '#009788'},
          headerTitle: `${title}`,
          headerTitleStyle: {color: '#fff'},
          headerBackButtonMenuEnabled: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigate.goBack()}>
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color={'#fff'}
                style={{marginRight: 18}}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Alquran"
        component={Alquran}
        options={{
          headerBlurEffect: 'light',
          headerStyle: {backgroundColor: '#009788'},
          headerTitle: 'Al-Quran',
          headerTitleStyle: {color: '#fff'},
          headerBackButtonMenuEnabled: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigate.goBack()}>
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color={'#fff'}
                style={{marginRight: 18}}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="JadwalShalat"
        component={JadwalShalat}
        options={{
          headerBlurEffect: 'light',
          headerStyle: {backgroundColor: '#009788'},
          headerTitle: 'Jadwal Shalat',
          headerTitleStyle: {color: '#fff'},
          headerBackButtonMenuEnabled: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigate.goBack()}>
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color={'#fff'}
                style={{marginRight: 18}}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="WiridDoa"
        component={Wirid}
        options={{
          headerBlurEffect: 'light',
          headerStyle: {backgroundColor: '#009788'},
          headerTitle: 'Doa Harian',
          headerTitleStyle: {color: '#fff'},
          headerBackButtonMenuEnabled: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigate.goBack()}>
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color={'#fff'}
                style={{marginRight: 18}}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="DoaTahlil"
        component={DoaTahlil}
        options={{
          headerBlurEffect: 'light',
          headerStyle: {backgroundColor: '#009788'},
          headerTitle: 'Doa Tahlil',
          headerTitleStyle: {color: '#fff'},
          headerBackButtonMenuEnabled: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigate.goBack()}>
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color={'#fff'}
                style={{marginRight: 18}}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;

const styles = StyleSheet.create({});
