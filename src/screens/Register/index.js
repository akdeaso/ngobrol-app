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
import LoadingScreen from '../../components/Loading';
import authProvider from '@react-native-firebase/auth';
import messagingProvider from '@react-native-firebase/messaging';
import {navigate} from '../../helpers/navigation';
import {DB} from '../../helpers/db';
import {useDispatch} from 'react-redux';
import {setDataUser} from '../Login/redux/action';

const auth = authProvider();
const messaging = messagingProvider();

const Register = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [disable, setDisable] = useState(false);
  const [Loading, setLoading] = useState(false);
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

  const onRegister = async () => {
    try {
      setLoading(true);
      const res = await auth.createUserWithEmailAndPassword(
        userState.email,
        userState.password,
      );
      console.log(res);
      if ('email' in res.user && res.user.email) {
        await auth.currentUser.updateProfile({
          displayName: userState.name,
        });
        const token = await messaging.getToken();

        if (token) {
          const payload = {
            displayName: userState.name,
            email: res.user.email,
            phoneNumber: res.user.phoneNumber,
            photoURL: res.user.photoURL,
            contact: [],
            roomChat: [],
            _id: res.user.uid,
            notifToken: token,
          };
          await DB.ref(`users/${res.user.uid}`).set(payload);
          dispatch(setDataUser(payload));
          navigate('Login');
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateButton();
  }, [validateButton]);

  if (Loading) {
    return <LoadingScreen />;
  }

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
            leftIcon={{type: 'feather', name: 'user'}}
          />
          <Input
            placeholder="Email"
            onChangeText={text => handlingUserState('email', text)}
            leftIcon={{type: 'feather', name: 'mail'}}
          />
          <Input
            placeholder="Password"
            secureTextEntry={showPassword}
            onChangeText={text => handlingUserState('password', text)}
            leftIcon={{type: 'feather', name: 'lock'}}
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
            leftIcon={{type: 'feather', name: 'lock'}}
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
            buttonStyle={{backgroundColor: '#00BF92'}}
            onPress={() => onRegister()}
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
