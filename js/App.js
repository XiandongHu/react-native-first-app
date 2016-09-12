/**
 * @flow
 */

'use strict';

import {
  StyleSheet,
  View,
  StatusBar,
  Text
} from 'react-native';

var React = require('React');
var {
  loadAbout,
} = require('./actions');
var { connect } = require('react-redux');

var App = React.createClass({
  componentDidMount: function() {
    // TODO: Make this list smaller, we basically download the whole internet
    this.props.dispatch(loadAbout());
  },

  render: function() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"
        />
        <Text style={styles.about}>
          {this.props.msg}
        </Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  about: {
    fontSize: 20,
    textAlign: 'center',
  },
});

function select(store) {
  return {
    msg: store.about,
  };
}

module.exports = connect(select)(App);
