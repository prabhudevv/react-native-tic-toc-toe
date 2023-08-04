// import React, { useEffect, useState } from 'react';
// import Modal from "react-native-modal";
// import { SafeAreaView, StyleSheet, TouchableOpacity, Text, View, Image, FlatList } from 'react-native';

// const GameScreen = ({ route, navigation }) => {
//   const { player1, player2 } = route.params;
//   const [player1Turn, setPlayer1Turn] = useState(true);
//   const [playerOneMoves, setPlayerOneMoves] = useState([]);
//   const [playerTwoMoves, setPlayerTwoMoves] = useState([]);
//   const [turns, setTurns] = useState(0);
//   const [winner, setWinner] = useState("");
//   const [cellData, setCellData] = useState([]);
//   const [playerOneWinCount, setPlayerOneWinCount] = useState(0);
//   const [playerTwoWinCount, setPlayerTwoWinCount] = useState(0);
//   const [drawCount, setDrawCount] = useState(0);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const possibility1 = ["1", "2", "3"],
//     possibility2 = ["4", "5", "6"],
//     possibility3 = ["7", "8", "9"],
//     possibility4 = ["1", "4", "7"],
//     possibility5 = ["2", "5", "8"],
//     possibility6 = ["3", "6", "9"],
//     possibility7 = ["1", "5", "9"],
//     possibility8 = ["3", "5", "7"];

//   const initialData = [
//     { id: '1', value: '1', isDisabled: false, checkedBy: "" },
//     { id: '2', value: '2', isDisabled: false, checkedBy: "" },
//     { id: '3', value: '3', isDisabled: false, checkedBy: "" },
//     { id: '4', value: '4', isDisabled: false, checkedBy: "" },
//     { id: '5', value: '5', isDisabled: false, checkedBy: "" },
//     { id: '6', value: '6', isDisabled: false, checkedBy: "" },
//     { id: '7', value: '7', isDisabled: false, checkedBy: "" },
//     { id: '8', value: '8', isDisabled: false, checkedBy: "" },
//     { id: '9', value: '9', isDisabled: false, checkedBy: "" },
//   ];

//   useEffect(() => {
//     setCellData(initialData);
//   }, []);

//   useEffect(() => {
//     checkWinner();
//   }, [playerOneMoves, playerTwoMoves]);

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//     onClear();
//   };

//   const Cell = ({ onPress, value, isDis, checkedByVal }) => {
//     return (
//       <TouchableOpacity style={[styles.cell, (isDis) ? styles.checked : styles.unchecked]} onPress={onPress} disabled={isDis}>
//         {isDis ?
//           (checkedByVal === 'Player1' ? <Image source={require('../assets/images/cross.png')} style={styles.cross} />
//             : <Image source={require('../assets/images/x.png')} style={styles.cross} />)
//           : null}
//       </TouchableOpacity>
//     );
//   };

//   const ModelScreen = () => (
//     <Modal isVisible={isModalVisible}>
//       <View style={styles.modal}>
//         <TouchableOpacity style={styles.clear} onPress={toggleModal}>
//           <Text>Restart</Text>
//         </TouchableOpacity>
//       </View>
//     </Modal>
//   )

//   const handleCellPress = (item) => {
//     if (item.isDisabled) {
//       return;
//     }
//     item.isDisabled = true;
//     item.checkedBy = player1Turn ? 'Player1' : 'Player2';
//     setPlayer1Turn(!player1Turn);
//     setTurns(turns + 1);
//     if (player1Turn) {
//       setPlayerOneMoves([...playerOneMoves, item.value]);
//     } else {
//       setPlayerTwoMoves([...playerTwoMoves, item.value]);
//     }
//   };

//   const onClear = () => {
//     setPlayerOneMoves([]);
//     setPlayerTwoMoves([]);
//     setPlayer1Turn(true);
//     setTurns(0);
//     setWinner("");
//     setCellData(initialData);
//   }

//   const renderCell = ({ item }) => (
//     <Cell value={item.value} isDis={item.isDisabled} checkedByVal={item.checkedBy} onPress={() => handleCellPress(item)} />
//   );

//   const checkWinner = () => {
//     const possibilities = [
//       possibility1,
//       possibility2,
//       possibility3,
//       possibility4,
//       possibility5,
//       possibility6,
//       possibility7,
//       possibility8,
//     ];

//     for (const possibility of possibilities) {
//       if (isSubset(playerOneMoves.sort(), possibility)) {
//         setWinner(player1);
//         setPlayerOneWinCount((prevCount) => prevCount + 1);
//         setModalVisible(true);
//         return;
//       } else if (isSubset(playerTwoMoves.sort(), possibility)) {
//         setWinner(player2);
//         setPlayerTwoWinCount((prevCount) => prevCount + 1);
//         setModalVisible(true);
//         return;
//       } else {
//         if (turns === 9) {
//           setWinner("Draw");
//           setDrawCount(drawCount + 1);
//           setModalVisible(true);
//         }
//       }
//     }
//   }

//   const isSubset = (arr1, arr2) => {
//     for (var i = 0; i < arr2.length; i++) {
//       if (arr1.indexOf(arr2[i]) == -1) {
//         return false;
//       }
//     }
//     return true;
//   }

//   return (
//     <SafeAreaView style={styles.main}>
//       <Text>{winner}</Text>
//       <View style={styles.nameSection}>
//         <View style={styles.leftSection}>
//           <Text>Player1: {player1} {playerOneWinCount}</Text>
//         </View>
//         <View style={styles.rightSection}>
//           <Text>Draw: {drawCount}</Text>
//         </View>
//         <View style={styles.rightSection}>
//           <Text>Player2: {player2} {playerTwoWinCount}</Text>
//         </View>
//       </View>
//       <View style={styles.turn}>
//         <Text>{player1Turn ? player1 : player2}'s turn</Text>
//       </View>
//       <View style={styles.boxContainer}>
//         <FlatList
//           data={cellData}
//           numColumns={3}
//           renderItem={renderCell}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={styles.gridContainer}
//         />
//       </View>
//       <TouchableOpacity style={styles.clear} onPress={onClear}>
//         <Text>Restart</Text>
//       </TouchableOpacity>
//       <ModelScreen isVisible={isModalVisible} onRestart={onClear} />
//     </SafeAreaView>
//   );  
// };

// const styles = StyleSheet.create({
//   main: {
//     justifyContent: 'center',
//     flex: 1,
//     backgroundColor: 'red'
//   },
//   nameSection: {
//     flexDirection: 'row',
//     paddingRight: 20,
//     paddingLeft: 20,
//   },
//   rightSection: {
//     flex: 1,
//     alignItems: 'flex-end'
//   },
//   turn: {
//     alignItems: 'center',
//     alignSelf: 'center',
//     padding: 10,
//   },
//   gridContainer: {
//     alignItems: 'center',
//   },
//   cell: {
//     width: 120,
//     height: 120,
//     margin: 2,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'lightgray',
//   },
//   cellText: {
//     fontSize: 24,
//   },
//   cross: {
//     height: 100,
//     width: 100
//   },
//   modal: {
//     backgroundColor: 'white',
//     height: 300,
//     textAlign: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 30
//   }
// });

// export default GameScreen;

import React, { useEffect, useState } from 'react';
import Modal from "react-native-modal";
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, View, Image, FlatList } from 'react-native';

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
        {isDis ? (checkedByVal === 'Player1' ? <Image source={require('../assets/images/cross.png')} style={styles.cross} /> : <Image source={require('../assets/images/x.png')} style={styles.cross} />) : null}
      </TouchableOpacity>
    );
  };

  const ModelScreen = () => (
    <Modal isVisible={isModalVisible}>
      <View style={styles.modal}>
        <Text>{winner}</Text>
        <TouchableOpacity style={styles.clear} onPress={toggleModal}>
          <Text>Restart</Text>
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
    <SafeAreaView style={styles.main}>
      <View style={styles.nameSection}>
        <View style={styles.leftSection}>
          <Text>Player1: {player1} {playerOneWinCount}</Text>
        </View>
        <View style={styles.rightSection}>
          <Text>Draw: {drawCount}</Text>
        </View>
        <View style={styles.rightSection}>
          <Text>Player2: {player2} {playerTwoWinCount}</Text>
        </View>
      </View>
      <View style={styles.turn}>
        <Text>{player1Turn ? player1 : player2}'s turn</Text>
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
      <TouchableOpacity style={styles.clear} onPress={onClear}>
        <Text>Restart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={mainMenu}>
        <Text>Main Menu</Text>
      </TouchableOpacity>
      <ModelScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'red'
  },
  nameSection: {
    flexDirection: 'row',
    paddingRight: 20,
    paddingLeft: 20,
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end'
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
    backgroundColor: 'lightgray',
  },
  cellText: {
    fontSize: 24,
  },
  cross: {
    height: 100,
    width: 100
  },
  modal: {
    backgroundColor: 'white',
    height: 300,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30
  }
});

export default GameScreen;
