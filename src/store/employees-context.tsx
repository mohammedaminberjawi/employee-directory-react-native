import * as React from 'react';
import {createContext, useReducer} from 'react';
import {Asset} from 'react-native-image-picker';

export type Employee = {
  id?: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  location: string;
  title: string;
  department: string;
  email: string;
  profileImage?: string;
  updateImage?: Asset;
};

type EmployeesContextType = {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
  addEmployee: (employee: Employee) => void;
  deleteEmployee: (id: string) => void;
  updateEmployee: (id: string, employee: Employee) => void;
};

export const EmployeesContext = createContext<EmployeesContextType | null>({
  employees: [],
  setEmployees: () => {},
  addEmployee: () => {},
  deleteEmployee: () => {},
  updateEmployee: () => {},
});

function employeesReducer(
  state: Employee[],
  action: {type: EmployeesContextActionType; payload: any},
) {
  switch (action.type) {
    case EmployeesContextActionType.SET:
      return action.payload;
    case EmployeesContextActionType.ADD:
      return [{...action.payload}, ...state];
    case EmployeesContextActionType.UPDATE:
      const updatableEmployeeIndex = state.findIndex(
        (employee: Employee) => employee.id === action.payload.id,
      );

      const updatableEmployee = state[updatableEmployeeIndex];
      const updatedItem = {...updatableEmployee, ...action.payload.data};
      const updatedEmployees = [...state];
      updatedEmployees[updatableEmployeeIndex] = updatedItem;
      return updatedEmployees;
    case EmployeesContextActionType.DELETE:
      return state.filter(
        (employee: Employee) => employee.id !== action.payload,
      );
    default:
      return state;
  }
}

enum EmployeesContextActionType {
  SET,
  ADD,
  UPDATE,
  DELETE,
}

type EmployeesContextProviderProps = {
  children: JSX.Element;
};

export default function EmployeesContextProvider({
  children,
}: EmployeesContextProviderProps) {
  const [employeesState, dispatch] = useReducer(employeesReducer, []);

  function setEmployees(employees: Employee[]) {
    dispatch({type: EmployeesContextActionType.SET, payload: employees});
  }
  function addEmployee(employee: Employee) {
    dispatch({type: EmployeesContextActionType.ADD, payload: employee});
  }
  function updateEmployee(id: string, employee: Employee) {
    dispatch({
      type: EmployeesContextActionType.UPDATE,
      payload: {id: id, data: employee},
    });
  }
  function deleteEmployee(id: string) {
    dispatch({type: EmployeesContextActionType.DELETE, payload: id});
  }

  const value = {
    employees: employeesState,
    setEmployees: setEmployees,
    addEmployee: addEmployee,
    updateEmployee: updateEmployee,
    deleteEmployee: deleteEmployee,
  };

  return (
    <EmployeesContext.Provider value={value}>
      {children}
    </EmployeesContext.Provider>
  );
}
