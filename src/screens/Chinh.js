import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

export default function Chinh() {
  return (
    <View>
      <Text>TestScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    tabBarContainer: {
      flexDirection: 'column', // Stack header and tab bar items vertically
      alignItems: 'center',
    }
});
