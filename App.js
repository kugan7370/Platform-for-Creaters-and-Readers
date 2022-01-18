import { StatusBar } from 'expo-status-bar';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation/Navigation';

LogBox.ignoreLogs([
  "setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release."
]);

export default function App() {
  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',

  },
});
