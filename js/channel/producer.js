/**
 * @flow
 */

'use strict';

const producer = {
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
