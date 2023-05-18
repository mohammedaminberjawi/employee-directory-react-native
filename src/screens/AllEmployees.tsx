import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function AllEmployees() {
  return (
    <View style={styles.container}>
      <Text>ALL EMPLOYEES</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
});
