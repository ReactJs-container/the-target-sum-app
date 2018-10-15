import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';

export default class RandomNumber extends Component {

  handleClick = () => {
    if (this.props.clickable) {
      this.props.onClick(this.props.id);
    }
  };

  render() {
    return (
      <div
        className="number"
        style={{ opacity: this.props.clickable ? 1 : 0.3 }}
        onClick={this.handleClick}
      >
        {this.props.value}
      </div>
    );
  }
  


  handlePress = () => {
    if (this.props.isDisabled) { return; }
    this.props.onPress(this.props.id);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
          <View onPress={this.handlePress} style={styles.buttonContainer}>
            <Text style={[styles.textStyle, this.props.isDisabled && styles.disabled]}>{this.props.number}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    // backgroundColor: '#2E9298',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 35,
    color: '#aaa'
  },
  disabled: {
    opacity: 0.7
  }
});