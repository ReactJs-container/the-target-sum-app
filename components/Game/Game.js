import React, { Component } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';
import CountdownCircle from '../countdownCircle'
import Timer from '../Timekeeper';
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
          const NEWRemainingSeconds = prevState.remainingSeconds - 1;
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
console.log('selectedIds', this.challengeNumbers[this.state.selectedIds])
    return (
      <View style={styles.container}>
        <View style={ styles.targetContainer }>
          <Text style={[ styles.target, styles[ `STATUS_${gameStatus}` ] ]}>
              {gameStatus === 'NEW' ? '?' : this.target}
            </Text>
            {
              (gameStatus !== 'NEW') && (
               /*  <CountdownCircle
                  seconds={remainingSeconds}
                  radius={30}
                  borderWidth={16}
                  color={(gameStatus === 'LOST') ? "#ff003f" : "#41ee70"}
                  bgColor="#fff"
                  stop = {(gameStatus === 'LOST') ? "LOST" : "WON"}
                  textStyle={{ fontSize: 20 }}
                  onTimeElapsed={() => console.log('Elapsed!')}
                /> */
                <Timer
                  beat={(gameStatus === 'LOST') ? false : true}
                  seconds={15}
                  radius={30}
                  borderWidth={6}
                  color="#C52957"
                  bgColor="#DE537C"
                  bgColorSecondary="#E495AC"
                  bgColorThirt="#EFD6DE"
                  shadowColor="#DE537C"
                  textStyle={{ fontSize: 20, color: '#FFF', }}
                  subTextStyle={{ fontSize: 12, color: '#FFF', }}
                  onTimeElapsed={() => {console.log('Time elapsed')} }
                  isPausable={true}
                  onPause={() => console.log('Pause')}
                  onResume={() => console.log('Resume')}
                  minScale={0.9}
                  maxScale={1.2}
                />
              )
            }

        </View>
        <View style={{flexDirection: 'row', height: 60, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.selectedNumber} ><Text style={styles.title}> ? </Text></View>
          <View style={{width: 30, height: 50, justifyContent: 'center', alignItems: 'center'}}><Text> + </Text></View>
          <View style={styles.selectedNumber} > <Text style={styles.title}> ? </Text></View>
          <View style={{width: 30, height: 50, justifyContent: 'center', alignItems: 'center'}}><Text> + </Text></View>
          <View style={styles.selectedNumber} ><Text style={styles.title}> ? </Text></View>
          <View style={{width: 30, height: 50, justifyContent: 'center', alignItems: 'center'}}><Text> = </Text></View>
        </View>
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
        <View style={styles.buttonsWrapper}>
            {(gameStatus === 'NEW') && (
                        <TouchableOpacity onPress={this.startGame}>
                        <View style={styles.buttonContainer}>
                          <Text style={styles.textStyle}>START GAME</Text>
                        </View>
                        </TouchableOpacity>
            )}
            {(gameStatus === 'LOST' || gameStatus === 'WON') && (
              <TouchableOpacity onPress={this.props.onPlayAgain}>
              <View style={styles.buttonContainer}>
                <Text style={styles.textStyle}>PLAY AGAIN</Text>
              </View>
              </TouchableOpacity>
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
  buttonsWrapper:{
    flex: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%', 
  },
  buttonContainer: {
    marginHorizontal: 0,
    backgroundColor: '#F64A81',
    padding: 10,
    height: 100, 
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 25,
    color: '#FFFFFF'
  },

  button: {
    backgroundColor: "#FFDBA6",
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 15
  },
  selectedNumber: {
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#666666',
    borderStyle: "dashed",
    width: 50, 
    height: 50
  },
  title: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 'bold',
  },
  targetContainer:{
    height: 100,
    borderRadius: 5,
    margin: 50,
    marginLeft: 15,
    marginRight: 15,
  },
  target: {
    fontSize: 80,
    textAlign: 'center',
    height: 100,
  },
  randomContainer: {
    flex:1,
    //backgroundColor: '#3369FC',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 30
  },
  STATUS_NEW: {
    // backgroundColor: '#aaa'
    color: '#aaa'
  },
  STATUS_PLAYING: {
    //backgroundColor: '#aaa'
    color: '#aaa'
  },
  STATUS_WON: {
    //backgroundColor: "#41ee70"
    color: "#41ee70"
    
  },
  STATUS_LOST: {
    //backgroundColor: 'red'
    color: 'red'
  },

});

export default Game;