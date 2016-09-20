/**
 * @flow
 */

'use strict';

import {
  Platform,
  Alert
} from 'react-native';

var CMListContainer = require('../../common/CMListContainer');
var CMEmptyView = require('../../common/CMEmptyView');
var CMListView = require('../../common/CMListView');
var PlayerCell = require('./PlayerCell');

var FilterPlayers = require('./filterPlayers');

var React = require('React');
var { connect } = require('react-redux');

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
    const filterItem = {
      icon: require('../../common/img/filter.png'),
      title: 'Filter',
    };

    return (
      <CMListContainer
        title="NBA"
        selectedSegment={0}
        backgroundImage={require('./img/player-background.png')}
        backgroundColor="#5597B8"
        selectedSectionColor="#51CDDA"
        rightItem={filterItem}>
        <CMListView
          title="Players"
          data={this.props.players}
          renderEmptyList={this.renderEmptyList}
          renderRow={this.renderRow}
        />
        <CMListView
          title="Teams"
          data={this.props.players}
          renderEmptyList={this.renderEmptyList}
          renderRow={this.renderRow}
        />
      </CMListContainer>
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

function select(store) {
  return {
    msg: store.about,
    players: data(store),
  };
}

module.exports = connect(select)(PlayersView);
