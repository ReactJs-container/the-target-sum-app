import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, Button } from 'react-native';
import PropTypes from 'prop-types';

class LevelScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Level Screen</Text>
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
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

LevelScreen.propTypes = {

};


export default LevelScreen;