import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import io from 'socket.io-client';
import {GiftedChat} from 'react-native-gifted-chat';
import JoinScreen from '../JoinScreen';

const CHAT_SERVER = 'https://54e65eb191f9.ngrok.io';

const HomeScreen = props => {
  const [hasJoined, setHasJoined] = useState(false);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(CHAT_SERVER);

    socket.current.on('message', messageRcvd => {
      setReceivedMessages(prevState =>
        GiftedChat.append(prevState, messageRcvd),
      );
      console.log('message recieved', messageRcvd);
    });
  }, []);

  const joinChat = username => {
    socket.current.emit('join', username);
    setHasJoined(true);
  };

  const onSend = msg => {
    console.log(msg);
    socket.current.emit('message', msg[0].text);
    setReceivedMessages(prevState => GiftedChat.append(prevState, msg));
  };

  return (
    <View style={styles.container}>
      {hasJoined ? (
        <GiftedChat
          renderUsernameOnMessage
          messages={receivedMessages}
          onSend={msg => onSend(msg)}
          user={{
            _id: 1,
          }}
        />
      ) : (
        <JoinScreen joinChat={joinChat} />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
