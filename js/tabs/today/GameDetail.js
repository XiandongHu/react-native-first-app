/**
 * @flow
 */

'use strict';

var React = require('React');
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Platform,
  PixelRatio
} from 'react-native';

var { connect } = require('react-redux');

var Header = require('../../common/CMHeader');
var GamePlayers = require('./GamePlayers');
var TeamMap = require('../../utils/teamMap');
var { loadGameDetail } = require('../../actions');

import type { Game } from '../../reducers/games';

class GameDetail extends React.Component {
  props: {
    date: Array<string>;
    id: string;
  };

  state: {
    selectedIndex: number;
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
    };
  }

  render() {
    const { selectedIndex } = this.state;
    const game = this.getCurrentGame();

    let gameProgress = '';
    switch (game.status) {
      case 'live':
        gameProgress += game.quarter + ' ' + game.progress.replace(/\s+/, '');
        break;
      case 'over':
        gameProgress = 'Final';
        break;
      default:
        break;
    }

    const homeKey = game.home.key.toLowerCase();
    const visitorKey = game.visitor.key.toLowerCase();
    const homeCss = selectedIndex === 0 ? 'Active' : 'Inactive';
    const visitorCss = selectedIndex === 1 ? 'Active' : 'Inactive';
    return (
      <View style={styles.container}>
        {/* Navigation */}
        <Header
          title="Game Data"
          leftItem={{title: 'Back', icon: require('../../login/img/x.png'), onPress: () => alert('Back button pressed!')}}
          style={{backgroundColor: TeamMap[homeKey].color}}
        />

        {/* Sum info */}
        <View style={[styles.sumContainer, {backgroundColor: TeamMap[homeKey].color}]}>
          <View style={styles.team}>
            <Image style={styles.teamLogo} source={TeamMap[homeKey].logo} />
            <Text style={styles.teamCity}>{TeamMap[homeKey].city}</Text>
            <Text style={styles.teamName}>{TeamMap[homeKey].team}</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.infoProgress}>{gameProgress}</Text>
            <View style={styles.infoScorePanel}>
              <View style={styles.infoScoreBlock}>
                <Text style={styles.infoSide}>Home</Text>
                <Text style={styles.infoScore}>{game.home.score}</Text>
              </View>
              <View style={styles.infoDivider} />
              <View style={styles.infoScoreBlock}>
                <Text style={styles.infoSide}>Away</Text>
                <Text style={styles.infoScore}>{game.visitor.score}</Text>
              </View>
            </View>
          </View>

          <View style={styles.team}>
            <Image style={styles.teamLogo} source={TeamMap[visitorKey].logo}/>
            <Text style={styles.teamCity}>{TeamMap[visitorKey].city}</Text>
            <Text style={styles.teamName}>{TeamMap[visitorKey].team}</Text>
          </View>
        </View>

        {/* Switch */}
        <View style={styles.segment}>
          <TouchableHighlight onPress={null} underlayColor="transparent" style={[styles.segmentPanel, styles[`segmentPanel${homeCss}`]]}>
            <View style={styles.segmentPanelInner}>
              <Text style={[styles.segmentTeam, styles[`segmentTeam${homeCss}`]]}>{TeamMap[homeKey].city + ' ' + TeamMap[homeKey].team}</Text>
              <View style={homeCss === 'Active' ? {backgroundColor: TeamMap[homeKey].color, height: 4} : {opacity: 0}} />
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={null} underlayColor="transparent" style={[styles.segmentPanel, styles[`segmentPanel${visitorCss}`]]}>
            <View style={styles.segmentPanelInner}>
              <Text style={[styles.segmentTeam, styles[`segTeam${visitorCss}`]]}>{TeamMap[visitorKey].city + ' ' + TeamMap[visitorKey].team}</Text>
              <View style={visitorCss === 'Active' ? {backgroundColor: TeamMap[visitorKey].color, height: 4} : {opacity: 0}} />
            </View>
          </TouchableHighlight>
        </View>

        {/* Data */}
        {!game || !game.detail.loaded && Platform.OS === 'ios' &&
          <View style={styles.indicatorView}>
            <ActivityIndicatorIOS
              animating
              color={selectedIndex === 0 ? TeamMap[homeKey].color : TeamMap[visitorKey].color}
              style={styles.indicator}
              size="large"
            />
          </View>
        }
        {!game || !game.detail.loaded && Platform.OS === 'android' &&
          <View style={styles.indicatorView}>
            <Text>Loading...</Text>
          </View>
        }
        {game && game.detail.loaded &&
          <GamePlayers detail={selectedIndex === 0 ? game.detail.data.home : game.detail.data.visitor} />
        }
      </View>
    );
  }

  componentDidMount() {
    var { date, id } = this.props;
    this.props.dispatch(loadGameDetail(date[0], date[1], date[2], id));
  }

  getCurrentGame(): Game {
    const id: string = this.props.id;
    let game: Game = this.props.games.live.find(item => {
      return item.id === id;
    });
    if (!game) {
      game = this.props.games.over.find(item => {
        return item.id === id;
      });
    }

    return game;
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  sumContainer: {
    flex: 5,
    flexDirection: 'row',
  },
  team: {
    flex: 1,
    alignItems: 'center',
  },
  teamLogo: {
    width: 75,
    height: 75,
  },
  teamCity: {
    marginTop: 0,
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
  infoProgress: {
    marginTop: 18,
    marginBottom: 3,
    color: 'white',
    fontSize: 13,
  },
  infoScorePanel: {
    flex: 1,
    flexDirection: 'row',
  },
  infoScoreBlock: {
    flex: 1,
    width: 60,
    alignItems: 'center',
  },
  infoSide: {
    flex: 1,
    marginTop: 6,
    alignSelf: 'center',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 10,
  },
  infoScore: {
    flex: 9,
    alignSelf: 'center',
    color: 'white',
    fontSize: 35,
    fontWeight: '200',
  },
  infoDivider: {
    flex: 1,
    width: 2 / PixelRatio.get(),
    height: 55,
    marginTop: 7,
    marginLeft: 15,
    marginRight: 15,
    color: 'rgba(255, 255, 255, 0.3)',
  },
  segment: {
    flexDirection: 'row',
    height: 35,
  },
  segmentPanel: {
    flex: 1,
  },
  segmentPanelActive: {
    backgroundColor: 'white',
  },
  segmentPanelInactive: {
    backgroundColor: '#EBEBEB',
  },
  segmentPanelInner: {
    flex: 1,
    flexDirection: 'column',
  },
  segmentTeam: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 12,
    lineHeight: 22,
  },
  segmentTeamActive: {
    color: '#222',
  },
  segmentTeamInactive: {
    color: '#7F7F7F',
  },
  indicatorView: {
    flex: 13,
    flexDirection: 'column',
  },
  indicator: {
    top: 100,
    height: 36,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

function select(store) {
  return {
    games: store.games,
  };
}

module.exports = connect(select)(GameDetail);
