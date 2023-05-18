import * as React from 'react';
import {Pressable, StyleSheet, View, Text, Image} from 'react-native';

import {getFormattedDate} from '../utils/date';
import {GlobalStyles} from '../constants/styles';
import {Employee} from '../store/employees-context';
import PlaceholderUser from '../../assets/images/user-placeholder.png';

interface EmployeeItemProps {
  employee: Employee;
}

export default function EmployeeItem({employee}: EmployeeItemProps) {
  const employeePressHandler = () => {
    // GO TO EDIT EMPLOYEE
  };
  return (
    <Pressable
      onPress={employeePressHandler}
      style={({pressed}) => pressed && styles.pressed}>
      <View style={styles.employeeItem}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: employee.profileImage,
            }}
            style={styles.image}
            defaultSource={PlaceholderUser}
          />
        </View>
        <View style={styles.informationContainer}>
          <Text style={styles.nameText}>
            {employee.firstName} {employee.lastName}
          </Text>
          <Text>{employee.title}</Text>
          <Text>{getFormattedDate(employee.birthDate)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  employeeItem: {
    padding: 12,
    margin: 8,
    backgroundColor: GlobalStyles.colors.white,
    flexDirection: 'row',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.lightGray,
    shadowRadius: 4,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
  },
  pressed: {
    opacity: 0.75,
  },
  imageContainer: {
    marginRight: 12,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 100,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.royalBlue,
  },
  informationContainer: {
    justifyContent: 'space-around',
  },
});
