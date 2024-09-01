import { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/colors";

//http get request:
import { fetchExpenseData } from "../utils/http";

//utils:
import { getDateMinusDays } from "../utils/date";

//context:
import { ExpensesContext } from "../store/expenses-context";

//components:
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

//ui:
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export function RecentExpenses() {
  // const [fetchedExpenses, setFetchedExpenses] = useState([])
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try{
        const expenses = await fetchExpenseData();
        expensesCtx.setExpenses(expenses);
        // setFetchedExpenses(expenses);
      }catch(err){
        setError('Could not fetch expenses!');
        console.log(err.message);
        
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  async function errorHandler(){
    setError(null);
   setIsFetching(true);
    try {
    const expenses = await fetchExpenseData();
    expensesCtx.setExpenses(expenses);
    } catch (error) {
      setError('Could not fetch expenses!');
      console.log(error.message);
      
    }
    setIsFetching(false);
  }

    if(error && !isFetching){
      return <ErrorOverlay msg={error} onConfirm={errorHandler}/>
    }
  if (isFetching) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.screen}>
      <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod="Last 7 days"
        fallbackText="No expenses registered for the last 7 days"
      />
    </View>
  );
}

export default RecentExpenses;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  text: {
    flex: 1,
    backgroundColor: Colors.primary800,
  },
});
