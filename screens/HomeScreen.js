import React from 'react';
import {
  Image,
  Platform,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Game from '../components/Game/Game';

export default class HomeScreen extends React.Component {

  state = {
    gameId: 1
  };

  resetGame = () => {
    this.setState((prevState) => {
      return { gameId: prevState.gameId + 1 };
    });
  };

  render() {
    const justClouds = require("../assets/images/CloudsBackground.png");
    const backArrow = require("../assets/images/BackArrow.png");
    const mathLogo = require("../assets/images/math-logo.png");
    return (
      <ImageBackground source={justClouds} style={styles.MainContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.gobackContainer}> 
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('Welcome') }>
              <Image style={styles.backArrow} source={backArrow} />
            </TouchableOpacity>
          </View>
          <View style={styles.logoContainer}>
            <Image source={mathLogo} style={styles.logoImage} />
          </View>
            <Game
              key={this.state.gameId}
              autoPlay={this.state.gameId > 1}
              challengeRange={[ 2, 9 ]}
              challengeSize={6}
              answerSize={4}
              initialSeconds={15}
              onPlayAgain={this.resetGame}
            />
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  logoImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  gobackContainer: {
    position: 'absolute',
    top: 15,
    left: 10,
  },
  backArrow:{
    width: 40,
    height: 40,
  }
});
