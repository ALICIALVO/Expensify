import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";

//context:
import { ExpensesContext } from "../store/expenses-context";

//components:
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";


export function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <View style={styles.screen}>
      <ExpensesOutput expensesPeriod="Total" expenses={expensesCtx.expenses} fallbackText='No registered expenses found!'/>
    </View>
  );
}

export default AllExpenses;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
