import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootParamList} from '../../App';

type HandleEmployeeProps = NativeStackScreenProps<
  RootParamList,
  'HandleEmployees'
>;

export default function HandleEmployee({}: HandleEmployeeProps) {
  return (
    <View style={styles.container}>
      <Text>HANDLE EMPLOYEE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
