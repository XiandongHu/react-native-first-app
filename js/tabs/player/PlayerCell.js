/**
 * @flow
 */
'use strict';

var React = require('React');
var StyleSheet = require('StyleSheet');
var TouchableHighlight = require('TouchableHighlight');
var View = require('View');

var CMColors = require('../../common/CMColors');
var { Text } = require('../../common/CMText');

import type { Player } from '../../reducers/allPlayers';

class PlayerCell extends React.Component {
  props: {
    player: Player;
    onPress?: () => void;
  };

  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.cell}>
          <Text style={styles.name}>
            {this.props.player.name}
          </Text>
          <View style={styles.footer}>
            <Text style={styles.teamName}>
              {this.props.player.teamName}
            </Text>
            <Text style={styles.teamCity}>
              {'(' + this.props.player.teamCity + ')'}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  cell: {
    padding: 15,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamName: {
    color: CMColors.lightText,
    fontSize: 12,
  },
  teamCity: {
    color: CMColors.lightText,
    fontSize: 10,
    marginLeft: 3,
  },
});

module.exports = PlayerCell;
