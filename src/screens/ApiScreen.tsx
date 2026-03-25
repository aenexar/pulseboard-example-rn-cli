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

export const ApiScreen: React.FC = () => {
  usePulseBoard({ screenName: 'ApiScreen' });
  const [result, setResult] = useState<string | null>(null);

  const simulateApiCall = useCallback(
    async (
      endpoint: string,
      method: string,
      statusCode: number,
      label: string,
    ) => {
      const start = Date.now();

      // Simulate network delay
      await new Promise((resolve: any) =>
        setTimeout(resolve, Math.floor(Math.random() * 400) + 50),
      );

      const duration = Date.now() - start;
      const payloadSize = Math.floor(Math.random() * 2048) + 256;

      PulseBoard.trackApiCall(
        endpoint,
        method,
        statusCode,
        duration,
        payloadSize,
      );

      const summary = `${method} ${endpoint}\nStatus: ${statusCode} · ${duration}ms · ${payloadSize}B`;
      setResult(`${label}:\n${summary}`);
      Alert.alert('✅ API Call Tracked', summary);
    },
    [],
  );

  return (
    <PulseBoardErrorBoundary screenName="ApiScreen">
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.pageTitle}>API Call Tracking</Text>
        <Text style={styles.pageSubtitle}>
          Track your app's API calls — endpoint, method, status code, duration
          and payload size. Simulated delays reflect real-world timing.
        </Text>

        <ResultCard result={result} color={Colors.blue} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Successful Calls</Text>

          <ActionButton
            label="GET /api/feed → 200"
            code="PulseBoard.trackApiCall('/api/feed', 'GET', 200, duration)"
            color={Colors.green}
            onPress={() => simulateApiCall('/api/feed', 'GET', 200, 'Success')}
          />
          <ActionButton
            label="POST /api/auth/login → 200"
            code="PulseBoard.trackApiCall('/api/auth/login', 'POST', 200, duration)"
            color={Colors.green}
            onPress={() =>
              simulateApiCall('/api/auth/login', 'POST', 200, 'Login success')
            }
          />
          <ActionButton
            label="PUT /api/profile → 204"
            code="PulseBoard.trackApiCall('/api/profile', 'PUT', 204, duration)"
            color={Colors.green}
            onPress={() =>
              simulateApiCall('/api/profile', 'PUT', 204, 'Profile updated')
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Error Responses</Text>

          <ActionButton
            label="GET /api/user → 401 Unauthorized"
            code="PulseBoard.trackApiCall('/api/user', 'GET', 401, duration)"
            color={Colors.yellow}
            onPress={() =>
              simulateApiCall('/api/user', 'GET', 401, 'Unauthorized')
            }
          />
          <ActionButton
            label="POST /api/payment → 422 Validation"
            code="PulseBoard.trackApiCall('/api/payment', 'POST', 422, duration)"
            color={Colors.yellow}
            onPress={() =>
              simulateApiCall('/api/payment', 'POST', 422, 'Validation error')
            }
          />
          <ActionButton
            label="GET /api/items → 500 Server Error"
            code="PulseBoard.trackApiCall('/api/items', 'GET', 500, duration)"
            color={Colors.red}
            onPress={() =>
              simulateApiCall('/api/items', 'GET', 500, 'Server error')
            }
          />
          <ActionButton
            label="DELETE /api/account → 503 Unavailable"
            code="PulseBoard.trackApiCall('/api/account', 'DELETE', 503, duration)"
            color={Colors.red}
            onPress={() =>
              simulateApiCall(
                '/api/account',
                'DELETE',
                503,
                'Service unavailable',
              )
            }
          />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>trackApiCall signature</Text>
          <Text style={styles.infoText}>
            PulseBoard.trackApiCall({'\n'}
            {'  '}endpoint: string,{'\n'}
            {'  '}method: string,{'\n'}
            {'  '}statusCode: number,{'\n'}
            {'  '}duration: number, // ms{'\n'}
            {'  '}payloadSize?: number // bytes{'\n'})
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
    fontFamily: 'monospace',
  },
});
