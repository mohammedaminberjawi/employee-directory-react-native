import {FlatList, ListRenderItemInfo} from 'react-native';

import EmployeeItem from './EmployeeItem';
import {Employee} from '../store/employees-context';

type EmployeeListProps = {
  employees: Employee[];
  refreshing: boolean;
  onRefresh: () => void;
};

function renderEmployee(itemData: ListRenderItemInfo<Employee>) {
  return <EmployeeItem employee={itemData.item} />;
}

export default function EmployeeList({
  employees,
  refreshing,
  onRefresh,
}: EmployeeListProps) {
  return (
    <FlatList
      style={{height: '100%'}}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 100}}
      data={employees}
      renderItem={renderEmployee}
      refreshing={refreshing}
      onRefresh={onRefresh}
      keyExtractor={(item, index) => (item.id ? item.id : '') + index}
    />
  );
}
