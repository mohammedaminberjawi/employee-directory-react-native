import * as React from 'react';
import {createContext, useReducer} from 'react';

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
};

type EmployeesContextType = {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
};

export const EmployeesContext = createContext<EmployeesContextType | null>({
  employees: [],
  setEmployees: () => {},
});

function employeesReducer(
  state: Employee[],
  action: {type: EmployeesContextActionType; payload: any},
) {
  switch (action.type) {
    case EmployeesContextActionType.SET:
      return action.payload;
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

  const value = {
    employees: employeesState,
    setEmployees: setEmployees,
  };

  return (
    <EmployeesContext.Provider value={value}>
      {children}
    </EmployeesContext.Provider>
  );
}
