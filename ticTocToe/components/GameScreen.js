import React, { useEffect, useState } from 'react';
import Modal from "react-native-modal";
import { StyleSheet, TouchableOpacity, Text, View, Image, FlatList, Vibration } from 'react-native';
import { lightMode, darkMode } from './Colors';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

const GameScreen = ({ route, navigation }) => {
  const { player1, player2 } = route.params;
  const [player1Turn, setPlayer1Turn] = useState(true);
  const [playerOneMoves, setPlayerOneMoves] = useState([]);
  const [playerTwoMoves, setPlayerTwoMoves] = useState([]);
  const [turns, setTurns] = useState(0);
  const [winner, setWinner] = useState("");
  const [cellData, setCellData] = useState([]);
  const [playerOneWinCount, setPlayerOneWinCount] = useState(0);
  const [playerTwoWinCount, setPlayerTwoWinCount] = useState(0);
  const [drawCount, setDrawCount] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  const possibilities = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    ["1", "5", "9"],
    ["3", "5", "7"],
  ];

  useEffect(() => {
    setCellData(Array.from({ length: 9 }, (_, index) => ({ id: String(index + 1), value: String(index + 1), isDisabled: false, checkedBy: "" })));
  }, []);

  useEffect(() => {
    checkWinner();
  }, [playerOneMoves, playerTwoMoves]);

  const toggleModal = () => {
    onClear();
    setModalVisible(!isModalVisible);
  };

  const Cell = ({ onPress, value, isDis, checkedByVal }) => {
    return (
      <TouchableOpacity style={[styles.cell, isDis && styles.checked]} onPress={onPress} disabled={isDis}>
        {isDis ? (checkedByVal === 'Player1' ? (<Text style={styles.cross}>X</Text>) : <Text style={styles.cross}>O</Text>) : null}
        {/* {isDis ? (checkedByVal === 'Player1' ? <Image source={require('../assets/images/cross.png')} style={styles.cross} /> : <Image source={require('../assets/images/x.png')} style={styles.cross} />) : null} */}
      </TouchableOpacity>
    );
  };

  const ModelScreen = () => (
    <Modal isVisible={isModalVisible}>
      <View style={styles.modal}>
        <Text style={styles.modalText}>{winner} wins</Text>
        <TouchableOpacity style={styles.clear} onPress={toggleModal}>
          <Text style={styles.modalText}>Back</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  const handleCellPress = (item) => {
    if (item.isDisabled) {
      return;
    }
    item.isDisabled = true;
    item.checkedBy = player1Turn ? 'Player1' : 'Player2';
    setPlayer1Turn(!player1Turn);
    setTurns(turns + 1);
    if (player1Turn) {
      setPlayerOneMoves([...playerOneMoves, item.value]);
    } else {
      setPlayerTwoMoves([...playerTwoMoves, item.value]);
    }
  };

  const mainMenu = () => {
    navigation.navigate('Home');
  };

  const onClear = () => {
    setPlayerOneMoves([]);
    setPlayerTwoMoves([]);
    setPlayer1Turn(true);
    setTurns(0);
    setWinner("");
    setCellData(Array.from({ length: 9 }, (_, index) => ({ id: String(index + 1), value: String(index + 1), isDisabled: false, checkedBy: "" })));
  };

  const renderCell = ({ item }) => (
    <Cell value={item.value} isDis={item.isDisabled} checkedByVal={item.checkedBy} onPress={() => handleCellPress(item)} />
  );

  const checkWinner = () => {
    for (const possibility of possibilities) {
      if (isSubset(playerOneMoves.sort(), possibility)) {
        setWinner(player1);
        setPlayerOneWinCount((prevCount) => prevCount + 1);
        setModalVisible(true);
        return;
      } else if (isSubset(playerTwoMoves.sort(), possibility)) {
        setWinner(player2);
        setPlayerTwoWinCount((prevCount) => prevCount + 1);
        setModalVisible(true);
        return;
      }
    }

    if (turns === 9) {
      setWinner("Draw");
      setDrawCount((prevCount) => prevCount + 1);
      setModalVisible(true);
    }
  };

  const isSubset = (arr1, arr2) => {
    for (const val of arr2) {
      if (!arr1.includes(val)) {
        return false;
      }
    }
    return true;
  };

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={mainMenu}>
          <Ionicons name="home" size={30} color={darkMode.primary} style={styles.headIcon}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClear}>
          <MaterialIcons name="restart-alt" size={30} color={darkMode.primary} style={styles.headIcon}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClear}>
          <MaterialIcons name="dark-mode" size={30} color={darkMode.primary} style={styles.headIcon}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClear}>
          <Ionicons name="settings-sharp" size={30} color={darkMode.primary} style={styles.headIcon}/>
        </TouchableOpacity>
      </View>
      <View style={styles.nameSection}>
        <Text style={styles.playerName}>{player1Turn ? player1 : player2}'s turn</Text>
      </View>
      <View style={styles.boxContainer}>
        <FlatList
          data={cellData}
          numColumns={3}
          renderItem={renderCell}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.gridContainer}
        />
      </View>
      <View style={styles.scoreSection}>
        <View style={styles.scoreSubSection}>
          <Text style={styles.playerName}>{player1}</Text>
          <Text style={styles.playerScore}>{playerOneWinCount}</Text>
        </View>
        <View style={styles.scoreSubSection}>
          <Text style={styles.playerName}>Draw</Text>
          <Text style={styles.playerScore}>{drawCount}</Text>
        </View>
        <View style={styles.scoreSubSection}>
          <Text style={styles.playerName}>{player2}</Text>
          <Text style={styles.playerScore}>{playerTwoWinCount}</Text>
        </View>
      </View>
      <ModelScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: lightMode.bgColor,
  },
  header: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row'
  },
  headerIcon: {
    margin: 10,
    width: 30,
    height: 30
  },
  nameSection: {
    flexDirection: 'row',
    paddingRight: 20,
    paddingLeft: 20,
    alignSelf: 'center',
    padding: 10,
    margin: 15,
    borderRadius: 15,
  },
  scoreSection: {
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center'
  },
  scoreSubSection: {
    alignItems: 'center',
    width: 125,
  },
  drawSection: {
    alignItems: 'center'
  },
  playerName: {
    fontSize: 22,
    color: lightMode.primary,
  },
  playerScore: {
    fontSize: 40,
    color: lightMode.primary,
  },
  turn: {
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
  },
  gridContainer: {
    alignItems: 'center',
  },
  cell: {
    width: 120,
    height: 120,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightMode.primary
  },
  cellText: {
    fontSize: 24,
  },
  cross: {
    color: lightMode.bgColor,
    fontSize: 80
  },
  modal: {
    height: 300,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: lightMode.bgColor,
    color: lightMode.fgCOlor
  },
  modalText: {
    color: lightMode.fgCOlor,
    fontSize: 22
  },
  headIcon: {
    width: 30,
    height: 30,
    marginTop: 10,
    marginLeft: 10,
  },
});

export default GameScreen;
