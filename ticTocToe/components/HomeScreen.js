import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const handleStartGame = () => {
    navigation.navigate('Game', {
      player1: player1,
      player2: player2,
    });
  };

  return (
    <SafeAreaView style={styles.main}>
      <TextInput
        style={styles.input}
        onChangeText={setPlayer1}
        value={player1}
        placeholder="Player 1"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPlayer2}
        value={player2}
        placeholder="Player 2"
      />
      <TouchableOpacity style={styles.button} onPress={handleStartGame}>
        <Text>Start</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

export default HomeScreen;