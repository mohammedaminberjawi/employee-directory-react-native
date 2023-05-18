import {Text, StyleSheet, View} from 'react-native';

import Button from './Button';
import {GlobalStyles} from '../../constants/styles';

type Props = {
  message: string;
  onConfirm: () => void;
};

export default function ErrorOverlay({message, onConfirm}: Props) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}> An error occured </Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    marginBottom: 8,
    color: GlobalStyles.colors.royalBlue,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
