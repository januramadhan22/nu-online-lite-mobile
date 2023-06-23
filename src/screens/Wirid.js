import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Image,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {doaHarian} from '../utils/api/doaHarian';

const Wirid = () => {
  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDoa, setSelectedDoa] = useState(null);
  const [searchedDoa, setSearchedDoa] = useState(doaHarian);

  const handleSearchDoa = () => {
    if (inputText !== '') {
      const searched = doaHarian.filter(item =>
        item.id.toLowerCase().includes(inputText.toLowerCase()),
      );
      setSearchedDoa(searched);
    } else {
      setSearchedDoa(doaHarian);
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, paddingHorizontal: 14, backgroundColor: '#fff'}}>
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
            backgroundColor: '#f3f3f3',
            borderRadius: 10,
            overflow: 'hidden',
          }}>
          <TouchableOpacity onPress={handleSearchDoa}>
            <Ionicons name="search-outline" size={24} color={'grey'} />
          </TouchableOpacity>
          <TextInput
            style={{
              flex: 1,
              color: '#000',
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
                setSearchedDoa(doaHarian);
              }}>
              <Ionicons name="close-circle" size={24} color={'grey'} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'column',
            gap: 24,
            marginBottom: 24,
            overflow: 'hidden',
          }}>
          {searchedDoa.length > 0 ? (
            searchedDoa.map((doa, index) => (
              <TouchableOpacity
                onPress={() => {
                  setIsOpen(!isOpen);
                  setSelectedDoa(doa);
                }}
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // gap: 12,
                  borderRadius: 12,
                  // borderWidth: 1,
                  elevation: 3,
                  backgroundColor: '#fff',
                  overflow: 'hidden',
                }}>
                <Text
                  style={{
                    height: '100%',
                    paddingHorizontal: 16,
                    paddingVertical: 24,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#c7f9cc',
                    color: '#009788',
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 600,
                  }}>
                  {index + 1}
                </Text>

                <Text
                  style={{
                    maxHeight: 80,
                    width: '80%',
                    paddingHorizontal: 16,
                    // paddingVertical: 24,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#222',
                    fontSize: 18,
                    fontWeight: 400,
                    overflow: 'hidden',
                  }}>
                  {doa.doa}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <View
              style={{
                flex: 1,
                height: Dimensions.get('window').height / 2,
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
                  source={require('../assets/pray_grey_icon.png')}
                  style={{width: 72, height: 72}}
                />
              </View>
              <Text style={{color: 'grey', fontSize: 20}}>
                'Doa Harian Tidak Ditemukan'
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modal Detail Doa */}
      <Modal
        visible={isOpen}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
        transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0004',
            padding: 16,
          }}>
          <View
            style={{
              backgroundColor: '#f3f3f3',
              width: '90%',
              maxHeight: '80%',
              alignItems: 'center',
              borderRadius: 14,
              elevation: 4,
              padding: 24,
              gap: 24,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 24,
                fontWeight: 600,
                color: '#009788',
                textShadowColor: 'rgba(0, 0, 0, 0.5)',
                textShadowOffset: {width: 1, height: 1},
                textShadowRadius: 2,
              }}>
              {selectedDoa?.doa}
            </Text>
            <View style={{alignItems: 'center', gap: 14}}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  textAlign: 'center',
                  color: '#222',
                }}>
                {selectedDoa?.arab}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  textAlign: 'center',
                  color: '#222',
                }}>
                {selectedDoa?.id}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#009788',
                padding: 8,
                borderRadius: 4,
              }}>
              <Text
                onPress={() => setIsOpen(false)}
                style={{color: '#fff', fontWeight: 500}}>
                Kembali
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Wirid;

const styles = StyleSheet.create({});
