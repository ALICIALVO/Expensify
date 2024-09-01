import { FlatList } from "react-native";

// import DUMMY_EXPENSES from "../../data/dummy-expenses";

import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
  return (
   <ExpenseItem {...itemData.item}/>
  );
}

export function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;


