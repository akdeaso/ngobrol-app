import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Input} from '@rneui/base';
import Feather from 'react-native-vector-icons/Feather';
import RegisterImage from '../../assets/images/img_register.png';
import {ms} from 'react-native-size-matters';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {navigate} from '../../helpers/navigation';

const Register = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [disable, setDisable] = useState(false);
  const [userState, setUserState] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateButton = useCallback(() => {
    const {password, confirmPassword} = userState;
    if (password === confirmPassword && password && confirmPassword) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [userState]);

  const handlingUserState = (field, value) => {
    setUserState(prevState => {
      prevState[field] = value;
      return {
        ...prevState,
      };
    });
  };

  useEffect(() => {
    validateButton();
  }, [validateButton]);

  return (
    <SafeAreaView flex={1}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View style={styles.imgContainer}>
          <Image
            source={RegisterImage}
            style={styles.topImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Name"
            onChangeText={text => handlingUserState('name', text)}
          />
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
                    setShowPassword(val => !val);
                  }}>
                  <Feather
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={ms(24)}
                  />
                </TouchableOpacity>
              );
            }}
          />
          <Input
            placeholder="Confirm Password"
            secureTextEntry={showConfirmPassword}
            onChangeText={text => handlingUserState('confirmPassword', text)}
            rightIcon={() => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setShowConfirmPassword(val => !val);
                  }}>
                  <Feather
                    name={showConfirmPassword ? 'eye-off' : 'eye'}
                    size={ms(24)}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View>
          <Button
            disabled={disable}
            title="Sign Up"
            containerStyle={styles.registerButton}
          />
          <View style={styles.loginContainer}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigate('Login')}>
              <Text style={styles.loginText}>Sign in here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  scrollview: {
    flexGrow: 1,
    paddingHorizontal: widthPercentageToDP(4),
    marginBottom: heightPercentageToDP(2),
  },
  inputContainer: {
    alignItems: 'center',
  },
  registerButton: {
    marginHorizontal: ms(9),
    marginVertical: ms(10),
  },
  loginContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  loginText: {
    color: 'blue',
  },
  imgContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topImage: {
    width: widthPercentageToDP(100),
    height: ms(170),
  },
});
