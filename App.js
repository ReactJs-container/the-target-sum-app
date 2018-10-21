import React from 'react';
import { 
  Platform, 
  StatusBar,
  View, 
  StyleSheet, 
  Dimensions,
  ImageBackground 
} from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';

import HomeScreen from './screens/HomeScreen'
import AppNavigator from './navigation/AppNavigator'

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/math-logo.png'),
        require("./assets/images/CloudsBackground.png"),
        require("./assets/images/PlayButton.png"),
        require("./assets/images/BackArrow.png"),
        require("./assets/sounds/correct-answer.mp3"),
        require("./assets/sounds/wrong-answer.mp3"),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        //...Icon.Ionicons.font,
        //'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'concert-one': require('./assets/fonts/ConcertOne-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}



let Window = Dimensions.get("window");
let windowWidth = Window.width;
let windowHeight = Window.height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
