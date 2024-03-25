import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import LandingPage  from './components/LandingPage'
import SearchBar from './components/SearchBar'

export default function App() {
  return (
    <View style={styles.container}>
        <LandingPage />
      <View style={styles.searchBarContainer}>
        <SearchBar/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBarContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
});
