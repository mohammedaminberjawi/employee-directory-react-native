import axios from 'axios';

export const BASE_URL: string = 'http://localhost:8080';

export async function fetchEmployees() {
  const response = await axios.get(`${BASE_URL}/api/employees`);
  return response.data;
}
