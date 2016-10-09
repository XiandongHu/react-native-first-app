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
          item.status = "unstart";
          item.date = process.period_status;
          result.unstart.push(item);
          break;
        case 2:
          item.status = 'live';
          let clock;
          if (process.game_clock) {
            clock = (parseInt(process.game_clock.split(':')[0], 10) < 10 ? '0' : '') + process.game_clock;
          }
          item.clock = clock || 'End';
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
