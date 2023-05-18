import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useContext, useEffect, useState} from 'react';

import {EmployeesContext} from '../store/employees-context';
import {fetchEmployees} from '../utils/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import {GlobalStyles} from '../constants/styles';

export default function AllEmployees() {
  const employeesContext = useContext(EmployeesContext);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEmployees();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getEmployees() {
    try {
      const employees = await fetchEmployees();
      employeesContext?.setEmployees(employees);
    } catch (e) {
      setError('Could not fetch employees!');
    }
    setIsLoading(false);
  }

  function errorHandler() {
    getEmployees();
    setError(null);
  }

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  let content = (
    <View style={styles.emptyTextContainer}>
      <Text style={styles.emptyText}>No employees registered found!</Text>
    </View>
  );

  if (
    employeesContext?.employees != null &&
    employeesContext.employees.length > 0
  ) {
    content = (
      <View>
        <Text>ALL EMPLOYEES</Text>
      </View>
    );
  }

  return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  emptyTextContainer: {
    paddingTop: 24,
  },
  emptyText: {
    fontSize: 20,
    textAlign: 'center',
    color: GlobalStyles.colors.errorDark,
  },
});
