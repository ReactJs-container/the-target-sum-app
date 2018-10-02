import React, { Component } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';
import _ from 'lodash';

const randomNumberBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

class Game extends Component {

  static propTypes = {
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired
  };

  state = {
    gameStatus: 'NEW',
    remainingSeconds: this.props.initialSeconds,
    selectedIds: [],
  };

  challengeNumbers = Array.from({
    length: this.props.challengeSize,
  }).map(() =>
    randomNumberBetween(...this.props.challengeRange)
  );

  target = _.sum(
    _.sampleSize(this.challengeNumbers, this.props.answerSize)
  );

  componentDidMount() {
    if (this.props.autoPlay) {
      this.startGame();
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  isNumberSelected = (numberIndex) => this.state.selectedIds.indexOf(numberIndex) >= 0;

  startGame = () => {
    this.setState({ gameStatus: 'PLAYING' }, () => {
      this.intervalId = setInterval(() => {
        this.setState(prevState => {
          const NEWRemainingSeconds =
            prevState.remainingSeconds - 1;
          if (NEWRemainingSeconds === 0) {
            clearInterval(this.intervalId);
            return { gameStatus: 'LOST', remainingSeconds: 0 };
          }
          return { remainingSeconds: NEWRemainingSeconds };
        });
      }, 1000);
    });
  };

  selectedNumber = numberIndex => {
    this.setState(
      prevState => {
        if (prevState.gameStatus !== 'PLAYING') {
          return null;
        }
        const NEWSelectedIds = [ ...prevState.selectedIds, numberIndex ];
        return {
          selectedIds: NEWSelectedIds,
          gameStatus: this.calcGameStatus(NEWSelectedIds),
        };
      },
      () => {
        if (this.state.gameStatus !== 'PLAYING') {
          clearInterval(this.intervalId);
        }
      }
    );
  };
  calcGameStatus = NEWSelectedIds => {
    const sumSelected = NEWSelectedIds.reduce(
      (acc, curr) => acc + this.challengeNumbers[ curr ],
      0
    );
    if (NEWSelectedIds.length !== this.props.answerSize) {
      return 'PLAYING';
    }
    return sumSelected === this.target ? 'WON' : 'LOST';
  };

  render() {
    const { gameStatus, remainingSeconds } = this.state;

    return (
      <View style={styles.container}>
        <Text style={[ styles.target, styles[ `STATUS_${gameStatus}` ] ]}>
          {gameStatus === 'NEW' ? '?' : this.target}
        </Text>

        <View style={styles.randomContainer}>
          {this.challengeNumbers.map((randomNum, i) =>
            <RandomNumber
              key={i}
              id={i}
              number={gameStatus === 'NEW' ? '?' : randomNum}
              isDisabled={this.isNumberSelected(i) || gameStatus !== 'PLAYING'}
              onPress={this.selectedNumber}/>
          )}
        </View>
        <View style={styles.buttonContainer}>
        {(gameStatus === 'NEW') ? (
            <Button title="Start Game" style={{
              backgroundColor: "rgba(92, 99,216, 1)",
              width: 300,
              height: 45,
              borderColor: "#eee",
              borderWidth: 1,
              borderRadius: 5
            }} onPress={this.startGame}/>
        ) : (
          <Text>{remainingSeconds} seconds</Text>
        )}
        {(gameStatus === 'LOST' || gameStatus === 'WON') && (

            <Button title="Play Again" style={{backgroundColor: "rgba(92, 99,216, 2)",
              width: 300,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5}} onPress={this.props.onPlayAgain}/>

        )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FFDBA6",
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  },
  target: {
    fontSize: 50,
    margin: 50,
    textAlign: 'center'
  },
  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  STATUS_NEW: {
    backgroundColor: '#aaa'
  },
  STATUS_PLAYING: {
    backgroundColor: '#aaa'
  },
  STATUS_WON: {
    backgroundColor: "#41ee70"
  },
  STATUS_LOST: {
    backgroundColor: 'red'
  },

});

export default Game;