import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Button,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

const JoinScreen = ({joinChat}) => {
  const [username, setUsername] = useState(null);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/chat-icon.png')}
        style={{height: 100, width: 100}}
      />
      <View style={{justifyContent: 'space-around'}}>
        <TextInput
          value={username}
          onChangeText={value => setUsername(value)}
          placeholder="Enter username"
          style={{fontSize: 30, textAlign: 'center'}}
        />
        <Button title="Join chat" onPress={() => joinChat(username)} />
      </View>
    </View>
  );
};

export default JoinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
