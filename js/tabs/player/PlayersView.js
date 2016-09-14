/**
 * @flow
 */

'use strict';

import {
  Alert,
  View,
  Text
} from 'react-native';

var StyleSheet = require('../../common/CMStyleSheet');
var CMHeader = require('../../common/CMHeader');
var CMEmptyView = require('../../common/CMEmptyView');
var CMListView = require('../../common/CMListView');
var PlayerCell = require('./PlayerCell');

var FilterPlayers = require('./filterPlayers');

var React = require('React');
var { connect } = require('react-redux');

var Platform = require('Platform');

// TODO: Move from reselect to memoize?
var { createSelector } = require('reselect');

const data = createSelector(
  (store) => store.allPlayers,
  (allPlayers) => FilterPlayers.byTeamAbbr(allPlayers, ['LAL', 'GSW']),
);

class PlayersView extends React.Component {
  constructor(props) {
    super(props);

    (this: any).renderEmptyList = this.renderEmptyList.bind(this);
    (this: any).renderRow = this.renderRow.bind(this);
    (this: any).openPlayer = this.openPlayer.bind(this);
  }

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
        <CMListView
          data={this.props.players}
          renderEmptyList={this.renderEmptyList}
          renderRow={this.renderRow}
        />
      </View>
    );
  }

  renderEmptyList() {
    return (
      <CMEmptyView
        title="No Players Yet"
        text="All Players will appear here after loaded"
      />
    );
  }

  renderRow(player) {
    return (
      <PlayerCell
        player={player}
        onPress={() => this.openPlayer(player)}
      />
    );
  }

  openPlayer(player) {
    Alert.alert(
      'tip',
      player.teamId + '',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
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
});

function select(store) {
  return {
    msg: store.about,
    players: data(store),
  };
}

module.exports = connect(select)(PlayersView);
