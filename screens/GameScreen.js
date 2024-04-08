import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Title from '../components/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/PrimaryButton';
import Card from '../components/Card';

import InstructionText from '../components/InstructionText';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);

  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      return Alert.alert('Don`t lie!', 'You know this is wrong', [
        { text: 'Sorry!', style: 'canel' },
      ]);
    }
    // 'lower' || 'greater'
    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
  }

  const guessRoundsListLength = guessRounds.length;

  let content = (
    <>
      <Card>
        <View style={styles.btnsContainer}></View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        
        <View style={styles.btnsContainerWide}>
          <View style={styles.btnContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.btnContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            >
              {itemData.item}
            </GuessLogItem>
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 48,
    alignItems: 'center',
  },
  instructionText: {
    marginBottom: 12,
  },
  btnsContainer: {
    flexDirection: 'row',
  },
  btnContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  btnsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
