import { PulseBoard } from '@pulseboard/react-native';
import { PULSEBOARD_API_KEY, PULSEBOARD_HOST } from './pulseboard.local';

// Android emulator: 10.0.2.2 maps to your machine's localhost
// iOS simulator:    localhost or 127.0.0.1
// Physical device:  your machine's local IP (run `ipconfig getifaddr en0` on Mac)

export function initPulseBoard() {
  try {
    PulseBoard.init({
      apiKey: PULSEBOARD_API_KEY,
      debug: __DEV__,
      environment: __DEV__ ? 'development' : 'production',
      host: PULSEBOARD_HOST,
    });
  } catch (err) {
    console.error('Failed to initialize PulseBoard:', err);
  }
}
