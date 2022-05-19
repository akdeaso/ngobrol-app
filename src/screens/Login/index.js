import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import {navigate} from '../../helpers/navigation';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Button, Input} from '@rneui/base';
import Feather from 'react-native-vector-icons/Feather';
import {ms} from 'react-native-size-matters';

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [userState, setUserState] = useState({
    email: '',
    password: '',
  });

  const handlingUserState = (field, value) => {
    setUserState(prevState => {
      prevState[field] = value;
      return {
        ...prevState,
      };
    });
  };
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Email"
            onChangeText={text => handlingUserState('email', text)}
          />
          <Input
            placeholder="Password"
            secureTextEntry={showPassword}
            onChangeText={text => handlingUserState('password', text)}
            rightIcon={() => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setShowPassword(value => !value);
                  }}>
                  <Feather
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={ms(24)}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View>
          <Button title={'Sign In'} containerStyle={styles.loginButton} />
          <View style={styles.registerContainer}>
            <Text>New user? </Text>
            <TouchableOpacity onPress={() => navigate('Register')}>
              <Text style={styles.registerText}>Register here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  scrollview: {
    flexGrow: 1,
    paddingHorizontal: widthPercentageToDP(4),
    marginBottom: heightPercentageToDP(2),
  },
  inputContainer: {
    marginTop: heightPercentageToDP(30),
    alignItems: 'center',
  },
  loginButton: {
    marginHorizontal: ms(9),
    marginVertical: ms(10),
  },
  registerContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  registerText: {
    color: 'blue',
  },
});
