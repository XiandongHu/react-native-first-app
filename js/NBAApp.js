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

var {
  loadAbout,
  loadAllPlayers,
} = require('./actions');
var NBANavigator = require('./NBANavigator');

var NBAApp = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"
        />
        <NBANavigator />
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

module.exports = connect()(NBAApp);
