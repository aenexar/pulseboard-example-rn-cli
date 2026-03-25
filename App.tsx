import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { initPulseBoard } from './src/config/pulseboard';
import { AppNavigator } from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

initPulseBoard();

function App() {
  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={'#0a0a0f'}
      />
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <AppNavigator />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </>
  );
}

export default App;
