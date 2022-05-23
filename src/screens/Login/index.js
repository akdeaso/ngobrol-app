import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import {navigate} from '../../helpers/navigation';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import LoginImage from '../../assets/images/img_login.png';
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
        <View style={styles.imgContainer}>
          <Image
            source={LoginImage}
            style={styles.topImage}
            resizeMode="contain"
          />
        </View>
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
          <Button
            title={'Sign In'}
            containerStyle={styles.loginButton}
            buttonStyle={{backgroundColor: '#00BF92'}}
          />
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
  imgContainer: {
    flex: 1,
    alignItems: 'center',
  },
  topImage: {
    width: widthPercentageToDP(90),
    height: ms(300),
  },
});
