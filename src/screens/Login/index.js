import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useState} from 'react';
import {navigate} from '../../helpers/navigation';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import LoginImage from '../../assets/images/img_login.png';
import LoadingScreen from '../../components/Loading';
import {Button, Input} from '@rneui/base';
import Feather from 'react-native-vector-icons/Feather';
import {ms} from 'react-native-size-matters';
import {DB} from '../../helpers/db';
import authProvider from '@react-native-firebase/auth';
import messagingProvider from '@react-native-firebase/messaging';
import {useDispatch} from 'react-redux';
import {setDataUser} from './redux/action';

const auth = authProvider();
const messaging = messagingProvider();

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(true);
  const [Loading, setLoading] = useState(false);
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

  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await auth.signInWithEmailAndPassword(
        userState.email,
        userState.password,
      );

      const token = await messaging.getToken();

      if (token) {
        let isUpdate = false;
        await DB.ref(`users/${res.user.uid}`).update({
          notifToken: token,
        });
        isUpdate = true;

        if (isUpdate) {
          const results = await DB.ref(`users/${res.user.uid}`).once('value');
          if (results.val()) {
            dispatch(setDataUser(results.val()));
            navigate('Home');
          }
        }
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Invalid user, please try again');
      }
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Sign in failed', 'Email is not valid');
      }
    } finally {
      setLoading(false);
    }
  };

  if (Loading) {
    return <LoadingScreen />;
  }

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
            onPress={() => onLogin()}
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
