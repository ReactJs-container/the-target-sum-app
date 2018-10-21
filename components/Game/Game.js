import React, { Component } from 'react';
import { 
  View, 
  StyleSheet, 
  Button, 
  Text, 
  TouchableOpacity, 
  Modal,  
  Alert } from 'react-native';
  import { Font } from 'expo';
  import { Ionicons } from '@expo/vector-icons'

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
    modalVisible: false,
  };

  challengeNumbers = Array.from({
    length: this.props.challengeSize,
  }).map(() =>
    randomNumberBetween(...this.props.challengeRange)
  );

  sampleSize =  _.sampleSize(this.challengeNumbers, this.props.answerSize)
  
  target = _.sum(this.sampleSize);
  async componentDidMount() {
    if (this.props.autoPlay) {
      this.startGame();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.gameStatus !== this.state.gameStatus && this.state.gameStatus !== 'PLAYING') {
      this.setModalVisible(true);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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

  setModalVisible = (visible) =>{
    this.setState({modalVisible: visible});
  }

  selectedAnswer = ()=> {
    const { gameStatus, selectedIds} = this.state;
    let answer = []
    const sumSelected = selectedIds.reduce(
      (acc, curr) => acc + this.challengeNumbers[ curr ],
      0
    );
    for (let i = 0; i < this.props.answerSize; i+=1) { 
      answer.push(
        <React.Fragment key={`number_${i}`}>
          <View style={styles.selectedNumber}>
            <Text style={styles.title}> {gameStatus === 'NEW' ? '?' : this.challengeNumbers[selectedIds[i]]} </Text>
          </View>
          <View style={{width: 30, height: 50, justifyContent: 'center', alignItems: 'center'}}>
          <Text> {(this.props.answerSize -1  === i) ? '=' : '+'} </Text></View>
          {
            (this.props.answerSize -1  === i) && (
              <View style={styles.selectedNumber}>
              <Text style={styles.title}> {(this.props.answerSize  === selectedIds.length) ? sumSelected : '?'} </Text>
            </View>
            )
          }
        </React.Fragment>
      )      
    }

    return answer
  }

  render() {
    const { gameStatus, remainingSeconds, selectedIds} = this.state;

    console.log(this.sampleSize)

    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          >
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
            <View style={{height: 32, width:32, position: 'absolute', top: -7, right:0}} >
                <TouchableOpacity onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Ionicons name="ios-close-circle" size={32} color="red" />
                </TouchableOpacity>
              </View>
              <View style={{height: 50, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{ fontFamily: 'concert-one', fontSize: 16 }}>{gameStatus}</Text>
              </View>
    
            </View>
          </View>
        </Modal>
      <View style={styles.row}>
        <View style={[styles.targetContainer, styles[ `STATUS_${gameStatus}` ]]}>
            <Text style={styles.target}>
              {gameStatus === 'NEW' ? '?' : this.target}
            </Text>
          </View>
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
            {(gameStatus === 'PLAYING') && (
                <View style={styles.row}>
                  <Timer
                  beat={(remainingSeconds <= 5 && remainingSeconds > 0 ) ? true : false}
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
                  isPausable={false}
                  onPause={() => console.log('Pause')}
                  onResume={() => console.log('Resume')}
                  minScale={0.9}
                  maxScale={1.2}
                />
              </View>
            )}
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
  row: {flexDirection: 'row', 
  height: 150, 
  justifyContent: 'center', 
  alignItems: 'center'
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center'
  },
  buttonsWrapper:{
    flex: 1,
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  buttonContainer: {
    marginHorizontal: 0,
    backgroundColor: '#F64A81',
    padding: 10,
    width: 200,
    height: 60, 
    borderRadius: 30,
    borderWidth: 5,
    borderColor: '#EFD6DE',
    borderStyle: 'solid',
  },
  textStyle: {
    fontFamily: 'concert-one',
    textAlign: 'center',
    fontSize: 25,
    color: '#FFFFFF'
  },
  modalContainer:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    padding:20,
    width: 300,
    height: 300,
    borderRadius: 15,
    shadowColor: '#aaa',
    shadowOffset: {
       width: 0,
       height: 1
     },
    shadowRadius: 1,
     shadowOpacity: 0.75
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
  target: {
    fontSize: 70,
    textAlign: 'center',
    height: 100,
    color: '#aaa'
  },
  targetContainer: {
    width: 120,
    height:120,
    marginHorizontal: 15,
    marginVertical: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 75,
    shadowColor: '#aaa',
   shadowOffset: {
      width: 0,
      height: 1
    },
   shadowRadius: 1,
    shadowOpacity: 0.75
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
    backgroundColor: '#fff'
    //color: '#aaa'
  },
  STATUS_PLAYING: {
    backgroundColor: '#fff'
    //color: '#aaa'
  },
  STATUS_WON: {
    backgroundColor: "#41ee70"
    //color: "#41ee70"
    
  },
  STATUS_LOST: {
    backgroundColor: '#DE537C'
    //color: 'red'
  },

});

export default Game;