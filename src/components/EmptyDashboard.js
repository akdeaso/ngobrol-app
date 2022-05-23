import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';

const EmptyDashboard = ({search}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {search ? 'Add user to start chatting' : 'No user found'}
      </Text>
    </View>
  );
};

export default EmptyDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: ms(16),
  },
});
