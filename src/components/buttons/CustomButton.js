import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useContext} from 'react';
import ThemeContext from '../../utils/context/themeContext';

const CustomButton = ({label, icon, onNavigate}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <TouchableOpacity style={{width: '33.3%'}} onPress={onNavigate}>
      <View style={{alignItems: 'center', gap: 4}}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 100,
            backgroundColor: theme === 'light' ? '#c7f9cc' : '#009788',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={icon} style={{width: 48, height: 48}} />
        </View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 12,
            color: theme === 'light' ? 'grey' : '#fff',
          }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
