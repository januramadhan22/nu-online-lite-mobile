import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import {doaTahlil} from '../utils/api/doaTahlil';
import ThemeContext from '../utils/context/themeContext';

const DoaTahlil = () => {
  const {theme} = useContext(ThemeContext);

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: theme === 'light' ? '#fff' : '#222'}}>
      <ScrollView>
        <View
          style={{
            // paddingVertical: 24,
            flexDirection: 'column',
            gap: 24,
            marginBottom: 24,
            overflow: 'hidden',
          }}>
          {doaTahlil.map((doa, index) => (
            <View
              key={index}
              style={{
                padding: 24,
                borderBottomWidth: 0.2,
                borderBottomColor: theme === 'light' ? '#0005' : '#fff',
                gap: 16,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: theme === 'light' ? '#222' : '#fff',
                }}>
                {doa.arab}
              </Text>
              <Text style={{fontSize: 14, color: '#009053'}}>{doa.id}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoaTahlil;

const styles = StyleSheet.create({});
