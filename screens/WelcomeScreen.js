import React, { Component } from "react";
import ReactNative from "react-native";

let playButton = require("../assets/images/PlayButton.png");

const {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  ImageBackground,
  Image,
  Platform,
  Dimensions,
  Animated
} = ReactNative;


class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const justClouds = require("../assets/images/CloudsBackground.png");
    const mathLogo = require('../assets/images/math-logo.png');
    
    return (
      <ImageBackground source={justClouds} style={styles.MainContainer}>
        <View style={styles.logoContainer}>
          <Image source={mathLogo} style={styles.logoImage} />
        </View>
        <View style={styles.contentContainer}> 
          <TouchableOpacity  onPress={() => this.props.navigation.navigate('Home') }>
            <Image style={styles.playButton} source={playButton} />
        </TouchableOpacity>
        </View>

    </ImageBackground>
    );
  }
}


let styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0,
    
  },
  contentContainer: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
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
  playButton: {
    alignItems: 'center',
    width: 130,
    height: 150,
  },
});

module.exports = WelcomeScreen;