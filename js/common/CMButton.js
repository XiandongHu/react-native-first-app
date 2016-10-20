/**
 * @flow
 */

'use strict';

var React = require('React');
var View = require('View');
var Image = require('Image');
var StyleSheet = require('StyleSheet');
var TouchableOpacity = require('TouchableOpacity');

var CMColors = require('./CMColors');
var { Text } = require('./CMText');

import LinearGradient from 'react-native-linear-gradient';

class CMButton extends React.Component {
  props: {
    style?: any;
    type: 'primary' | 'secondary' | 'bordered';
    icon?: number;
    caption: string;
    onPress: () => mixed;
  };

  static defaultProps = {
    type: 'primary',
  };

  render() {
    const caption = this.props.caption;
    let icon;
    if (this.props.icon) {
      icon = <Image source={this.props.icon} style={styles.icon} />;
    }
    let content;
    if (this.props.type === 'primary') {
      content = (
        <LinearGradient
          start={[0.5, 1]} end={[1, 1]}
          colors={['#6A6AD5', '#6F86D9']}
          style={[styles.button, styles.primaryButton]}>
          {icon}
          <Text style={[styles.caption, styles.primaryCaption]}>
            {caption}
          </Text>
        </LinearGradient>
      );
    } else {
      var border = this.props.type === 'bordered' && styles.border;
      content = (
        <View style={[styles.button, border]}>
          {icon}
          <Text style={[styles.caption, styles.secondaryCaption]}>
            {caption}
          </Text>
        </View>
      );
    }
    return (
      <TouchableOpacity
        accessibilityTraits="button"
        onPress={this.props.onPress}
        activeOpacity={0.8}
        style={[styles.container, this.props.style]}>
        {content}
      </TouchableOpacity>
    );
  }
}

const HEIGHT = 50;

var styles = StyleSheet.create({
  container: {
    height: HEIGHT,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  primaryButton: {
    borderRadius: HEIGHT / 2,
    backgroundColor: 'transparent',
  },
  border: {
    borderWidth: 1,
    borderColor: CMColors.lightText,
    borderRadius: HEIGHT / 2,
  },
  icon: {
    marginRight: 12,
  },
  caption: {
    fontSize: 12,
    letterSpacing: 1,
  },
  primaryCaption: {
    color: 'white',
  },
  secondaryCaption: {
    color: CMColors.lightText,
  }
});

module.exports = CMButton;
