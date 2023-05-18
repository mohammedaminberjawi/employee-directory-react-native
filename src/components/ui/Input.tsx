import {View, Text, TextInput, TextInputProps, StyleSheet} from 'react-native';

import {GlobalStyles} from '../../constants/styles';

type InputProps = {
  label: string;
  inValid: boolean;
  textInputConfig: TextInputProps;
  style?: {};
};

export default function Input({
  label,
  inValid,
  textInputConfig,
  style,
}: InputProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, inValid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, inValid && styles.invalidInput]}
        {...textInputConfig}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.royalBlue,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.mediumBlue,
    borderBottomColor: GlobalStyles.colors.mediumBlue,
    borderBottomWidth: 2,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.white,
  },
  invalidLabel: {
    color: GlobalStyles.colors.errorLight,
  },
  invalidInput: {
    borderBottomColor: GlobalStyles.colors.errorLight,
  },
});
