import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useContext, useEffect, useState} from 'react';
import filter from 'lodash.filter';

import EmployeeList from '../components/EmployeeList';
import {Employee, EmployeesContext} from '../store/employees-context';
import {fetchEmployees} from '../utils/http';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';
import Input from '../components/ui/Input';
import {GlobalStyles} from '../constants/styles';

export default function AllEmployees() {
  const employeesContext = useContext(EmployeesContext);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<Employee[]>([]);

  useEffect(() => {
    getEmployees();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onQueryChange(query ? query : '');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeesContext?.employees]);

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

  function onQueryChange(searchQuery: string) {
    setQuery(searchQuery);

    const filtered: Employee[] = filter(
      employeesContext?.employees,
      (employee: Employee) => {
        return contains(employee, searchQuery.toLowerCase());
      },
    );

    setFilteredData(filtered);
  }

  const contains = (employee: Employee, searchQuery: string) => {
    return (
      employee.firstName.toLowerCase().includes(searchQuery) ||
      employee.lastName.toLowerCase().includes(searchQuery) ||
      `${employee.firstName.toLowerCase()} ${employee.lastName.toLowerCase()}`.includes(
        searchQuery,
      ) ||
      employee.email.toLowerCase().includes(searchQuery) ||
      employee.title.toLowerCase().includes(searchQuery) ||
      employee.location.toLowerCase().includes(searchQuery) ||
      employee.department.toLowerCase().includes(searchQuery)
    );
  };

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
        <Input
          label={''}
          inValid={false}
          textInputConfig={{
            placeholder: 'Search',
            clearButtonMode: 'always',
            autoCapitalize: 'none',
            autoCorrect: false,
            value: query ? query : '',
            onChangeText: onQueryChange,
          }}
        />
        <EmployeeList
          employees={filteredData}
          refreshing={isLoading}
          onRefresh={getEmployees}
        />
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
