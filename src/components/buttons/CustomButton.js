import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const CustomButton = ({label, icon, onNavigate}) => {
  return (
    <TouchableOpacity style={{width: '33.3%'}} onPress={onNavigate}>
      <View style={{alignItems: 'center', gap: 4}}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 100,
            backgroundColor: '#c7f9cc',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={icon} style={{width: 48, height: 48}} />
        </View>
        <Text style={{textAlign: 'center', fontSize: 12}}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
