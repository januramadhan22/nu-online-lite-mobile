import {Image, StyleSheet, View} from 'react-native';
import React from 'react';

const CustomIcon = ({path}) => {
  return <Image source={path} style={{width: 32, height: 32}} />;
};

export default CustomIcon;

const styles = StyleSheet.create({});
