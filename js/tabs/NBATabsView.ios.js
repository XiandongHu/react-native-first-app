/**
 * @flow
 */

'use strict';

var React = require('React');
var Navigator = require('Navigator');
var StatusBarIOS = require('StatusBarIOS');
var TabBarIOS = require('TabBarIOS');
var TabBarItemIOS = require('TabBarItemIOS');
var { connect } = require('react-redux');

var Colors = require('../common/CMColors');

var TodayView = require('./today/TodayView');
var ScheduleView = require('./schedule/ScheduleView');
var CommunityView = require('./community/CommunityView');
var SettingView = require('./setting/SettingView');

var { switchTab } = require('../actions');

import type { Tab } from '../actions/types';

class NBATabsView extends React.Component {
  props: {
    tab: Tab;
    onTabSelect: (tab: Tab) => void;
    navigator: Navigator;
  };

  render() {
    return (
      <TabBarIOS tintColor={Colors.darkText}>
        <TabBarItemIOS
          title="Today"
          selected={this.props.tab === 'today'}
          onPress={this.onTabSelect.bind(this, 'today')}
          badge={this.props.notificationsBadge || null}
          icon={require('./today/img/today-icon.png')}
          selectedIcon={require('./today/img/today-icon-active.png')}>
          <TodayView />
        </TabBarItemIOS>
        <TabBarItemIOS
          title="Schedule"
          selected={this.props.tab === 'schedule'}
          onPress={this.onTabSelect.bind(this, 'schedule')}
          icon={require('./schedule/img/schedule-icon.png')}
          selectedIcon={require('./schedule/img/schedule-icon.png')}>
          <ScheduleView navigator={this.props.navigator} />
        </TabBarItemIOS>
        <TabBarItemIOS
          title="Community"
          selected={this.props.tab === 'community'}
          onPress={this.onTabSelect.bind(this, 'community')}
          icon={require('./community/img/community-icon.png')}
          selectedIcon={require('./community/img/community-icon-active.png')}>
          <CommunityView />
        </TabBarItemIOS>
        <TabBarItemIOS
          title="Setting"
          selected={this.props.tab === 'setting'}
          onPress={this.onTabSelect.bind(this, 'setting')}
          icon={require('./setting/img/setting-icon.png')}
          selectedIcon={require('./setting/img/setting-icon-active.png')}>
          <SettingView navigator={this.props.navigator} />
        </TabBarItemIOS>
      </TabBarIOS>
    );
  }

  componentDidMount() {
    StatusBarIOS && StatusBarIOS.setStyle('light-content');
  }

  onTabSelect(tab: Tab) {
    if (this.props.tab !== tab) {
      this.props.onTabSelect(tab);
    }
  }
}

function select(store) {
  return {
    tab: store.navigation.tab,
  };
}

function actions(dispatch) {
  return {
    onTabSelect: (tab) => dispatch(switchTab(tab)),
  };
}

module.exports = connect(select, actions)(NBATabsView);
