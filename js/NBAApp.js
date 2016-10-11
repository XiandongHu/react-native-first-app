/**
 * @flow
 */

'use strict';

import {
  View,
  StatusBar,
  StyleSheet
} from 'react-native';

var React = require('React');
var AppState = require('AppState');
var { connect } = require('react-redux');

var LoginScreen = require('./login/LoginScreen');
var NBANavigator = require('./NBANavigator');

var {
  loadAbout,
  loadAllPlayers,
} = require('./actions');

var NBAApp = React.createClass({
  render: function() {
    const { isLoggedIn } = this.props;
    let barStyle = !isLoggedIn ? 'default' : 'light-content';
    let content = !isLoggedIn ? <LoginScreen /> : <NBANavigator />;
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle={barStyle}
        />
        {content}
      </View>
    );
  },

  componentDidMount: function() {
    AppState.addEventListener('change', this.handleAppStateChange);

    // TODO: Make this list smaller, we basically download the whole internet
    this.props.dispatch(loadAbout());
    this.props.dispatch(loadAllPlayers());
  },

  componentWillUnmount: function() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  },

  handleAppStateChange: function(appState) {
    if (appState === 'active') {
      // TODO: update something
    }
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function select(store) {
  return {
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
  };
}

module.exports = connect(select)(NBAApp);
