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

export const CrashScreen: React.FC = () => {
  usePulseBoard({ screenName: 'CrashScreen' });
  const [result, setResult] = useState<string | null>(null);

  const handleTrackCrash = useCallback((isFatal: boolean) => {
    const error = new Error(
      isFatal
        ? 'Fatal: App ran out of memory'
        : 'Non-fatal: Image failed to load',
    );
    PulseBoard.trackCrash(error, isFatal);
    setResult(
      `${isFatal ? '💀 Fatal' : '⚠️ Non-fatal'} crash tracked:\n"${
        error.message
      }"`,
    );
    Alert.alert(
      '✅ Crash Tracked',
      `${isFatal ? 'Fatal' : 'Non-fatal'}: "${error.message}"`,
    );
  }, []);

  const handleCaptureError = useCallback(() => {
    try {
      // Simulate an error
      const obj: Record<string, unknown> = {};
      (obj as Record<string, () => void>).nonExistentMethod();
    } catch (err) {
      PulseBoard.captureError(err as Error, {
        payload: {
          screen: 'CrashScreen',
          action: 'nonExistentMethod',
          userId: 'demo-user',
        },
      });
      setResult(`Error captured:\n"${(err as Error).message}"`);
      Alert.alert('✅ Error Captured', (err as Error).message);
    }
  }, []);

  const handleNetworkError = useCallback(() => {
    const error = new TypeError('Network request failed: timeout after 30s');
    PulseBoard.captureError(error, {
      payload: {
        endpoint: '/api/payments',
        method: 'POST',
        statusCode: 0,
        timeout: 30000,
      },
    });
    setResult(`Network error captured:\n"${error.message}"`);
    Alert.alert('✅ Network Error Captured', error.message);
  }, []);

  const handleUnhandledRejection = useCallback(() => {
    // This triggers the global unhandled promise rejection handler
    Promise.reject(new Error('Unhandled rejection: DB connection failed'));
    setResult(
      'Unhandled promise rejection triggered\n(captured by autoCapture)',
    );
    Alert.alert(
      '✅ Rejection Triggered',
      'Captured by autoCapture global handler',
    );
  }, []);

  return (
    <PulseBoardErrorBoundary screenName="CrashScreen">
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.pageTitle}>Crash Reporting</Text>
        <Text style={styles.pageSubtitle}>
          Track crashes, errors and unhandled exceptions. Fatal crashes mark the
          session as crashed.
        </Text>

        <ResultCard result={result} color={Colors.red} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Crash Tracking</Text>

          <ActionButton
            label="Track Non-Fatal Crash"
            code="PulseBoard.trackCrash(error, false)"
            color={Colors.yellow}
            onPress={() => handleTrackCrash(false)}
          />
          <ActionButton
            label="Track Fatal Crash"
            code="PulseBoard.trackCrash(error, true)"
            color={Colors.red}
            onPress={() => handleTrackCrash(true)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Error Capture</Text>

          <ActionButton
            label="Capture JS Error"
            code="PulseBoard.captureError(error, { payload })"
            color={Colors.orange}
            onPress={handleCaptureError}
          />
          <ActionButton
            label="Capture Network Error"
            code="PulseBoard.captureError(networkError)"
            color={Colors.orange}
            onPress={handleNetworkError}
          />
          <ActionButton
            label="Trigger Unhandled Rejection"
            code="Promise.reject(error) — caught by autoCapture"
            color={Colors.purple}
            onPress={handleUnhandledRejection}
          />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>autoCapture</Text>
          <Text style={styles.infoText}>
            When autoCapture: true is set in init(), PulseBoard automatically
            captures:{'\n'}• Unhandled JS exceptions via ErrorUtils{'\n'}•
            Unhandled promise rejections{'\n'}• Both are sent immediately
            without calling captureError() manually
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
