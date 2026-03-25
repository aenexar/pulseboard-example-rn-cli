import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../constants';

type Props = {
  label: string;
  code: string;
  color?: string;
  onPress: () => void;
};

export const ActionButton: React.FC<Props> = ({
  label,
  code,
  color = Colors.border,
  onPress,
}) => (
  <TouchableOpacity
    style={[styles.button, { borderColor: color }]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.code}>{code}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  code: {
    fontSize: 11,
    color: Colors.muted,
    fontFamily: 'monospace',
  },
});
