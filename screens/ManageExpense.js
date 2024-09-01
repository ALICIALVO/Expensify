import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import Colors from "../constants/colors";
// import Button from "../components/UI/Button";

import {
  storeExpenseData,
  updateExpenseData,
  deleteExpenseData,
} from "../utils/http";

// import DUMMY_EXPENSES from "../data/dummy-expenses";
//Components:
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
//ui:
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
//context:
import { ExpensesContext } from "../store/expenses-context";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const [isSubmitingData, setIsSubmitingData] = useState(false);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);
  isSubmitingData;

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function onDeleteExpenseHandler() {
    setIsSubmitingData(true);
    try {
      await deleteExpenseData(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense - please try again later");
      setIsSubmitingData(false);
      console.log(error.message);
    }
    // console.log("deleted pressed");
  }

  function onCancelHandler() {
    navigation.goBack();
    // console.log("canceled");
  }

  async function onComfirmHandler(expenseData) {
    setIsSubmitingData(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpenseData(editedExpenseId, expenseData);
      } else {
        const id = await storeExpenseData(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later!");
      setIsSubmitingData(false);
    }
  }
  function errorHandler() {
    setError(null);
  }

  if (error && !isSubmitingData) {
    return <ErrorOverlay msg={error} onConfirm={errorHandler} />;
  }
  if (isSubmitingData) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={onCancelHandler}
        onSubmit={onComfirmHandler}
        defaultInputValue={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteButtonContainer}>
          <IconButton
            icon="trash-outline"
            color={Colors.primary200}
            size={36}
            onPress={onDeleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary800,
    padding: 24,
  },
  deleteButtonContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: Colors.primary500,
    alignItems: "center",
  },
});

//edit expenses screen will be opened once a expense item is pressed and this item can be updated or deleted.
// cancel Button
// add button that close modal
// delete button
