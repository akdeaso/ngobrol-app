import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {DB} from '../../helpers/db';
import {fcmUrl, FIREBASE_API_KEY} from '../../helpers/api';
import axios from 'axios';
import {GiftedChat} from 'react-native-gifted-chat';

const Chat = () => {
  const {_user, selectedUser} = useSelector(state => state.user);
  const [user, setUser] = useState({});

  useEffect(() => {
    initialChatData();
  }, [initialChatData]);

  const initialChatData = useCallback(() => {
    try {
      DB.ref(`users/${selectedUser._id}`).on('value', res => {
        const userData = res.val();
        if (userData.chatRoom) {
          setUser(userData);
        } else {
          setUser(prevState => {
            return {...prevState, ...userData, chatRoom: []};
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [selectedUser._id]);

  const onSend = useCallback(
    async (sendedMessage = []) => {
      let isUpdating = true;
      await DB.ref(`users/${_user._id}`).update({
        chatRoom: [
          ...user.chatRoom,
          {
            ...sendedMessage[0],
            idx: user.chatRoom?.length + 1,
          },
        ],
      });

      await DB.ref(`users/${selectedUser._id}`).update({
        chatRoom: [
          ...user.chatRoom,
          {
            ...sendedMessage[0],
            idx: user.chatRoom.length + 1,
          },
        ],
      });

      isUpdating = false;
      if (!isUpdating) {
        const body = {
          to: selectedUser.notifToken,
          notification: {
            body: sendedMessage[0].text,
            title: `New Messages from ${_user.displayName}`,
          },
          data: {
            body: sendedMessage[0].text,
            title: `New Messages from ${_user.displayName}`,
          },
        };
        await axios.post(fcmUrl, body, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'key=' + FIREBASE_API_KEY,
          },
        });
      }
    },
    [
      user.chatRoom,
      _user._id,
      selectedUser._id,
      _user.displayName,
      selectedUser.notifToken,
    ],
  );

  return (
    <GiftedChat
      messages={user.chatRoom}
      onSend={sendedMessage => {
        onSend(sendedMessage);
      }}
      optionTintColor="red"
      user={{
        _id: _user._id,
        name: _user.displayName,
        avatar: user.photoUrl ?? 'https://i.pravatar.cc/150?u=' + Date.now(),
      }}
      // messagesContainerStyle={{backgroundColor: Main.darkIndigo}}
    />
  );
};

export default Chat;

const styles = StyleSheet.create({});
