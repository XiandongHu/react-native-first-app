/**
 * @flow
 */

'use strict';

var React = require('React');
var View = require('View');
var Image = require('Image');
var Animated = require('Animated');
var Dimensions = require('Dimensions');
var StyleSheet = require('StyleSheet');
var TouchableOpacity = require('TouchableOpacity');
var { connect } = require('react-redux');

var CMColors = require('../common/CMColors');
var { Text } = require('../common/CMText');
var LoginButton = require('./LoginButton');

var { skipLogin } = require('../actions');

class LoginScreen extends React.Component {
  state = {
    anim: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.timing(this.state.anim, {toValue: 3000, duration: 3000}).start();
  }

  render() {
    return (
      <Image
        style={styles.container}
        source={require('./img/login-background.png')}>
        <TouchableOpacity
          accessibilityLabel="Skip login"
          accessibilityTraits="button"
          style={styles.skip}
          onPress={() => this.props.dispatch(skipLogin())}>
          <Animated.Image
            style={this.fadeIn(2800)}
            source={require('./img/x.png')}
          />
        </TouchableOpacity>
        <View style={styles.section}>
          <Animated.Image
            style={this.fadeIn(0)}
            source={require('./img/devconf-logo.png')}
          />
        </View>
        <View style={styles.section}>
          <Animated.Text style={[styles.h1, this.fadeIn(700, -20)]}>
            code to
          </Animated.Text>
          <Animated.Text style={[styles.h1, {marginTop: -30}, this.fadeIn(700, 20)]}>
            connect
          </Animated.Text>
          <Animated.Text style={[styles.h2, this.fadeIn(1000, 10)]}>
            April 12 + 13 / Fort Mason Center
          </Animated.Text>
          <Animated.Text style={[styles.h3, this.fadeIn(1200, 10)]}>
            SAN FRANCISCO, CALIFORNIA
          </Animated.Text>
        </View>
        <Animated.View style={[styles.section, styles.last, this.fadeIn(2500, 20)]}>
          <Text style={styles.loginComment}>
            Use Facebook to find your friends at F8.
          </Text>
          <LoginButton onPress={null} />
        </Animated.View>
      </Image>
    );
  }

  fadeIn(delay, from = 0) {
    const { anim } = this.state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      transform: [{
        translateY: anim.interpolate({
          inputRange: [delay, Math.min(delay + 500, 3000)],
          outputRange: [from, 0],
          extrapolate: 'clamp',
        }),
      }],
    };
  }
}

const scale = Dimensions.get('window').width / 375;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    // Image's source contains explicit size, but we want
    // it to prefer flex: 1
    width: undefined,
    height: undefined,
    padding: 26,
    backgroundColor: 'transparent',
  },
  skip: {
    position: 'absolute',
    top: 20,
    right: 0,
    padding: 15,
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  last: {
    justifyContent: 'flex-end',
  },
  h1: {
    color: CMColors.darkText,
    fontSize: Math.round(74 * scale),
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  h2: {
    marginVertical: 20,
    color: CMColors.darkText,
    fontSize: 17,
    textAlign: 'center',
  },
  h3: {
    color: CMColors.lightText,
    fontSize: 12,
    textAlign: 'center',
    letterSpacing: 1,
  },
  loginComment: {
    marginBottom: 14,
    color: CMColors.darkText,
    fontSize: 12,
    textAlign: 'center',
  },
});

module.exports = connect()(LoginScreen);
