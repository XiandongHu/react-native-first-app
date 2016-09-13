/**
 * @flow
 */

'use strict';

const producer = {
  allPlayers: (res: any) => {
    const data = res.resultSets[0].rowSet;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    let currentYear;
    if (currentMonth >= 10) {
      currentYear = currentDate.getFullYear() + '';
    } else {
      currentYear = currentDate.getFullYear() - 1 + '';
    }

    return data.filter(item => {
      return item[4] === currentYear;
    }).map(item => {
      return {
        id: item[0],
        name: item[2],
        teamId: item[7],
        teamCity: item[8],
        teamName: item[9],
      };
    });
  },
};

export default producer;
