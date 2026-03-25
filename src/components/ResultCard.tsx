import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants';

type Props = {
  result: string | null;
  color?: string;
};

export const ResultCard: React.FC<Props> = ({
  result,
  color = Colors.green,
}) => {
  if (!result) return null;
  return (
    <View style={[styles.card, { borderColor: color }]}>
      <Text style={[styles.label, { color }]}>Result</Text>
      <Text style={styles.value}>{result}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  label: {
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  value: {
    fontSize: 13,
    color: Colors.text,
    fontFamily: 'monospace',
    lineHeight: 20,
  },
});
