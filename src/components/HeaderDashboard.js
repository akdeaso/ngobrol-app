import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {logOut} from '../screens/Login/redux/action';
import {ms} from 'react-native-size-matters';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Avatar} from '@rneui/base';
import {navigate} from '../helpers/navigation';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';

const HeaderDashboard = ({callback = () => {}}) => {
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      await auth().signOut();
      navigate('Login');
      dispatch(logOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* <Feather name="search" color="white" size={ms(24)} /> */}
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity onPress={logout}>
          <Avatar
            size={48}
            rounded
            source={{uri: 'https://i.pravatar.cc/150?u=' + Date.now()}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.body} />
    </View>
  );
};

export default HeaderDashboard;

const styles = StyleSheet.create({
  container: {
    height: ms(120),
    backgroundColor: '#00BF92',
  },
  content: {
    justifyContent: 'space-between',
    marginTop: ms(16),
    paddingHorizontal: widthPercentageToDP(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: ms(18),
  },
  body: {
    height: ms(120),
    marginTop: ms(32),
    backgroundColor: 'white',
  },
});
