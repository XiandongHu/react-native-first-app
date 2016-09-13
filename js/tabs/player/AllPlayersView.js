/**
 * @flow
 */

'use strict';

import {
  View,
  Text
} from 'react-native';

var StyleSheet = require('../../common/CMStyleSheet');
var CMHeader = require('../../common/CMHeader');

var React = require('React');
var { connect } = require('react-redux');

var Platform = require('Platform');

class AllPlayersView extends React.Component {
  render() {
    let leftItem;
    if (Platform.OS === 'android') {
      leftItem = {
        title: 'Menu',
        icon: require('../../common/img/menu.png'),
      };
    }

    return (
      <View style={styles.container}>
        <CMHeader
          style={styles.header}
          title="Title"
          leftItem={leftItem}>
        </CMHeader>
        <View style={styles.aboutContainer}>
          <Text style={styles.about}>
            {this.props.msg}
          </Text>
          <Text style={{textAlign: 'center', color: '#333333', marginTop: 10}}>
            {this.props.allPlayers.length}
          </Text>
        </View>
      </View>
    );
  }
}

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
    allPlayers: store.allPlayers,
  };
}

module.exports = connect(select)(AllPlayersView);
