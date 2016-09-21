/**
 * @flow
 */

'use strict';

import React from 'react';
import {
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

function CMTouchableIOS(props: Object): ReactElement<any> {
  return (
    <TouchableHighlight
      accessibilityTraits="button"
      underlayColor="#3C5EAE"
      {...props}
    />
  );
}

const CMTouchable = Platform.OS === 'android'
  ? TouchableNativeFeedback
  : CMTouchableIOS;

module.exports = CMTouchable;
