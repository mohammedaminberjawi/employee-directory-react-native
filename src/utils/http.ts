import axios from 'axios';
import {Employee} from '../store/employees-context';

export const BASE_URL: string = 'http://localhost:8080';

export async function fetchEmployees() {
  const response = await axios.get(`${BASE_URL}/api/employees`);
  return response.data;
}

export async function createEmployee(employee: Employee) {
  const response = await axios.post(
    `${BASE_URL}/api/employees`,
    prepareFormData(employee),
  );

  return response.data;
}

export async function updateEmployee(id: string, employee: Employee) {
  const response = await axios.put(
    `${BASE_URL}/api/employees/${id}`,
    prepareFormData(employee),
  );

  return response.data;
}

export function deleteEmployee(id: string) {
  return axios.delete(`${BASE_URL}/api/employees/${id}`);
}

function prepareFormData(employee: Employee) {
  const employeeData = new FormData();

  employeeData.append('firstName', employee.firstName);
  employeeData.append('lastName', employee.lastName);
  employeeData.append('birthDate', employee.birthDate);
  employeeData.append('title', employee.title);
  employeeData.append('department', employee.department);
  employeeData.append('location', employee.location);
  employeeData.append('email', employee.email);

  if (employee.updateImage)
    employeeData.append('profileImage', {
      uri: employee.updateImage.uri,
      name: employee.updateImage.fileName,
      filename: employee.updateImage.fileName,
      type: employee.updateImage.type,
    });

  return employeeData;
}
