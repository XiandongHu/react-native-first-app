/**
 * @flow
 */

'use strict';

var React = require('React');
var View = require('View');
var Image = require('Image');
var StyleSheet = require('StyleSheet');
var Navigator = require('Navigator');

var CMColors = require('../common/CMColors');
var { Text } = require('../common/CMText');
var CMButton = require('../common/CMButton');
var LoginButton = require('./LoginButton');

class LoginModal extends React.Component {
  props: {
    navigator: Navigator;
    onLogin?: () => void;
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.content}
          source={require('./img/login-background.png')}>
          <Text style={styles.h1}>
            Log in with Facebook
          </Text>
          <Text style={styles.h2}>
            to save sessions to{'\n'}your schedule.
          </Text>
          <LoginButton onPress={null} />
          <CMButton
            type="secondary"
            caption="Not Now"
            onPress={() => this.props.navigator.pop()}
          />
        </Image>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  content: {
    // Image's source contains explicit size, but we want
    // it to prefer flex: 1
    width: undefined,
    height: undefined,
    padding: 30,
    borderRadius: 3,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  h1: {
    marginTop: 130,
    color: CMColors.darkText,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  h2: {
    marginBottom: 120,
    color: CMColors.darkText,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 22,
  },
});

module.exports = LoginModal;
