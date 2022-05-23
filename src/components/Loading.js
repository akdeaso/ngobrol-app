import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#00BF92" size={ms(35)} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
