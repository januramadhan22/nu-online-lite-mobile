import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomNavigator = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const Icon = () => {
          if (label === 'Beranda')
            return isFocused ? (
              <Ionicons name="home" size={24} color={'#009788'} />
            ) : (
              <Ionicons name="home" size={24} color={'#c8c8c8'} />
            );
          if (label === 'Pengaturan')
            return isFocused ? (
              <Ionicons name="settings" size={24} color={'#009788'} />
            ) : (
              <Ionicons name="settings" size={24} color={'#c8c8c8'} />
            );

          return <Ionicons name="home" size={24} color={'#c8c8c8'} />;
        };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? ['Selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={() => {
              onPress();
              console.log('test');
            }}
            onLongPress={onLongPress}
            style={{alignItems: 'center'}}>
            <Icon />
            <Text
              style={{
                color: isFocused ? '#009788' : '#c8c8c8',
                fontSize: 14,
                marginTop: 6,
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingHorizontal: 55,
    paddingVertical: 14,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 10},
    // shadowRadius: 4,
    // shadowOpacity: 100,
    elevation: 10,
    borderTopWidth: 0.2,
    borderTopColor: '#0002',
  },
});
