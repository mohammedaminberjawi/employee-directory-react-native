import {Pressable, View, Text, StyleSheet} from 'react-native';

import {GlobalStyles} from '../../constants/styles';

type ButtonProps = {
  children: string;
  onPress: () => void;
  mode?: string;
  style?: {};
};

export default function Button({children, onPress, mode, style}: ButtonProps) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => pressed && styles.pressed}>
        <View style={[styles.button, mode === 'flat' && styles.flat]}>
          <Text style={[styles.text, mode === 'flat' && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.royalBlue,
  },
  flat: {
    backgroundColor: GlobalStyles.colors.white,
  },
  text: {
    color: GlobalStyles.colors.white,
    textAlign: 'center',
  },
  flatText: {
    color: GlobalStyles.colors.royalBlue,
  },
  pressed: {
    opacity: 0.75,
  },
});
