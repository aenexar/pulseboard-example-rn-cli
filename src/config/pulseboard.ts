import { PulseBoard } from '@pulseboard/react-native';

// For physical device testing, replace with your machine's local IP
// Run 'ipconfig getifaddr en0' on macOS to find it

export function initPulseBoard() {
  try {
    PulseBoard.init({
      apiKey: 'YOUR_API_KEY',
      debug: __DEV__,
      environment: __DEV__ ? 'development' : 'production',
    });
  } catch (err) {
    console.error('Failed to initialize PulseBoard:', err);
  }
}
