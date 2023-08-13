import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text, View, Image } from 'react-native';
import { lightMode, darkMode } from './Colors';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

const HomeScreen = ({ navigation }) => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleStartGame = () => {
    navigation.navigate('Game', {
      player1: player1,
      player2: player2,
    });
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)}>
          <MaterialIcons name="dark-mode" size={30} color={darkMode.primary} style={styles.headIcon}/>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="settings-sharp" size={30} color={darkMode.primary} style={styles.headIcon}/>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.gameName}>TIC TAC TOE</Text>
      </View>
      <View style={styles.players}>
        <TextInput
          style={{ ...styles.inputs, borderWidth: 2 }}
          onChangeText={setPlayer1}
          value={player1}
          placeholder="Enter player 1 name"
          placeholderTextColor={isDarkMode ? darkMode.phColor : lightMode.phColor}
          maxLength={10}
        />
        <TextInput
          style={{ ...styles.inputs, borderWidth: 2 }}
          onChangeText={setPlayer2}
          value={player2}
          placeholder="Enter player 2 name"
          placeholderTextColor={isDarkMode ? darkMode.phColor : lightMode.phColor}
          maxLength={10}
        />
      </View>
      <View style={{ ...styles.inputs, backgroundColor: isDarkMode? darkMode.primary : lightMode.primary }}>
        <TouchableOpacity
          title="Start"
          onPress={handleStartGame}
        >
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightMode.bgColor,
    color: lightMode.fgCOlor,
  },
  gameName: {
    fontSize: 24,
    fontWeight: '500',
    color: lightMode.primary
  },
  inputs: {
    height: 60,
    width: 220,
    margin: 5,
    borderRadius: 10,
    borderColor: lightMode.primary,
    color: lightMode.fgCOlor,
    padding: 15,
    fontSize: 20,
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
  header: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row'
  },
  headIcon: {
    width: 30,
    height: 30,
    marginTop: 10,
    marginRight: 10,
  },
});

export default HomeScreen;