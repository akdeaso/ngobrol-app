import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React from 'react';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#00BF92" size={moderateScale(35)} />
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
