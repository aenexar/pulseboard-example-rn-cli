import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '../constants';
import {
  ApiScreen,
  CrashScreen,
  FeedbackScreen,
  HomeScreen,
  LogsScreen,
  SessionScreen,
} from '../screens';

export type RootStackParamList = {
  Home: undefined;
  Logs: undefined;
  Feedback: undefined;
  Crash: undefined;
  Api: undefined;
  Session: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.card },
          headerTintColor: Colors.text,
          headerTitleStyle: { fontWeight: '700', color: Colors.text },
          headerBackTitleStyle: { color: Colors.green },
          cardStyle: { backgroundColor: Colors.bg },
          headerShadowVisible: false,
          headerBackTitle: 'Back',
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Logs"
          component={LogsScreen}
          options={{ title: 'Logs' }}
        />
        <Stack.Screen
          name="Feedback"
          component={FeedbackScreen}
          options={{ title: 'Feedback' }}
        />
        <Stack.Screen
          name="Crash"
          component={CrashScreen}
          options={{ title: 'Crash Reporting' }}
        />
        <Stack.Screen
          name="Api"
          component={ApiScreen}
          options={{ title: 'API Tracking' }}
        />
        <Stack.Screen
          name="Session"
          component={SessionScreen}
          options={{ title: 'Session Management' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
