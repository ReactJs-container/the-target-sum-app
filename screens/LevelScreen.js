import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Button, 
  ImageBackground, 
  Image, 
  Platform, } from 'react-native';

class LevelScreen extends Component {
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
        <Button
          title="Easy"
          onPress={() => {
            this.props.navigation.navigate('Home', {
              answerSize: 2,
            });
          }}
        />
        <Button
          title="Medium"
          onPress={() => {
            this.props.navigation.navigate('Home', {
              answerSize: 3,
            });
          }}
        />
        <Button
        title="Hard"
        onPress={() => {
          this.props.navigation.navigate('Home', {
            answerSize: 4,
          });
        }}
      />
        </View>

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

export default LevelScreen;