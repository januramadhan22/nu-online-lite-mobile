import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS} from 'react-native-permissions';
import moment from 'moment-hijri';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomButton from '../components/buttons/CustomButton';
import {locationStore} from '../utils/api/zustand/locationStore';
import axios from 'axios';

const Home = ({navigation}) => {
  const [date, setDate] = useState(new Date());

  const {
    isLoading,
    isSuccess,
    statusPermission,
    city,
    state,
    idLocation,
    salatSchedule,
    oncomingTime,
    getLocationPermission,
    getUserCoordinate,
    getIdCity,
    getUserAddress,
    getSalatSchedule,
    getOncomingTime,
  } = locationStore(state => state);

  useEffect(() => {
    getLocationPermission(request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION));
  }, []);

  //Get User Location
  useEffect(() => {
    if (statusPermission === 'granted') {
      getUserCoordinate(Geolocation.getCurrentPosition, getUserAddress);
    }
  }, [statusPermission]);

  //Get Shalat Time
  useEffect(() => {
    if (idLocation) {
      getSalatSchedule(idLocation, date);
    }
  }, [idLocation, date]);

  //Get Oncoming Time
  useEffect(() => {
    salatSchedule && getOncomingTime(date);

    const interval = setInterval(() => {
      getOncomingTime(date);
    }, 600000);

    return () => clearInterval(interval);
  }, [salatSchedule]);

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 36, color: '#009788'}}>
        nu<Text style={{color: '#222'}}>online</Text>
        <Text style={{color: '#222', fontSize: 24}}>lite</Text>
      </Text>

      {/* Time and Place Detail */}
      {isLoading ? (
        <View style={{marginVertical: 36}}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <View style={{marginVertical: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <Ionicons name="location" color={'red'} size={18} />
            <Text style={{fontSize: 18, textAlign: 'center', color: '#222'}}>
              {`${city}, ${state}`}
            </Text>
            <TouchableOpacity
              onPress={() =>
                getUserCoordinate(
                  Geolocation.getCurrentPosition,
                  getUserAddress,
                )
              }>
              <Text
                style={{fontSize: 16, textAlign: 'center', color: '#009788'}}>
                (Ganti)
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginVertical: 8}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 28,
                fontWeight: 600,
                color: '#222',
              }}>
              {oncomingTime}{' '}
              <Text style={{fontSize: 20, fontWeight: 600}}>
                {oncomingTime !== '' ? 'WIB' : 'Waktu Belum Tersedia'}
              </Text>
            </Text>
          </View>
          <Text style={{fontSize: 16, textAlign: 'center', color: '#222'}}>
            {date.toLocaleDateString('id', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}{' '}
            / {moment(date).locale('en').format('iDD iMMMM iYYYY')}
          </Text>
        </View>
      )}

      {/* Menu List */}
      <View
        style={{
          width: '65%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 32,
          marginVertical: 10,
        }}>
        <CustomButton
          label={"Al-Qur'an"}
          icon={require('../assets/quran_icon.png')}
          onNavigate={() => navigation.navigate('Alquran')}
        />
        <CustomButton
          label={'Doa Harian'}
          icon={require('../assets/pray_icon.png')}
          onNavigate={() => navigation.navigate('WiridDoa')}
        />
        <CustomButton
          label={'Jadwal Shalat'}
          icon={require('../assets/clock_icon.png')}
          onNavigate={() => navigation.navigate('JadwalShalat')}
        />
        <CustomButton
          label={'Doa Tahlil'}
          icon={require('../assets/praying_icon.png')}
          onNavigate={() => navigation.navigate('DoaTahlil')}
        />
      </View>

      {/* Search Bar */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    marginRight: 8,
    fontSize: 16,
  },
  icon: {
    marginLeft: 8,
  },
});
