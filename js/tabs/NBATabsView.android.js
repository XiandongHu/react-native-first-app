/**
 * @flow
 */

'use strict';

var React = require('React');
var StyleSheet = require('StyleSheet');
var Navigator = require('Navigator');
var View = require('View');
var Image = require('Image');
var TouchableOpacity = require('TouchableOpacity');
var { connect } = require('react-redux');

var Colors = require('../common/CMColors');
var { Text } = require('../common/CMText');
var DrawerLayout = require('../common/CMDrawerLayout');

var MenuItemAndroid = require('./MenuItemAndroid');

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

  constructor(props) {
    super(props);

    this.renderNavigationView = this.renderNavigationView.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
  }

  render() {
    return (
      <DrawerLayout
        ref="drawer"
        drawerWidth={290}
        drawerPosition="left"
        renderNavigationView={this.renderNavigationView}>
        <View style={styles.content} key={this.props.tab}>
          {this.renderContent()}
        </View>
      </DrawerLayout>
    );
  }

  renderNavigationView() {
    var profile = (
      <View>
        <Image source={require('./img/logo.png')} />
        <Text style={styles.name}>
          This is why we play!
        </Text>
      </View>
    );
    return (
      <View style={styles.drawer}>
        <Image
          style={styles.header}
          source={require('./img/drawer-header.png')}>
          {profile}
        </Image>
        <MenuItemAndroid
          title="Today"
          selected={this.props.tab === 'today'}
          onPress={this.onTabSelect.bind(this, 'today')}
          badge={this.props.notificationsBadge}
          icon={require('./today/img/today-icon.png')}
          selectedIcon={require('./today/img/today-icon-active.png')}
        />
        <MenuItemAndroid
          title="Schedule"
          selected={this.props.tab === 'schedule'}
          onPress={this.onTabSelect.bind(this, 'schedule')}
          icon={require('./schedule/img/schedule-icon.png')}
          selectedIcon={require('./schedule/img/schedule-icon-active.png')}
        />
        <MenuItemAndroid
          title="Community"
          selected={this.props.tab === 'community'}
          onPress={this.onTabSelect.bind(this, 'community')}
          icon={require('./community/img/community-icon.png')}
          selectedIcon={require('./community/img/community-icon-active.png')}
        />
        <MenuItemAndroid
          title="Setting"
          selected={this.props.tab === 'setting'}
          onPress={this.onTabSelect.bind(this, 'setting')}
          icon={require('./setting/img/setting-icon.png')}
          selectedIcon={require('./setting/img/setting-icon-active.png')}
        />
      </View>
    );
  }

  renderContent() {
    switch (this.props.tab) {
      case 'today':
        return <TodayView />;
      case 'schedule':
        return <ScheduleView navigator={this.props.navigator} />;
      case 'community':
        return <CommunityView navigator={this.props.navigator} />;
      case 'setting':
        return <SettingView navigator={this.props.navigator} />;
    }
    throw new Error(`Unknown tab ${this.props.tab}`);
  }

  openDrawer() {
    this.refs.drawer.openDrawer();
  }

  onTabSelect(tab: Tab) {
    if (this.props.tab !== tab) {
      this.props.onTabSelect(tab);
    }
    this.refs.drawer.closeDrawer();
  }

  getChildContext() {
    return {
      openDrawer: this.openDrawer,
    };
  }
}

NBATabsView.childContextTypes = {
  openDrawer: React.PropTypes.func,
};

var styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    justifyContent: 'flex-end',
  },
  name: {
    marginTop: 10,
    color: 'white',
    fontSize: 12,
  },
});

function select(store) {
  return {
    tab: store.navigation,
  };
}

function actions(dispatch) {
  return {
    onTabSelect: (tab) => dispatch(switchTab(tab)),
  };
}

module.exports = connect(select, actions)(NBATabsView);