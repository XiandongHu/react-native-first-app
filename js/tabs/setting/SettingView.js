/**
 * @flow
 */

'use strict';

var React = require('React');

var ListContainer = require('../../common/CMListContainer');
var EmptyView = require('../../common/CMEmptyView');

class SettingView extends React.Component {
  render() {
    return (
      <ListContainer
        title="Setting"
        selectedSegment={0}
        backgroundImage={require('./img/setting-background.png')}
        backgroundColor={'#47BFBF'}>
        <EmptyView
          title="Setting"
          text="Comming Soon..."
        />
      </ListContainer>
    );
  }
}

module.exports = SettingView;
