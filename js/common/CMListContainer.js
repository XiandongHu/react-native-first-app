/**
 * @flow
 */

'use strict';

var React = require('React');
var ReactNative = require('react-native');
var Animated = require('Animated');
var NativeModules = require('NativeModules');
var Dimensions = require('Dimensions');
var View = require('View');
var Platform = require('Platform');

var StyleSheet = require('./CMStyleSheet');
var { Text } = require('./CMText');
var Header = require('./CMHeader');
var SegmentedControl = require('./CMSegmentedControl');
var ParallaxBackground = require('./CMParallaxBackground');
var ViewPager = require('./CMViewPager');

import type { Item as HeaderItem } from './CMHeader';

type Props = {
  title: string;
  leftItem?: HeaderItem;
  rightItem?: HeaderItem;
  extraItems?: Array<HeaderItem>;
  selectedSegment?: number;
  selectedSectionColor: string;
  backgroundImage: number;
  backgroundColor: string;
  parallaxContent?: ?ReactElement<any>;
  stickyHeader?: ?ReactElement<any>;
  onSegmentChange?: (segment: number) => void;
  children?: any;
};

type State = {
  idx: number;
  anim: Animated.Value;
  stickyHeaderHeight: number;
};

const EMPTY_CELL_HEIGHT = Dimensions.get('window').height > 600 ? 200 : 150;

class CMListContainer extends React.Component {
  props: Props;
  state: State;
  _refs: Array<any>;
  _pinned: any;

  static defaultProps = {
    selectedSectionColor: 'white',
  };

  static contextTypes = {
    openDrawer: React.PropTypes.func,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      idx: this.props.selectedSegment || 0,
      anim: new Animated.Value(0),
      stickyHeaderHeight: 0,
    };

    this._refs = [];

    (this: any).renderFakeHeader = this.renderFakeHeader.bind(this);
    (this: any).handleStickyHeaderLayout = this.handleStickyHeaderLayout.bind(this);
    (this: any).handleSelectSegment = this.handleSelectSegment.bind(this);
    (this: any).handleShowMenu = this.handleShowMenu.bind(this);
  }

  render() {
    var leftItem = this.props.leftItem;
    if (!leftItem && Platform.OS === 'android') {
      leftItem = {
        title: 'Menu',
        icon: require('./img/menu.png'),
        onPress: this.handleShowMenu,
      };
    }

    const segments = [];
    const content = React.Children.map(this.props.children, (child, idx) => {
      segments.push(child.props.title);
      return React.cloneElement(child, {
        ref: (ref) => { this._refs[idx] = ref; },
        onScroll: (e) => this.handleScroll(idx, e),
        style: styles.listView,
        showsVerticalScrollIndicator: false,
        scrollEventThrottle: 16,
        contentInset: {bottom: 49, top: 0},
        automaticallyAdjustContentInsets: false,
        renderHeader: this.renderFakeHeader,
        scrollsToTop: idx === this.state.idx,
      });
    });

    let { stickyHeader } = this.props;
    if (segments.length > 1) {
      stickyHeader = (
        <View>
          <SegmentedControl
            values={segments}
            selectedIndex={this.state.idx}
            selectionColor={this.props.selectedSectionColor}
            onChange={this.handleSelectSegment}
          />
          {stickyHeader}
        </View>
      );
    }

    // TODO: Bind to ViewPager animation
    const backgroundShift = segments.length === 1 ? 0 : this.state.idx / (segments.length - 1);

    return (
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <ParallaxBackground
            minHeight={this.state.stickyHeaderHeight + Header.height}
            maxHeight={EMPTY_CELL_HEIGHT + this.state.stickyHeaderHeight + Header.height}
            offset={this.state.anim}
            backgroundImage={this.props.backgroundImage}
            backgroundShift={backgroundShift}
            backgroundColor={this.props.backgroundColor}>
            {this.renderParallaxContent()}
          </ParallaxBackground>
          <Header
            title={this.props.title}
            leftItem={leftItem}
            rightItem={this.props.rightItem}
            extraItems={this.props.extraItems}>
            {this.renderHeaderTitle()}
          </Header>
          {this.renderFixedStickyHeader(stickyHeader)}
        </View>
        <ViewPager
          count={segments.length}
          selectedIndex={this.state.idx}
          onSelectedIndexChange={this.handleSelectSegment}>
          {content}
        </ViewPager>
        {this.renderFloatingStickyHeader(stickyHeader)}
      </View>
    );
  }

  renderParallaxContent() {
    if (Platform.OS === 'android') {
      return <View />;
    }
    if (this.props.parallaxContent) {
      return this.props.parallaxContent;
    }
    return (
      <Text style={styles.parallaxText}>
        {this.props.title}
      </Text>
    );
  }

  renderHeaderTitle() {
    if (Platform.OS === 'android') {
      return null;
    }
    var transform;
    if (!this.props.parallaxContent) {
      var distance = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
      transform = {
        opacity: this.state.anim.interpolate({
          inputRange: [distance - 20, distance],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      };
    }
    return (
      <Animated.Text style={[styles.headerTitle, transform]}>
        {this.props.title}
      </Animated.Text>
    );
  }

  handleScroll(idx: number, e: any) {
    if (idx !== this.state.idx) {
      return;
    }
    let y = 0;
    if (Platform.OS === 'ios') {
      this.state.anim.setValue(e.nativeEvent.contentOffset.y);
      const height = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
      y = Math.min(e.nativeEvent.contentOffset.y, height);
    }
    this._refs.forEach((ref, ii) => {
      if (ii !== idx && ref) {
        ref.scrollTo && ref.scrollTo({y, animated: false});
      }
    });

  }

  renderFakeHeader() {
    if (Platform.OS === 'ios') {
      const height = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
      return (
        <View style={{height}} />
      );
    }
  }

  renderFixedStickyHeader(stickyHeader: ?ReactElement<any>) {
    return Platform.OS === 'ios'
      ? <View style={{height: this.state.stickyHeaderHeight}} />
      : stickyHeader;
  }

  renderFloatingStickyHeader(stickyHeader: ?ReactElement<any>) {
    if (!stickyHeader || Platform.OS !== 'ios') {
      return;
    }
    var opacity = this.state.stickyHeaderHeight === 0 ? 0 : 1;
    var transform;

    // If native pinning is not available, fallback to Animated
    if (!NativeModules.CMScrolling) {
      var distance = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
      var translateY = this.state.anim.interpolate({
        inputRange: [0, distance],
        outputRange: [distance, 0],
        extrapolateRight: 'clamp',
      });
      transform = [{translateY}];
    }

    return (
      <Animated.View
        ref={(ref) => { this._pinned = ref; }}
        onLayout={this.handleStickyHeaderLayout}
        style={[styles.stickyHeader, {opacity}, {transform}]}>
        {stickyHeader}
      </Animated.View>
    );
  }

  handleStickyHeaderLayout({nativeEvent: {layout, target}}: any) {
    this.setState({stickyHeaderHeight: layout.height});
  }

  componentWillReceiveProps(nextProps: Props) {
    if (typeof nextProps.selectedSegment === 'number' &&
        nextProps.selectedSegment !== this.state.idx) {
      this.setState({idx: nextProps.selectedSegment});
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (!NativeModules.CMScrolling) {
      return;
    }

    if (this.state.idx !== prevState.idx ||
        this.state.stickyHeaderHeight !== prevState.stickyHeaderHeight) {
      var distance = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;

      if (this._refs[prevState.idx] && this._refs[prevState.idx].getScrollResponder) {
        const oldScrollViewTag = ReactNative.findNodeHandle(
          this._refs[prevState.idx].getScrollResponder()
        );
        NativeModules.CMScrolling.unpin(oldScrollViewTag);
      }

      if (this._refs[this.state.idx] && this._refs[this.state.idx].getScrollResponder) {
        const newScrollViewTag = ReactNative.findNodeHandle(
          this._refs[this.state.idx].getScrollResponder()
        );
        const pinnedViewTag = ReactNative.findNodeHandle(this._pinned);
        NativeModules.CMScrolling.pin(newScrollViewTag, pinnedViewTag, distance);
      }
    }
  }

  handleSelectSegment(idx: number) {
    if (this.state.idx !== idx) {
      const { onSegmentChange } = this.props;
      this.setState({idx}, () => onSegmentChange && onSegmentChange(idx));
    }
  }

  handleShowMenu() {
    this.context.openDrawer();
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerWrapper: {
    android: {
      elevation: 2,
      backgroundColor: 'transparent',
      // FIXME: elevation doesn't seem to work without setting border
      borderRightWidth: 1,
      marginRight: -1,
      borderRightColor: 'transparent',
    }
  },
  listView: {
    ios: {
      backgroundColor: 'transparent',
    },
    android: {
      backgroundColor: 'white',
    }
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  parallaxText: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    letterSpacing: -1,
  },
  stickyHeader: {
    position: 'absolute',
    top: Header.height,
    left: 0,
    right: 0,
  },
});

module.exports = CMListContainer;
