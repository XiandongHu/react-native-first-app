# My First React Native App

This is an example for `react-native`, which display the NBA informations, such as teams, players, and so on. Relative data is from `stat.nba.com`, you can reference the [wiki page](https://github.com/seemethere/nba_py/wiki/stats.nba.com-Endpoint-Documentation) of `nba_py` on github.

This example tells us how to use React Native, Redux, and more.

## Requirements

1. [React Native](http://facebook.github.io/react-native/docs/getting-started.html) (follow iOS and Android guides)
  - Xcode 7.3+
2. [CocoaPods](http://cocoapods.org) (only for iOS)
  - Version 1.0+ recommended (`gem install cocoapods --pre`)

## Setup

1. **Clone the repo**

  ```
  $ git clone https://github.com/XiandongHu/react-native-first-app.git
  $ cd react-native-first-app
  ```

2. **Install dependencies** (npm v3+)

  ```
  $ npm install
  $ (cd ios; pod install)       # only for iOS version
  ```
3. **Running on Android**

  ```
  $ react-native run-android
  $ adb reverse tcp:8081 tcp:8081     # required to ensure the Android app can access the Packager server
  ```

4. **Running on iOS**

  ```
  $ react-native run-ios
  ```
