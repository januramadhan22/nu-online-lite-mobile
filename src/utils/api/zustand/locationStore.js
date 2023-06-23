import {create} from 'zustand';
import axios from 'axios';

const MAP_URL = 'https://nominatim.openstreetmap.org/reverse?format=json';
const API_MY_QURAN = 'https://api.myquran.com/v1/';

export const locationStore = create((set, get) => ({
  isLoading: false,
  isSuccess: false,
  latitude: null,
  longitude: null,
  statusPermission: '',
  city: '',
  state: '',
  IdLocation: '',
  salatSchedule: null,
  oncomingTime: '',

  getLocationPermission: async permission => {
    const status = await permission;
    set({statusPermission: status});
  },

  getUserCoordinate: (geolocation, getUserAddress) => {
    geolocation(
      position => {
        const {latitude, longitude} = position.coords;
        set({latitude: latitude, longitude: longitude});

        getUserAddress(latitude, longitude);
      },
      error => {
        console.log('error get position', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  },

  getIdCity: city => {
    set({isLoading: true, isSuccess: false});
    axios
      .get(`${API_MY_QURAN}/sholat/kota/cari/${city}`)
      .then(response => {
        const {data} = response.data;
        const [location] = data.filter(item =>
          item.lokasi.toLowerCase().includes('kab'),
        );
        set({idLocation: location.id});
      })
      .catch(error => console.log(error))
      .then(() => set({isLoading: false}));
  },

  getUserAddress: (latitude, longitude) => {
    const {getIdCity} = get();
    set({isLoading: true, isSuccess: false});
    axios
      .get(`${MAP_URL}&lat=${latitude}&lon=${longitude}`)
      .then(response => {
        const {city, town, county, state} = response.data.address;
        set({isSuccess: true, city: city || town || county, state: state});
        getIdCity(city || town || county);
      })
      .catch(error => console.log(error))
      .finally(() => set({isLoading: false}));
  },

  getSalatSchedule: (idLocation, date) => {
    set({isLoading: true, isSuccess: false});
    axios
      .get(
        `${API_MY_QURAN}/sholat/jadwal/${idLocation}/${date?.getFullYear()}/${String(
          date?.getMonth() + 1,
        ).padStart(2, '0')}/${date?.getDate()}`,
      )
      .then(response => {
        const {jadwal} = response.data.data;
        set({isSuccess: true, salatSchedule: jadwal});
      })
      .catch(error => console.log(error))
      .then(() => set({isLoading: false}));
  },

  getOncomingTime: date => {
    const {salatSchedule} = get();
    const imsak = new Date(
      `${salatSchedule?.date} ${salatSchedule?.imsak}`,
    ).getTime();
    const subuh = new Date(
      `${salatSchedule?.date} ${salatSchedule?.subuh}`,
    ).getTime();
    const terbit = new Date(
      `${salatSchedule?.date} ${salatSchedule?.terbit}`,
    ).getTime();
    const dhuha = new Date(
      `${salatSchedule?.date} ${salatSchedule?.dhuha}`,
    ).getTime();
    const dzuhur = new Date(
      `${salatSchedule?.date} ${salatSchedule?.dzuhur}`,
    ).getTime();
    const ashar = new Date(
      `${salatSchedule?.date} ${salatSchedule?.ashar}`,
    ).getTime();
    const maghrib = new Date(
      `${salatSchedule?.date} ${salatSchedule?.maghrib}`,
    ).getTime();
    const isya = new Date(
      `${salatSchedule?.date} ${salatSchedule?.isya}`,
    ).getTime();

    if (date.getTime() < imsak) {
      set({oncomingTime: `Imsak ${salatSchedule?.imsak}`});
    } else if (date.getTime() < subuh) {
      set({oncomingTime: `Subuh ${salatSchedule?.subuh}`});
    } else if (date.getTime() < terbit) {
      set({oncomingTime: `Terbit ${salatSchedule?.terbit}`});
    } else if (date.getTime() < dhuha) {
      set({oncomingTime: `Dhuha ${salatSchedule?.dhuha}`});
    } else if (date.getTime() < dzuhur) {
      set({oncomingTime: `Dzuhur ${salatSchedule?.dzuhur}`});
    } else if (date.getTime() < ashar) {
      set({oncomingTime: `Ashar ${salatSchedule?.ashar}`});
    } else if (date.getTime() < maghrib) {
      set({oncomingTime: `Maghrib ${salatSchedule?.maghrib}`});
    } else if (date.getTime() < isya) {
      set({oncomingTime: `Isya ${salatSchedule?.isya}`});
    }
  },
}));
