import { StyleSheet, View, Text } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";


//data:
// import DUMMY_EXPENSES from "../../data/dummy-expenses";
import Colors from "../../constants/colors";

export function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
  
  let content = <Text style={styles.fallbackText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  } else {
    content = content;
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingButtom: 0,
    backgroundColor: Colors.primary800,
  },
  fallbackText: {
    // flex: 1,
    backgroundColor: Colors.primary800,
    color: Colors.primary200,
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});

//show short summery about all the expenses and a list of all expenses and relevent onces.
