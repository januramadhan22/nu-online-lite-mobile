import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import Sound from 'react-native-sound';
import Slider from 'react-native-slider';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {detailStore} from '../utils/api/zustand/detailStore';

const Details = ({route}) => {
  const {params} = route;
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [details, setDetails] = useState({});
  const [moreDetails, setMoreDetails] = useState(null);
  const [sound, setSound] = useState(null);
  const [soundsArray, setSoundsArray] = useState([]);
  const [duration, setDuration] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentSound, setCurrentSound] = useState(0);

  const {title} = detailStore(state => state);

  const windowHeight = Dimensions.get('window').height;

  const handleGetDetailSurah = () => {
    setIsLoading(true);
    setIsSuccess(false);
    axios
      .get(params.surahId)
      .then(response => {
        const {data} = response.data;
        setIsSuccess(true);
        setDetails(data);
        setSoundsArray(
          data.verses.map(
            surah => surah.audio.primary || surah.audio.secondary[0],
          ),
        );
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  };

  const handlePlaySound = link => {
    const sound = new Sound(link, null, error => {
      if (error) {
        console.log(error);
      }
      setSound(sound);
      setDuration(sound.getDuration());

      sound.play(success => {
        if (success) {
          console.log('Sound played successfully');
        } else {
          console.log('Sound playback failed');
        }

        setCurrentPosition(0);
        sound.setCurrentTime(0);
      });
    });
  };

  const handleActionSound = () => {
    setIsPlay(!isPlay);
    setCurrentSound(0);
  };

  useEffect(() => {
    handleGetDetailSurah();
  }, [params.surahId]);

  useEffect(() => {
    if (currentSound === soundsArray.length) {
      console.log('stop');
      setIsPlay(false);
      setCurrentSound(0);
      return;
    }

    if (isPlay) {
      const sound = new Sound(soundsArray[currentSound], null, error => {
        if (error) {
          console.log('Error loading sound:', error);
        } else if (currentSound !== soundsArray.length) {
          console.log('current sound play', currentSound);
          sound.play(success => {
            if (success && currentSound !== soundsArray.length) {
              const timeout = setTimeout(() => {
                setCurrentSound(prevSound => prevSound + 1);
                console.log('previous sound playing', currentSound);
              }, 500);

              return () => clearTimeout(timeout);
            } else {
              console.log('Error playing sound');
            }
          });
        }
      });
    }
  }, [isPlay, currentSound, soundsArray]);

  return (
    <>
      {/* Bottom Feature */}
      <View
        style={{
          position: 'absolute',
          padding: 20,
          zIndex: 99,
          bottom: 0,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          minHeight: 60,
          backgroundColor: '#f9f9f9',
          elevation: 1,
          ...Platform.select({
            android: {
              borderTopWidth: 0,
              borderTopColor: 'transparent',
            },
          }),
        }}>
        <View style={{flexDirection: 'column', gap: 4}}>
          <Text style={{fontSize: 14, color: '#222'}}>Putar surah</Text>
          <Text style={{fontSize: 18, fontWeight: 500, color: '#222'}}>
            {title} {currentSound + 1}/{soundsArray.length}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
          <TouchableOpacity onPress={handleActionSound}>
            <View
              style={{
                backgroundColor: !isPlay ? '#c7f9cc' : 'transparent',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 100,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}>
              <Ionicons
                name={!isPlay ? 'play' : 'stop'}
                color={!isPlay ? '#009788' : '#222'}
                size={18}
              />
              <Text style={{fontSize: 16, color: !isPlay ? '#009788' : '#222'}}>
                {!isPlay ? 'Putar' : 'Berhenti'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Feature */}
      <View
        style={{
          position: 'relative',
          backgroundColor: '#fff',
          height: windowHeight,
        }}>
        {isLoading ? (
          <View
            style={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <>
            {/* Header of Detail */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderColor: '#57cc99',
                marginTop: 4,
                backgroundColor: '#c7f9cc',
                // shadowColor: '#000',
                elevation: 10,
              }}>
              <Text
                style={{
                  width: '33.3%',
                  textAlign: 'left',
                  fontSize: 14,
                  color: '#000',
                  paddingLeft: 24,
                }}>
                {details?.revelation?.id}
              </Text>

              <View
                style={{
                  width: '33.3%',
                  backgroundColor: '#fff',
                  borderRadius: 32,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 28,
                    color: '#000',
                  }}>
                  {details?.name?.short}
                </Text>
              </View>

              <Text
                style={{
                  width: '33.3%',
                  textAlign: 'right',
                  fontSize: 14,
                  color: '#000',
                  paddingRight: 24,
                }}>
                {details?.numberOfVerses} ayat
              </Text>
            </View>

            {/* Main Content of Detail */}
            <ScrollView style={{marginBottom: 160}}>
              <View style={{flex: 1, flexDirection: 'column'}}>
                {/* BismiLlah */}
                {details?.preBismillah !== null && (
                  <View
                    style={{
                      paddingVertical: 20,
                      borderBottomWidth: 0.2,
                      borderBottomColor: '#0005',
                      gap: 2,
                    }}>
                    <Text
                      style={{
                        fontSize: 24,
                        textAlign: 'right',
                        color: '#000',
                        paddingHorizontal: 24,
                      }}>
                      {details?.preBismillah?.text?.arab}
                    </Text>
                    <Text
                      style={{
                        textAlign: 'left',
                        paddingHorizontal: 24,
                        color: '#009053',
                      }}>
                      {details?.preBismillah?.text?.transliteration?.en}
                    </Text>
                  </View>
                )}

                {/* List of Ayat */}
                {details?.verses?.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setMoreDetails(item);
                      setIsOpen(true);
                    }}>
                    <View
                      key={index}
                      style={{
                        paddingVertical: 20,
                        borderBottomWidth: 0.2,
                        borderBottomColor: '#0005',
                        gap: 2,
                      }}>
                      <Text
                        style={{
                          fontSize: 24,
                          textAlign: 'right',
                          color: '#000',
                          paddingHorizontal: 24,
                        }}>
                        {item.text.arab}{' '}
                        <Text style={{fontSize: 16}}>
                          ({item.number.inSurah})
                        </Text>
                      </Text>
                      <Text style={{paddingHorizontal: 24, color: '#009053'}}>
                        {item.text.transliteration.en}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </>
        )}

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
                gap: 10,
                overflow: 'scroll',
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
                Tafsir
              </Text>

              <ScrollView style={{height: '100%', gap: 14}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    textAlign: 'justify',
                    color: '#222',
                  }}>
                  {moreDetails?.tafsir?.id?.long}
                </Text>
              </ScrollView>
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
      </View>
    </>
  );
};

export default Details;

const styles = StyleSheet.create({});
