import { PulseBoard } from '@pulseboard/react-native';
import { useCallback, useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  PulseBoardErrorBoundary,
  ActionButton,
  ResultCard,
} from '../components';
import { Colors } from '../constants';
import { usePulseBoard } from '../hooks/usePulseBoard';

export const SessionScreen: React.FC = () => {
  usePulseBoard({ screenName: 'SessionScreen' });

  const [result, setResult] = useState<string | null>(null);
  const [sessionActive, setSessionActive] = useState(false);
  const sessionStart = useRef<number>(0);

  const handleStartSession = useCallback(() => {
    PulseBoard.startSession();
    sessionStart.current = Date.now();
    setSessionActive(true);
    setResult('Session started\nTracking duration...');
    Alert.alert('✅ Session Started', 'Session is now active');
  }, []);

  const handleEndSession = useCallback(() => {
    const duration = Math.round((Date.now() - sessionStart.current) / 1000);
    PulseBoard.endSession(duration);
    setSessionActive(false);
    setResult(`Session ended\nDuration: ${duration}s`);
    Alert.alert('✅ Session Ended', `Duration: ${duration} seconds`);
  }, []);

  const handleIdentify = useCallback(() => {
    PulseBoard.identify({
      userId: 'u_demo_001',
      email: 'demo@example.com',
      username: 'demouser',
    });
    setResult('User identified:\nu_demo_001 · demo@example.com');
    Alert.alert(
      '✅ User Identified',
      'User context attached to all future events',
    );
  }, []);

  const handleClearUser = useCallback(() => {
    PulseBoard.clearUser();
    setResult('User context cleared\nFuture events will be anonymous');
    Alert.alert('✅ User Cleared', 'User context removed');
  }, []);

  const handleTrackScreens = useCallback(() => {
    const screens = [
      'HomeScreen',
      'ProfileScreen',
      'SettingsScreen',
      'CheckoutScreen',
    ];
    screens.forEach((screen, i) => {
      setTimeout(() => {
        const loadTime = Math.floor(Math.random() * 300) + 50;
        PulseBoard.trackScreen(screen, loadTime);
      }, i * 300);
    });
    setResult(
      `Tracked ${screens.length} screen views:\n${screens.join(' → ')}`,
    );
    Alert.alert('✅ Screens Tracked', `${screens.length} screens queued`);
  }, []);

  const handleFlush = useCallback(async () => {
    await PulseBoard.flush();
    setResult('Event queue flushed to backend');
    Alert.alert('✅ Queue Flushed', 'All pending events sent to PulseBoard');
  }, []);

  return (
    <PulseBoardErrorBoundary screenName="SessionScreen">
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.pageTitle}>Session Management</Text>
        <Text style={styles.pageSubtitle}>
          Control sessions, identify users, track screen views and flush the
          event queue manually.
        </Text>

        <ResultCard result={result} color={Colors.green} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Session Lifecycle</Text>

          <ActionButton
            label={sessionActive ? 'Session Active ✓' : 'Start Session'}
            code="PulseBoard.startSession()"
            color={sessionActive ? Colors.muted : Colors.green}
            onPress={sessionActive ? () => {} : handleStartSession}
          />
          <ActionButton
            label="End Session"
            code="PulseBoard.endSession(duration)"
            color={sessionActive ? Colors.red : Colors.muted}
            onPress={
              sessionActive
                ? handleEndSession
                : () =>
                    Alert.alert('No active session', 'Start a session first')
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Identity</Text>

          <ActionButton
            label="Identify User"
            code="PulseBoard.identify({ userId, email, username })"
            color={Colors.purple}
            onPress={handleIdentify}
          />
          <ActionButton
            label="Clear User"
            code="PulseBoard.clearUser()"
            color={Colors.border}
            onPress={handleClearUser}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Screen Tracking</Text>

          <ActionButton
            label="Track Multiple Screens"
            code="PulseBoard.trackScreen(screenName, loadTime)"
            color={Colors.blue}
            onPress={handleTrackScreens}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Queue Management</Text>

          <ActionButton
            label="Flush Event Queue"
            code="PulseBoard.flush()"
            color={Colors.yellow}
            onPress={handleFlush}
          />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Session flow</Text>
          <Text style={styles.infoText}>
            1. Call startSession() when app becomes active{'\n'}
            2. Call identify() after user logs in{'\n'}
            3. Call trackScreen() on every navigation change{'\n'}
            4. Call endSession(duration) when app goes to background{'\n'}
            5. Call clearUser() when user logs out{'\n'}
            {'\n'}
            Events are auto-flushed every 5s. Errors flush immediately.
          </Text>
        </View>
      </ScrollView>
    </PulseBoardErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: 24, paddingBottom: 48 },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 14,
    color: Colors.muted,
    lineHeight: 22,
    marginBottom: 24,
  },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.muted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 16,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  infoText: { fontSize: 12, color: Colors.muted, lineHeight: 22 },
});
