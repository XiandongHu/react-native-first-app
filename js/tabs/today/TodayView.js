/**
 * @flow
 */

'use strict';

var React = require('React');
var { connect } = require('react-redux');
var moment = require('moment-timezone');

var ListContainer = require('../../common/CMListContainer');
var EmptyView = require('../../common/CMEmptyView');
var ListView = require('../../common/CMListView');
var GameCell = require('./GameCell');

var { loadGames } = require('../../actions');

class TodayView extends React.Component {
  constructor(props) {
    super(props);

    (this: any).renderEmptyList = this.renderEmptyList.bind(this);
    (this: any).renderRow = this.renderRow.bind(this);
  }

  render() {
    var { games } = this.props;
    return (
      <ListContainer
        title="Today"
        selectedSegment={0}
        backgroundImage={require('./img/today-background.png')}
        backgroundColor={'#A8D769'}>
        <ListView
          title="Games"
          data={games.live.concat(games.unstart).concat(games.over)}
          needSeparator={false}
          renderEmptyList={this.renderEmptyList}
          renderRow={this.renderRow}
        />
      </ListContainer>
    );
  }

  renderEmptyList() {
    return (
      <EmptyView
        title="No Games"
        text="No Games Today"
      />
    );
  }

  renderRow(game) {
    return (
      <GameCell
        game={game}
      />
    );
  }

  componentDidMount() {
    const today = this.getToday();
    this.props.dispatch(loadGames(today[0], today[1], today[2]));
  }

  getToday() {
    const dateString = moment.tz(Date.now(), 'America/Los_Angeles').format();
    const dateArray = dateString.replace('T', '-').split('-');
    return dateArray.splice(0, 3);
  }
}

function select(store) {
  return {
    games: store.games,
  };
}

module.exports = connect(select)(TodayView);
