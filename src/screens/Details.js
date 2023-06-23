import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';

const Details = ({route}) => {
  const {params} = route;
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    handleGetDetailSurah();
  }, [params.surahId]);

  return (
    <View style={{backgroundColor: '#fff', height: windowHeight}}>
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
          <ScrollView style={{marginBottom: 100}}>
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
                      color: '#222',
                    }}>
                    {details?.preBismillah?.text?.transliteration?.en}
                  </Text>
                </View>
              )}

              {/* List of Ayat */}
              {details?.verses?.map((item, index) => (
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
                    <Text style={{fontSize: 16}}>({item.number.inSurah})</Text>
                  </Text>
                  <Text style={{paddingHorizontal: 24, color: '#222'}}>
                    {item.text.transliteration.en}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({});
