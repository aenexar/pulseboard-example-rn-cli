import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants';

type Props = {
  label: string;
  description: string;
  color?: string;
  onPress: () => void;
};

export const ScreenButton: React.FC<Props> = ({
  label,
  description,
  color = Colors.green,
  onPress,
}) => (
  <TouchableOpacity
    style={[styles.button, { borderColor: color + '60' }]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.row}>
      <Text style={[styles.label, { color }]}>{label}</Text>
      <Text style={[styles.arrow, { color }]}>→</Text>
    </View>
    <Text style={styles.description}>{description}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
  },
  arrow: {
    fontSize: 18,
  },
  description: {
    fontSize: 12,
    color: Colors.muted,
    lineHeight: 18,
  },
});
