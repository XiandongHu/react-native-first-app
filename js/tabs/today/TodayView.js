/**
 * @flow
 */

'use strict';

var React = require('React');

var ListContainer = require('../../common/CMListContainer');
var EmptyView = require('../../common/CMEmptyView');

class TodayView extends React.Component {
  render() {
    return (
      <ListContainer
        title="Today"
        selectedSegment={0}
        backgroundImage={require('./img/today-background.png')}
        backgroundColor={'#A8D769'}>
        <EmptyView
          title="Today"
          text="Comming Soon..."
        />
      </ListContainer>
    );
  }
}

module.exports = TodayView;
