import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={require('../assets/logoTrans.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    paddingTop: 100,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#545454',
  },
  logo: {
    width: 600,
    height: 250,
  },
});
