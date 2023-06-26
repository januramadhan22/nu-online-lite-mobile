import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import Routes from './routes/Routes';
import {ThemeProvider} from './utils/context/themeContext';

function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;

const styles = StyleSheet.create({});
