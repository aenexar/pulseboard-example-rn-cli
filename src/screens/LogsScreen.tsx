import { PulseBoard } from '@pulseboard/react-native';
import { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  PulseBoardErrorBoundary,
  ActionButton,
  ResultCard,
} from '../components';
import { Colors } from '../constants';
import { usePulseBoard } from '../hooks/usePulseBoard';

export const LogsScreen: React.FC = () => {
  usePulseBoard({ screenName: 'LogsScreen' });
  const [result, setResult] = useState<string | null>(null);
  const [capturing, setCapturing] = useState(false);

  const handleLog = useCallback(
    (level: 'debug' | 'info' | 'warn' | 'error', message: string) => {
      PulseBoard.log(level, message, {
        meta: { screen: 'LogsScreen', timestamp: Date.now() },
      });
      setResult(`${level.toUpperCase()} → "${message}"`);
      Alert.alert(`✅ Log Sent`, `Level: ${level}\n"${message}"`);
    },
    [],
  );

  const handleCaptureConsole = useCallback(() => {
    if (capturing) {
      PulseBoard.releaseConsole();
      setCapturing(false);
      setResult('Console capture disabled');
      Alert.alert('✅ Console Released', 'Console.log is back to normal');
      return;
    }
    PulseBoard.captureConsole();
    setCapturing(true);
    setResult(
      'Console capture enabled — all console.log calls are now tracked',
    );
    console.log('This console.log is captured by PulseBoard');
    console.warn('This console.warn is captured by PulseBoard');
    Alert.alert('✅ Console Captured', 'All console calls are now tracked');
  }, [capturing]);

  const handleFlushLogs = useCallback(async () => {
    await PulseBoard.flushLogs();
    setResult('Log queue flushed to backend');
    Alert.alert('✅ Logs Flushed', 'Log queue sent to PulseBoard');
  }, []);

  return (
    <PulseBoardErrorBoundary screenName="LogsScreen">
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.pageTitle}>Log Levels</Text>
        <Text style={styles.pageSubtitle}>
          Send structured logs at different severity levels.
        </Text>

        <ResultCard result={result} color={Colors.blue} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Manual Logging</Text>

          <ActionButton
            label="Log Debug"
            code="PulseBoard.log('debug', 'Verbose debug info')"
            color={Colors.muted}
            onPress={() =>
              handleLog('debug', 'Debug: rendering HomeScreen component')
            }
          />
          <ActionButton
            label="Log Info"
            code="PulseBoard.log('info', 'User tapped checkout')"
            color={Colors.blue}
            onPress={() => handleLog('info', 'User tapped checkout button')}
          />
          <ActionButton
            label="Log Warning"
            code="PulseBoard.log('warn', 'Slow network detected')"
            color={Colors.yellow}
            onPress={() =>
              handleLog('warn', 'Slow network detected: 2G connection')
            }
          />
          <ActionButton
            label="Log Error"
            code="PulseBoard.log('error', 'Payment failed')"
            color={Colors.red}
            onPress={() => handleLog('error', 'Payment failed: card declined')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Console Capture</Text>

          <ActionButton
            label={capturing ? 'Release Console' : 'Capture Console'}
            code={
              capturing
                ? 'PulseBoard.releaseConsole()'
                : 'PulseBoard.captureConsole()'
            }
            color={capturing ? Colors.red : Colors.purple}
            onPress={handleCaptureConsole}
          />
          <ActionButton
            label="Flush Log Queue"
            code="PulseBoard.flushLogs()"
            color={Colors.green}
            onPress={handleFlushLogs}
          />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>How it works</Text>
          <Text style={styles.infoText}>
            • Logs are batched and sent every 10 seconds{'\n'}• Error level logs
            are flushed immediately{'\n'}• captureConsole() intercepts all
            console.log/warn/error/debug calls{'\n'}• Call releaseConsole() to
            restore original console behaviour
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
  infoText: {
    fontSize: 12,
    color: Colors.muted,
    lineHeight: 22,
  },
});
