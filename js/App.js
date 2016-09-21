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
var { connect } = require('react-redux');

var {
  loadAbout,
  loadAllPlayers,
} = require('./actions');
var PlayersView = require('./tabs/player/PlayersView');

var App = React.createClass({
  componentDidMount: function() {
    // TODO: Make this list smaller, we basically download the whole internet
    this.props.dispatch(loadAbout());
    this.props.dispatch(loadAllPlayers());
  },

  render: function() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"
        />
        <PlayersView />
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = connect()(App);
