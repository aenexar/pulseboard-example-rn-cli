import { PulseBoard } from '@pulseboard/react-native';
import { useCallback, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  PulseBoardErrorBoundary,
  ActionButton,
  ResultCard,
} from '../components';
import { Colors } from '../constants';
import { usePulseBoard } from '../hooks/usePulseBoard';

type FeedbackType = 'bug' | 'feature' | 'general';

const TYPE_CONFIG: Record<FeedbackType, { label: string; color: string }> = {
  bug: { label: 'Bug Report', color: Colors.red },
  feature: { label: 'Feature Request', color: Colors.purple },
  general: { label: 'General', color: Colors.blue },
};

export const FeedbackScreen: React.FC = () => {
  usePulseBoard({ screenName: 'FeedbackScreen' });

  const [result, setResult] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<FeedbackType>('bug');
  const [message, setMessage] = useState('');

  const handleSendFeedback = useCallback(() => {
    const text =
      message.trim() || `Test ${selectedType} feedback from example app`;

    PulseBoard.feedback(text, {
      type: selectedType,
      userEmail: 'demo@example.com',
      userName: 'Demo User',
      meta: { screen: 'FeedbackScreen', appVersion: '1.0.0' },
    });

    setResult(`${TYPE_CONFIG[selectedType].label} sent:\n"${text}"`);
    setMessage('');
    Alert.alert(
      '✅ Feedback Sent',
      `Type: ${TYPE_CONFIG[selectedType].label}\n"${text}"`,
    );
  }, [message, selectedType]);

  return (
    <PulseBoardErrorBoundary screenName="FeedbackScreen">
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.pageTitle}>User Feedback</Text>
        <Text style={styles.pageSubtitle}>
          Collect structured feedback from your users — bugs, feature requests,
          or general comments.
        </Text>

        <ResultCard result={result} color={Colors.purple} />

        {/* Type selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Feedback Type</Text>
          <View style={styles.typeRow}>
            {(Object.keys(TYPE_CONFIG) as FeedbackType[]).map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  {
                    borderColor: TYPE_CONFIG[type].color + '80',
                    backgroundColor:
                      selectedType === type
                        ? TYPE_CONFIG[type].color + '20'
                        : Colors.card,
                  },
                ]}
                onPress={() => setSelectedType(type)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.typeLabel,
                    {
                      color:
                        selectedType === type
                          ? TYPE_CONFIG[type].color
                          : Colors.muted,
                    },
                  ]}
                >
                  {TYPE_CONFIG[type].label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Message input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Message (optional)</Text>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Describe your feedback..."
            placeholderTextColor={Colors.muted}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Send buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Send</Text>

          <ActionButton
            label={`Send ${TYPE_CONFIG[selectedType].label}`}
            code={`PulseBoard.feedback(message, { type: '${selectedType}' })`}
            color={TYPE_CONFIG[selectedType].color}
            onPress={handleSendFeedback}
          />

          <ActionButton
            label="Send with Screenshot"
            code="PulseBoard.feedback(msg, { screenshot: base64 })"
            color={Colors.yellow}
            onPress={() => {
              PulseBoard.feedback('Test feedback with mock screenshot', {
                type: 'bug',
                screenshot: 'data:image/png;base64,iVBORw0KGgo=', // mock
                userEmail: 'demo@example.com',
              });
              setResult('Feedback with screenshot sent');
              Alert.alert('✅ Sent', 'Feedback with screenshot sent');
            }}
          />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Feedback options</Text>
          <Text style={styles.infoText}>
            • type: 'bug' | 'feature' | 'general'{'\n'}• userEmail / userName —
            attached to the report{'\n'}• screenshot — base64 encoded image
            {'\n'}• meta — any additional key/value pairs{'\n'}• sessionId —
            auto-attached from current session
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
  typeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  typeButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  typeLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  input: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 14,
    color: Colors.text,
    fontSize: 14,
    minHeight: 100,
    textAlignVertical: 'top',
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
