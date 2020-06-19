import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import io from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';

const CHAT_SERVER = "https://df1e5f9f70da.ngrok.io"


const HomeScreen = props => {
  const messages = [
    {
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
      user: {
        _id: 1,
        name: 'React Native',
        avatar: 'https://www.placecage.com/50/50',
      },
    },
    {
      _id: 2,
      text: 'Hello ',
      createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://www.placecage.com/50/50',
      },
    },
  ];
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState(messages);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(CHAT_SERVER);

    socket.current.on('message-sent', messageRcvd => {
      // setReceivedMessages(prevState => [...prevState, messageRcvd]);
      setReceivedMessages(prevState =>
        GiftedChat.append(...prevState, messageRcvd),
      );
      console.log('message recieved', messageRcvd);
    });
  }, []);
  console.log('chat::', receivedMessages);

  const onSend = msg => {
    console.log(msg);
    socket.current.emit('message-sent', msg[0].text);
    setReceivedMessages(prevState => GiftedChat.append(prevState, msg)),

      setMessage('');
  };

  // const messagesList = receivedMessages.map(msg => (
  //   <Text key={Math.random()}>{msg}</Text>
  // ));
  return (
    <View style={styles.container}>
      {/* <View>
        <Text>{messages}</Text>
      </View>
      <TextInput
        value={message}
        placeholder={'enter text'}
        onChangeText={value => setMessage(value)}
        onSubmitEditing={sendMessage}
      /> 
      */}
      <GiftedChat
        messages={receivedMessages}
        onSend={msg => onSend(msg)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
