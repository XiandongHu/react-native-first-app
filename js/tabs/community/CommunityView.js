/**
 * @flow
 */

'use strict';

var React = require('React');

var ListContainer = require('../../common/CMListContainer');
var EmptyView = require('../../common/CMEmptyView');

class CommunityView extends React.Component {
  render() {
    return (
      <ListContainer
        title="Community"
        selectedSegment={0}
        backgroundImage={require('./img/community-background.png')}
        backgroundColor={'#E78196'}>
        <EmptyView
          title="Community"
          text="Comming Soon..."
        />
      </ListContainer>
    );
  }
}

module.exports = CommunityView;
