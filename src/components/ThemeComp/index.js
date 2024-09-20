import React, { useContext } from 'react';
import { Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { ThemeContext } from '../ThemeProvider';

const ThemeComp = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={toggleTheme} style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.text, { color: theme.textColor }]}>Toggle Theme</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default ThemeComp;
