import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

export function ExpensesSummary({ expenses, periodName }) {

    const expensesSum = expenses.reduce((sum, expense)=> {
        return sum + expense.amount
    }, 0);

    return(
  <View style={styles.container}>
    <Text style={styles.periodText}>{periodName}</Text>
    <Text style={styles.sumText}>${expensesSum.toFixed(2)}</Text>
  </View>
    )
}


export default ExpensesSummary;


const styles = StyleSheet.create({

  container: {
    // flex: 1,
    padding: 8,
    margin: 10,
    flexDirection: 'row',
    backgroundColor: Colors.primary500,
    borderRadius: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    // maxWidth: '90%',
    overflow: 'hidden',

  }, 
  periodText: {
    fontSize: 12,
    color: Colors.primary300,
  },
  sumText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary800,
  }
});