/**
 * @flow
 */

'use strict';

const React = require('react');
const { StyleSheet } = require('react-native');

const CMButton = require('../common/CMButton');

class LoginButton extends React.Component {
  props: {
    style?: any;
    onPress: () => void;
  };

  render() {
    return (
      <CMButton
        style={[styles.button, this.props.style]}
        icon={require('../login/img/f-logo.png')}
        caption="Log in"
        onPress={this.props.onPress}
      />
    );
  }
}

var styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    width: 270,
  },
});

module.exports = LoginButton;
