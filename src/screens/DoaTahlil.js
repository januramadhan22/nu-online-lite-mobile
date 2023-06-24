import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {doaTahlil} from '../utils/api/doaTahlil';

const DoaTahlil = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
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
                borderBottomColor: '#2225',
                gap: 16,
              }}>
              <Text style={{fontSize: 20, color: '#222'}}>{doa.arab}</Text>
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
