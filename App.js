
import { StatusBar } from 'expo-status-bar';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation/Navigation';
import _ from 'lodash';
import AuthNavigation from './Navigation/AuthNavigation';
import { color } from './Color';

// redux toolkit
import { Provider } from 'react-redux';
import { store } from './Redux/store';

//navigation bar color


// {Ignore yellow warning in phone}
LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default function App() {
  return (
    <Provider store={store}>
      {/* <StatusBar backgroundColor={color.primaryColor} style='light' /> */}
      <AuthNavigation />
    </Provider>
  );
}

