# PulseBoard React Native CLI Example

> A working React Native CLI example demonstrating the full
> [@pulseboard/react-native](https://www.npmjs.com/package/@pulseboard/react-native)
> SDK integration.

Built by [Aenexar](https://github.com/aenexar).

## Prerequisites

- Node.js 22+
- Ruby 3.0+ (iOS)
- Xcode 15+ (iOS)
- Android Studio (Android)
- React Native CLI - [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment)

## Setup

**1 — Install dependencies:**

```bash
npm install
```

**2 — iOS only — install pods:**

```bash
npx pod-install
```

**3 — Configure PulseBoard:**

```bash
cp .env.example .env
```

Open `.env` and add your PulseBoard backend URL and project API key:

```env
PULSEBOARD_HOST=https://your-backend-url.com
PULSEBOARD_API_KEY=your-project-api-key
```

**4 — Start Metro bundler:**

```bash
npm start
```

**5 — Run on device or simulator:**

```bash
# iOS
npm run ios

# Android
npm run android
```

## What's Demonstrated

| Feature                     | Description                         |
| --------------------------- | ----------------------------------- |
| `PulseBoard.init()`         | SDK initialisation with app context |
| `PulseBoard.identify()`     | User identification                 |
| `PulseBoard.track()`        | Custom event tracking               |
| `PulseBoard.trackScreen()`  | Screen view with load time          |
| `PulseBoard.trackApiCall()` | API call performance tracking       |
| `PulseBoard.trackCrash()`   | Manual crash reporting              |
| `PulseBoard.startSession()` | Session lifecycle management        |
| `PulseBoard.endSession()`   | Session end with duration           |
| `PulseBoardErrorBoundary`   | Automatic error boundary capture    |

## SDK Version

This example uses `@pulseboard/react-native@^0.1.1`

## Related

- [SDK Repository](https://github.com/aenexar/pulseboard-react-native)
- [npm Package](https://www.npmjs.com/package/@pulseboard/react-native)
- [PulseBoard by Aenexar](https://github.com/aenexar)

## License

MIT — © 2026 Aenexar.
