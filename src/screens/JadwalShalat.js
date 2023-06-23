import moment from 'moment-hijri';
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS} from 'react-native-permissions';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {locationStore} from '../utils/api/zustand/locationStore';

const JadwalShalat = () => {
  const [date, setDate] = useState(new Date());
  const today = date.getDate();
  const month = String(date.getMonth() + 1).padStart(2, '0'); //Menambahkan angka "0" diawal jika digitnya kurang dari 2
  const year = date.getFullYear();

  const {
    isLoading,
    isSuccess,
    latitude,
    longitude,
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

  // const getLocationPermission = async () => {
  //   try {
  //     const status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  //     setLocationPermission(status);
  //   } catch (error) {
  //     console.log('Not allowed permission', error);
  //   }
  // };

  // const getUserLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       const {latitude, longitude} = position.coords;
  //       setUserLocation({latitude: latitude, longitude: longitude});

  //       convertGeocode(latitude, longitude);
  //     },
  //     error => {
  //       console.log('error get position', error);
  //     },
  //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //   );
  // };

  // const convertGeocode = (latitude, longitude) => {
  //   setIsLoading(true);
  //   setIsSuccess(false);
  //   axios
  //     .get(`${MAP_URL}&lat=${latitude}&lon=${longitude}`)
  //     .then(response => {
  //       const {city, town, county, state} = response.data.address;
  //       setIsSuccess(true);
  //       setUserLocation({
  //         ...userLocation,
  //         address: {city: city || town || county, state: state},
  //       });

  //       getIdCity({
  //         ...userLocation,
  //         address: {city: city || town || county, state: state},
  //       });
  //     })
  //     .catch(error => console.log(error))
  //     .finally(() => setIsLoading(false));
  // };

  // const getIdCity = user => {
  //   setIsLoading(false);
  //   setIsSuccess(false);
  //   axios
  //     .get(`${API_MY_QURAN}/sholat/kota/cari/${user.address.city}`)
  //     .then(response => {
  //       const {data} = response.data;
  //       const [location] = data.filter(item =>
  //         item.lokasi.toLowerCase().includes('kab'),
  //       );
  //       setUserLocation({...user, idLocation: location.id});
  //     })
  //     .catch(error => console.log(error))
  //     .then(() => setIsLoading(false));
  // };

  // const getShalatTime = () => {
  //   setIsLoading(true);
  //   setIsSuccess(false);
  //   axios
  //     .get(
  //       `${API_MY_QURAN}/sholat/jadwal/${
  //         userLocation.idLocation
  //       }/${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
  //         2,
  //         '0',
  //       )}/${date.getDate()}`,
  //     )
  //     .then(response => {
  //       const {jadwal} = response.data.data;
  //       setIsSuccess(true);
  //       setSchedule(jadwal);
  //     })
  //     .catch(error => console.log(error))
  //     .then(() => setIsLoading(false));
  // };

  // const oncomingTime = () => {
  //   const imsak = new Date(`${schedule?.date} ${schedule?.imsak}`).getTime();
  //   const subuh = new Date(`${schedule?.date} ${schedule?.subuh}`).getTime();
  //   const terbit = new Date(`${schedule?.date} ${schedule?.terbit}`).getTime();
  //   const dhuha = new Date(`${schedule?.date} ${schedule?.dhuha}`).getTime();
  //   const dzuhur = new Date(`${schedule?.date} ${schedule?.dzuhur}`).getTime();
  //   const ashar = new Date(`${schedule?.date} ${schedule?.ashar}`).getTime();
  //   const maghrib = new Date(
  //     `${schedule?.date} ${schedule?.maghrib}`,
  //   ).getTime();
  //   const isya = new Date(`${schedule?.date} ${schedule?.isya}`).getTime();

  //   if (date.getTime() < imsak) {
  //     setOncoming(`Imsak ${schedule?.imsak} WIB`);
  //   } else if (date.getTime() < subuh) {
  //     setOncoming(`Subuh ${schedule?.subuh} WIB`);
  //   } else if (date.getTime() < terbit) {
  //     setOncoming(`Terbit ${schedule?.terbit} WIB`);
  //   } else if (date.getTime() < dhuha) {
  //     setOncoming(`Dhuha ${schedule?.dhuha} WIB`);
  //   } else if (date.getTime() < dzuhur) {
  //     setOncoming(`Dzuhur ${schedule?.dzuhur} WIB`);
  //   } else if (date.getTime() < ashar) {
  //     setOncoming(`Ashar ${schedule?.ashar} WIB`);
  //   } else if (date.getTime() < maghrib) {
  //     setOncoming(`Maghrib ${schedule?.maghrib} WIB`);
  //   } else if (date.getTime() < isya) {
  //     setOncoming(`Isya ${schedule?.isya} WIB`);
  //   }
  // };

  // Get Location Permission
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
    <ScrollView>
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
        {/* Location Detail */}
        <View
          style={{
            height: 300,
            backgroundColor: '#009788',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
          }}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <Ionicons name="location" color={'red'} size={18} />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 400,
                    textShadowColor: 'rgba(0, 0, 0, 0.5)',
                    textShadowOffset: {width: 2, height: 2},
                    textShadowRadius: 5,
                  }}>
                  {`${city}, ${state}`}
                </Text>
              </View>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 32,
                  fontWeight: 600,
                  textShadowColor: 'rgba(0, 0, 0, 0.5)',
                  textShadowOffset: {width: 2, height: 2},
                  textShadowRadius: 5,
                  letterSpacing: 0.5,
                }}>
                {oncomingTime !== ''
                  ? `${oncomingTime} WIB`
                  : 'Waktu Belum Tersedia'}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  getUserCoordinate(
                    Geolocation.getCurrentPosition,
                    getUserAddress,
                  )
                }>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                  <Ionicons name="locate-outline" size={18} color={'#fff'} />
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 14,
                      fontWeight: 400,
                      textShadowColor: 'rgba(0, 0, 0, 0.5)',
                      textShadowOffset: {width: 2, height: 2},
                      textShadowRadius: 5,
                      letterSpacing: 0.5,
                    }}>
                    Update Lokasi
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Date Option */}
        <View
          style={{
            position: 'relative',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              top: -40,
              paddingHorizontal: 32,
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'relative',
              zIndex: 99,
              backgroundColor: '#fff',
              width: '90%',
              height: 75,
              borderRadius: 8,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3,
              elevation: 5, // Android only
              flexDirection: 'row',
            }}>
            {/* Prev Date Button */}
            <TouchableOpacity
              onPress={() => setDate(new Date(date.setDate(today - 1)))}>
              <Ionicons
                name="chevron-back-outline"
                size={24}
                color={'#009788'}
              />
            </TouchableOpacity>

            {/* Date Views */}
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#000',
                }}>
                {date.toLocaleDateString('id', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 400,
                  color: 'grey',
                }}>
                {moment(date).locale('en').format('iDD iMMMM iYYYY')}
              </Text>
            </View>

            {/* Next Date Button */}
            <TouchableOpacity
              onPress={() => setDate(new Date(date.setDate(today + 1)))}>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={'#009788'}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Time List */}
        <View style={{paddingHorizontal: 32, gap: 32}}>
          {/* Imsak */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 8,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <Ionicons name="cloudy-night-outline" size={24} color={'#000'} />
              <Text style={{fontSize: 18, color: '#000'}}>Imsak</Text>
            </View>
            <Text style={{fontSize: 18, color: '#000'}}>
              {isLoading
                ? '00:00'
                : salatSchedule
                ? salatSchedule?.imsak
                : '- - : - -'}
            </Text>
          </View>

          {/* Shubuh */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 8,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <Ionicons name="cloudy-outline" size={24} color={'#000'} />
              <Text style={{fontSize: 18, color: '#000'}}>Subuh</Text>
            </View>
            <Text style={{fontSize: 18, color: '#000'}}>
              {isLoading
                ? '00:00'
                : salatSchedule
                ? salatSchedule?.subuh
                : '- - : - -'}
            </Text>
          </View>

          {/* Terbit */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 8,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <Ionicons name="partly-sunny-outline" size={24} color={'#000'} />
              <Text style={{fontSize: 18, color: '#000'}}>Terbit</Text>
            </View>
            <Text style={{fontSize: 18, color: '#000'}}>
              {isLoading
                ? '00:00'
                : salatSchedule
                ? salatSchedule?.terbit
                : '- - : - -'}
            </Text>
          </View>

          {/* Dhuha */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 8,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <Ionicons name="partly-sunny-outline" size={24} color={'#000'} />
              <Text style={{fontSize: 18, color: '#000'}}>Dhuha</Text>
            </View>
            <Text style={{fontSize: 18, color: '#000'}}>
              {isLoading
                ? '00:00'
                : salatSchedule
                ? salatSchedule?.dhuha
                : '- - : - -'}
            </Text>
          </View>

          {/* Zuhur */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 8,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <Ionicons name="sunny-outline" size={24} color={'#000'} />
              <Text style={{fontSize: 18, color: '#000'}}>Zuhur</Text>
            </View>
            <Text style={{fontSize: 18, color: '#000'}}>
              {isLoading
                ? '00:00'
                : salatSchedule
                ? salatSchedule?.dzuhur
                : '- - : - -'}
            </Text>
          </View>

          {/* Ashar */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 8,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <Ionicons
                name="partly-sunny-outline"
                size={24}
                color={'#000'}
                style={{transform: [{rotateY: '180deg'}]}}
              />
              <Text style={{fontSize: 18, color: '#000'}}>Ashar</Text>
            </View>
            <Text style={{fontSize: 18, color: '#000'}}>
              {isLoading
                ? '00:00'
                : salatSchedule
                ? salatSchedule?.ashar
                : '- - : - -'}
            </Text>
          </View>

          {/* Maghrib */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 8,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <Ionicons name="cloudy-night-outline" size={24} color={'#000'} />
              <Text style={{fontSize: 18, color: '#000'}}>Maghrib</Text>
            </View>
            <Text style={{fontSize: 18, color: '#000'}}>
              {isLoading
                ? '00:00'
                : salatSchedule
                ? salatSchedule?.maghrib
                : '- - : - -'}
            </Text>
          </View>

          {/* Isya' */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 8,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <Ionicons
                name="moon-outline"
                size={24}
                color={'#000'}
                style={{transform: [{rotateY: '180deg'}]}}
              />
              <Text style={{fontSize: 18, color: '#000'}}>Isya'</Text>
            </View>
            <Text style={{fontSize: 18, color: '#000'}}>
              {isLoading
                ? '00:00'
                : salatSchedule
                ? salatSchedule?.isya
                : '- - : - -'}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View
          style={{
            flex: 1,
            marginVertical: 32,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
          }}>
          <Text style={{color: '#000', textAlign: 'center'}}>
            Waktu Shalat telah ditashih oleh
          </Text>
          <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
            <Text
              style={{
                color: '#000',
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 600,
              }}>
              Lembaga Falakiyah Nahdlatul Ulama
            </Text>
            <Ionicons name="checkmark-circle" size={24} color={'#009788'} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default JadwalShalat;

const styles = StyleSheet.create({});
