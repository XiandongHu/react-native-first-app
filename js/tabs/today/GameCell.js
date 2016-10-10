/**
 * @flow
 */

'use strict';

import React from 'React';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  PixelRatio
} from 'react-native';

var StyleSheet = require('../../common/CMStyleSheet');
var TeamMap = require('../../utils/teamMap');

import type { Status, Game } from '../../reducers/games';

class GameCell extends React.Component {
  props: {
    game: Game;
    onPress?: () => void;
  };

  render() {
    const { game } = this.props;

    let gameProgress = '';
    let cssType = '';
    switch (game.status) {
      case 'unstart':
        gameProgress = game.progress.replace(/\s*ET\s*/, '');
        cssType = 'Unstart';
        break;
      case 'live':
        gameProgress += game.quarter + ' ' + game.progress.replace(/\s+/, '');
        cssType = 'Live';
        break;
      case 'over':
        gameProgress = 'Final';
        cssType = 'Over';
        break;
      default:
        break;
    }

    const homeKey = game.home.key.toLowerCase();
    const visitorKey = game.visitor.key.toLowerCase();
    if (TeamMap[homeKey] && TeamMap[visitorKey]) {
      return (
        <TouchableHighlight underlayColor="transparent" onPress={this.props.onPress}>
          <View style={[styles.container, {backgroundColor: TeamMap[homeKey].color}]}>
            <View style={styles.team}>
              <Image style={styles.teamLogo} source={TeamMap[homeKey].logo} />
              <Text style={styles.teamCity}>{TeamMap[homeKey].city}</Text>
              <Text style={styles.teamName}>{TeamMap[homeKey].team}</Text>
            </View>
            <View style={styles.info}>
              <Text style={[styles.infoProgress, styles[`info${cssType}`]]}>{gameProgress}</Text>
              {
                game.status !== 'unstart' &&
                <View style={styles.infoScorePanel}>
                  <Text style={styles.infoScore}>{game.home.score}</Text>
                  <View style={styles.infoDivider} />
                  <Text style={styles.infoScore}>{game.visitor.score}</Text>
                </View>
              }
            </View>
            <View style={styles.team}>
              <Image style={styles.teamLogo} source={TeamMap[visitorKey].logo} />
              <Text style={styles.teamCity}>{TeamMap[visitorKey].city}</Text>
              <Text style={styles.teamName}>{TeamMap[visitorKey].team}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    }

    return null;
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 95,
    borderRadius: 5,
    marginHorizontal: 12,
    marginVertical: 5,
  },
  team: {
    flex: 1.5,
    borderRadius: 5,
    alignItems: 'center',
  },
  teamLogo: {
    width: 50,
    height: 50,
    marginTop: 10,
  },
  teamCity: {
    marginTop: 2,
    color: 'white',
    fontSize: 11,
  },
  teamName: {
    top: 0,
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  info: {
    flex: 1.5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  infoUnstart: {
    top: 13,
    fontSize: 22,
  },
  infoProgress: {
    marginTop: 22,
    marginBottom: 3,
    color: 'white',
    fontSize: 10,
  },
  infoScorePanel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  infoScore: {
    width: 50,
    color: 'white',
    ios: {
      fontSize: 31,
    },
    android: {
      fontSize: 25,
    },
    fontWeight: '100',
    textAlign: 'center',
  },
  infoDivider: {
    width: 2 / PixelRatio.get(),
    height: 25,
    marginTop: 7,
    marginHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});

module.exports = GameCell;
