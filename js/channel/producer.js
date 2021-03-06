/**
 * @flow
 */

'use strict';

const producer = {
  games: (res: any) => {
    let result = {
      unstart: [],
      live: [],
      over: [],
    };

    res['sports_content']['games']['game'].forEach((game, index) => {
      let item = {
        id: game.id,
        home: {},
        visitor: {},
      };

      const sides = ['home', 'visitor'];
      sides.forEach((key) => {
        item[key]['id'] = game[key]['id'];
        item[key]['key'] = game[key]['team_key'];
        item[key]['score'] = game[key]['score'];
      });

      const process = game['period_time'];
      switch (parseInt(process.game_status, 10)) {
        case 1:
          item.status = 'unstart';
          item.progress = process.period_status;
          result.unstart.push(item);
          break;
        case 2:
          item.status = 'live';
          let clock;
          if (process.game_clock) {
            clock = (parseInt(process.game_clock.split(':')[0], 10) < 10 ? '0' : '') + process.game_clock;
          }
          item.progress = clock || 'End';
          item.quarter = 'Q' + process.period_value;
          result.live.push(item);
          break;
        case 3:
          item.status = 'over';
          result.over.push(item);
          break;
        default:
          break;
      }
    });

    return result;
  },

  gameDetail: (res: any) => {
    let result = {
      home: {},
      visitor: {},
    };

    const data = res.sports_content.game;
    Object.keys(result).forEach((key) => {
      result[key]['key'] = data[key]['team_key'];
      result[key]['score'] = data[key]['score'];
      result[key]['periods'] = data[key]['linescores']['period'];
      result[key]['players'] = data[key]['players']['player'];
    });

    const process = data['period_time'];
    const type = parseInt(process.game_status, 10);
    result.status = type === 3 ? 'over' : (type === 2 ? 'live' : 'unstart');
    if (result.status === 'live') {
      result.progress = process.game_clock || 'End';
      result.quarter = 'Q' + process.period_value;
    }

    return result;
  },

  allPlayers: (res: any) => {
    const data = res.resultSets[0].rowSet;

    return data.filter(item => {
      return item[3] === 1;
    }).map(item => {
      return {
        id: item[0],
        name: item[2],
        teamId: item[7],
        teamCity: item[8],
        teamName: item[9],
        teamAbbr: item[10],
      };
    });
  },
};

export default producer;
