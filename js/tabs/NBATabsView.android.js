/**
 * @providesModule NBATabsView
 * @flow
 */

'use strict';

var React = require('React');
var StyleSheet = require('StyleSheet');
var Navigator = require('Navigator');
var View = require('View');
var Image = require('Image');
var { connect } = require('react-redux');

var CMColors = require('../common/CMColors');
var { Text } = require('../common/CMText');
var DrawerLayout = require('../common/CMDrawerLayout');

var MenuItemAndroid = require('./MenuItemAndroid');
var LoginButton = require('../login/LoginButton');

var TodayView = require('./today/TodayView');
var ScheduleView = require('./schedule/ScheduleView');
var CommunityView = require('./community/CommunityView');
var SettingView = require('./setting/SettingView');
var PlaygroundView = require('./playground/PlaygroundView');

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

    (this: any).renderNavigationView = this.renderNavigationView.bind(this);
    (this: any).openDrawer = this.openDrawer.bind(this);
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
    var accountItem = (
      <View>
        <Image source={require('./img/logo.png')} />
        <Text style={styles.name}>
          THIS IS WHY WE PLAY
        </Text>
      </View>
    );
    var loginItem = (
      <View style={styles.loginPrompt}>
        <Text style={styles.loginText}>
          Log in to find your friends at F8.
        </Text>
        <LoginButton onPress={this.onLogin.bind(this)} />
      </View>
    );
    return (
      <View style={styles.drawer}>
        <Image
          style={styles.header}
          source={require('./img/drawer-header.png')}>
          {accountItem}
        </Image>
        <MenuItemAndroid
          title="Today"
          selected={this.props.tab === 'today'}
          onPress={this.onTabSelect.bind(this, 'today')}
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
        <MenuItemAndroid
          title="Playground"
          selected={this.props.tab === 'playground'}
          onPress={this.onTabSelect.bind(this, 'playground')}
          icon={require('./setting/img/setting-icon.png')}
          selectedIcon={require('./setting/img/setting-icon-active.png')}
        />
        {loginItem}
      </View>
    );
  }

  renderContent() {
    switch (this.props.tab) {
      case 'today':
        return <TodayView navigator={this.props.navigator} />;
      case 'schedule':
        return <ScheduleView navigator={this.props.navigator} />;
      case 'community':
        return <CommunityView navigator={this.props.navigator} />;
      case 'setting':
        return <SettingView navigator={this.props.navigator} />;
      case 'playground':
        return <PlaygroundView />;
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

  onLogin() {
    this.refs.drawer.closeDrawer();
    this.props.navigator.push({
      login: true, // TODO: Proper route
      callback: null,
    });
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
  loginPrompt: {
    flex: 1,
    paddingBottom: 10,
    justifyContent: 'flex-end',
  },
  loginText: {
    marginBottom: 10,
    color: CMColors.lightText,
    fontSize: 12,
    textAlign: 'center',
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
