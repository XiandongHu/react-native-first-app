/**
 * @flow
 */

'use strict';

import {
  View,
  StatusBar,
  Text
} from 'react-native';

var StyleSheet = require('./common/CMStyleSheet');
var CMHeader = require('./common/CMHeader');

var React = require('React');
var {
  loadAbout,
} = require('./actions');
var { connect } = require('react-redux');

var Platform = require('Platform');

var App = React.createClass({
  componentDidMount: function() {
    // TODO: Make this list smaller, we basically download the whole internet
    this.props.dispatch(loadAbout());
  },

  render: function() {
    let leftItem;
    if (Platform.OS === 'android') {
      leftItem = {
        title: 'Menu',
        icon: require('./common/img/menu.png'),
      };
    }

    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"
        />
        <CMHeader
          style={styles.header}
          title="Title"
          leftItem={leftItem}>
        </CMHeader>
        <View style={styles.aboutContainer}>
          <Text style={styles.about}>
            {this.props.msg}
          </Text>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    android: {
      backgroundColor: '#5597B8',
    },
  },
  aboutContainer: {
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
