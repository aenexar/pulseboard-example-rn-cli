import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { EnrichedContext, PulseBoard } from '@pulseboard/react-native';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  ContextCards,
  Header,
  LastEventInfo,
  PulseBoardErrorBoundary,
  ScreenButton,
} from '../components';
import { Footer } from '../components/Footer';
import { Colors } from '../constants';
import { usePulseBoard } from '../hooks/usePulseBoard';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const { metric } = usePulseBoard({ screenName: 'HomeScreen' });

  const [context, setContext] = useState<EnrichedContext | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastEvent, setLastEvent] = useState<string | null>(null);
  const loadStart = useRef(Date.now());

  useEffect(() => {
    PulseBoard.getContext().then(ctx => {
      setContext(ctx);
      setLoading(false);
      const loadTime = Date.now() - loadStart.current;
      metric('home_screen_load_time', loadTime, { payload: { unit: 'ms' } });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PulseBoardErrorBoundary screenName="HomeScreen">
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Header />
        <ContextCards loading={loading} context={context} />
        <LastEventInfo lastEvent={lastEvent} />

        {/* Navigation to feature screens */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SDK Features</Text>

          <ScreenButton
            label="Logs"
            description="Manual logging, console capture, log levels: debug / info / warn / error"
            color={Colors.blue}
            onPress={() => {
              setLastEvent('navigate → LogsScreen');
              navigation.navigate('Logs');
            }}
          />
          <ScreenButton
            label="Feedback"
            description="Bug reports, feature requests and general feedback with optional screenshot"
            color={Colors.purple}
            onPress={() => {
              setLastEvent('navigate → FeedbackScreen');
              navigation.navigate('Feedback');
            }}
          />
          <ScreenButton
            label="Crash Reporting"
            description="Fatal / non-fatal crashes, error capture and unhandled rejection tracking"
            color={Colors.red}
            onPress={() => {
              setLastEvent('navigate → CrashScreen');
              navigation.navigate('Crash');
            }}
          />
          <ScreenButton
            label="API Tracking"
            description="Track HTTP calls — endpoint, method, status code, duration and payload size"
            color={Colors.blue}
            onPress={() => {
              setLastEvent('navigate → ApiScreen');
              navigation.navigate('Api');
            }}
          />
          <ScreenButton
            label="Session Management"
            description="Start/end sessions, identify users, track screens and flush the event queue"
            color={Colors.green}
            onPress={() => {
              setLastEvent('navigate → SessionScreen');
              navigation.navigate('Session');
            }}
          />
        </View>

        <Footer />
      </ScrollView>
    </PulseBoardErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: 24, paddingBottom: 48 },
  section: { marginTop: 8, gap: 8 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.muted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
});
