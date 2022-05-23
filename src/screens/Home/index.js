import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedUser} from './redux/action';
import {navigate} from '../../helpers/navigation';
import {DB} from '../../helpers/db';
import {Avatar} from '@rneui/base';
import LoadingScreen from '../../components/Loading';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';
import HeaderDashboard from '../../components/HeaderDashboard';
import EmptyDashboard from '../../components/EmptyDashboard';

const Home = () => {
  const dispatch = useDispatch();
  const {_user = {email: ''}} = useSelector(state => state.user);
  const [Loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);

  const selectUser = payload => {
    dispatch(setSelectedUser(payload));
    navigate('Chat');
  };

  const getAllData = useCallback(async () => {
    try {
      const res = await DB.ref('/users').once('value');
      const userList = Object.values(res.val()).filter(
        val => val.email !== _user.email,
      );
      setData(userList);
    } catch (error) {
      console.log(error);
    } finally {
      setRefresh(false);
      setLoading(false);
    }
  }, [_user.email]);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  const onReresh = () => {
    setRefresh(true);
    getAllData();
  };

  if (Loading) {
    return <LoadingScreen />;
  }

  const CardComponent = props => {
    const {name, email, photo} = props;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.container}
        onPress={() => selectUser(props)}>
        <View style={styles.avatarContainer}>
          <View>
            <Avatar
              size={56}
              rounded
              source={{
                uri: photo ?? 'https://i.pravatar.cc/150?u=' + Date.now(),
              }}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.text}>{email}</Text>
          </View>
        </View>
        <View>
          <Text>Chat</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const RenderItem = ({item = {displayName: '', email: '', photoURL: ''}}) => {
    const {displayName, email, photoURL} = item;
    return (
      <CardComponent
        name={displayName}
        email={email}
        photo={photoURL}
        {...item}
      />
    );
  };

  return (
    <View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onReresh} />
        }
        data={data}
        keyExtractor={item => item._id}
        renderItem={RenderItem}
        ListEmptyComponent={() => {
          return <EmptyDashboard search />;
        }}
        ListHeaderComponent={() => {
          return <HeaderDashboard />;
        }}
        contentContainerStyle={{flexGrow: 1}}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: widthPercentageToDP(4),
    marginBottom: ms(32),
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    marginLeft: ms(20),
  },
  text: {
    color: 'black',
  },
});
