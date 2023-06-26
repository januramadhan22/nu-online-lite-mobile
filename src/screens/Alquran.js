import React, {useState, useEffect, useContext} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

import {BASE_URL} from '../utils/api/url';
import {detailStore} from '../utils/api/zustand/detailStore';
import ThemeContext from '../utils/context/themeContext';

const Alquran = ({navigation}) => {
  const [surah, setSurah] = useState([]);
  const [searchedSurah, setSearchedSurah] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [inputText, setInputText] = useState('');

  const {changeTitle} = detailStore(state => state);
  const {theme} = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 14,
      backgroundColor: theme === 'light' ? '#fff' : '#222',
    },
    wrapperSurah: {
      marginVertical: 4,
      paddingVertical: 12,
      flex: 1,
      flexDirection: 'row',
      gap: 8,
      borderBottomWidth: 0.2,
      borderBottomColor: theme === 'light' ? '#0005' : '#fff',
    },
    wrapperSurahName: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

  const handleGetSurah = () => {
    setIsLoading(true);
    setIsSuccess(false);
    axios
      .get(`${BASE_URL}/surah`)
      .then(response => {
        const {data} = response.data;
        setIsSuccess(true);
        setSurah(data);
        setSearchedSurah(data);
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  };

  const handleSearchSurah = () => {
    if (inputText !== '') {
      const searched = surah.filter(item =>
        item.name.transliteration.id
          .toLowerCase()
          .includes(inputText.toLowerCase()),
      );
      setSearchedSurah(searched);
    } else {
      setSearchedSurah(surah);
    }
  };

  useEffect(() => {
    handleGetSurah();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Form */}
      <View>
        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
            paddingHorizontal: 12,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            backgroundColor: theme === 'light' ? '#f3f3f3' : '#2F312F',
            borderRadius: 10,
            overflow: 'hidden',
          }}>
          <TouchableOpacity onPress={handleSearchSurah}>
            <Ionicons name="search-outline" size={24} color={'grey'} />
          </TouchableOpacity>
          <TextInput
            style={{
              flex: 1,
              color: theme === 'light' ? '#000' : '#fff',
              fontSize: 16,
              letterSpacing: 0.5,
            }}
            placeholderTextColor={'grey'}
            placeholder="Cari Nama Surah"
            value={inputText}
            onChangeText={setInputText}
          />
          {inputText !== '' && (
            <TouchableOpacity
              onPress={() => {
                setInputText('');
                setSearchedSurah(surah);
              }}>
              <Ionicons name="close-circle" size={24} color={'grey'} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* List Surah */}
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      ) : searchedSurah?.length > 0 ? (
        <FlatList
          data={searchedSurah}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Details', {
                  surahId: `${BASE_URL}/surah/${item.number}`,
                });
                changeTitle(item.name.transliteration.id);
              }}>
              <View style={styles.wrapperSurah}>
                <Text
                  style={{
                    fontSize: 16,
                    color: theme === 'light' ? '#000' : '#fff',
                  }}>
                  {item.number}.
                </Text>
                <View style={styles.wrapperSurahName}>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        color: theme === 'light' ? '#000' : '#fff',
                      }}>
                      {item.name.transliteration.id}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: theme === 'light' ? 'grey' : '#009788',
                      }}>
                      {item?.revelation?.id}: {item?.numberOfVerses}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 24,
                        color: theme === 'light' ? '#000' : '#fff',
                      }}>
                      {item.name.short}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 14,
          }}>
          <View
            style={{
              height: 120,
              width: 120,
              backgroundColor: '#f1f1f1',
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/quran_grey_icon.png')}
              style={{width: 72, height: 72}}
            />
          </View>
          <Text style={{color: 'grey', fontSize: 20}}>
            'Surah Tidak Ditemukan'
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Alquran;
