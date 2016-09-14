/**
 * @flow
 */

'use strict';

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
let season;
if (currentMonth >= 10) {
  season = currentDate.getFullYear().toString() + '-' + (currentDate.getFullYear() + 1).toString().substring(2, 4);
} else {
  season = (currentDate.getFullYear() - 1).toString() + '-' + currentDate.getFullYear().toString().substring(2, 4);
}

const address = {
  allPlayers: () => {
    return `http://stats.nba.com/stats/commonallplayers?IsOnlyCurrentSeason=1&LeagueID=00&Season=${season}`;
  },
};

export default address;
