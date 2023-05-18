import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {useContext, useLayoutEffect, useState} from 'react';

import {GlobalStyles} from '../constants/styles';
import IconButton from '../components/UI/IconButton';
import {Employee, EmployeesContext} from '../store/employees-context';
import EmployeeForm from '../components/EmployeeForm';
import {deleteEmployee, createEmployee, updateEmployee} from '../utils/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootParamList} from '../App';

type HandleEmployeeProps = NativeStackScreenProps<
  RootParamList,
  'HandleEmployees'
>;

export default function HandleEmployee({
  route,
  navigation,
}: HandleEmployeeProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const employeeContext = useContext(EmployeesContext);

  const editedEmployeeId = route.params?.employeeId;
  const selectedEmployee = employeeContext?.employees.find(
    employee => employee.id === editedEmployeeId,
  );
  const isEditing = !!editedEmployeeId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Employee' : 'Add Employee',
    });
  }, [navigation, isEditing]);

  const cancelHandler = () => {
    closeModal();
  };

  const confirmHandler = async (employee: Employee) => {
    setIsLoading(true);
    try {
      if (isEditing) {
        const res = await updateEmployee(editedEmployeeId, employee);
        employeeContext?.updateEmployee(editedEmployeeId, res);
      } else {
        const res = await createEmployee(employee);
        employeeContext?.addEmployee(res);
      }
      closeModal();
    } catch (e) {
      setError('Could not update employee. Please try again later!');
      setIsLoading(false);
    }
  };

  const deleteEmployeeHandler = async () => {
    setIsLoading(true);
    try {
      await deleteEmployee(editedEmployeeId);
      employeeContext?.deleteEmployee(editedEmployeeId);
      closeModal();
    } catch (e) {
      setError('Could not delete employee. Please try again later!');
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    navigation.goBack();
  };

  function errorHandler() {
    setError(null);
  }

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <EmployeeForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        editedEmployee={selectedEmployee}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.errorDark}
            onPress={deleteEmployeeHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.royalBlue,
    alignItems: 'center',
  },
});
