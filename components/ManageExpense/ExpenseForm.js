import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

//Utilis:
import { getFormatedDate } from "../../utils/date";

//Components:
import Input from "./Input";
import Colors from "../../constants/colors";
import Button from "../UI/Button";

export function ExpenseForm({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultInputValue,
}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultInputValue ? defaultInputValue.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultInputValue ? getFormatedDate(defaultInputValue.date) : "",
      isValid: true,
    },
    description: {
      value: defaultInputValue ? defaultInputValue.description.toString() : "",
      isValid: true,
      // isValid: defaultInputValue ? true : false, when using this we get this error messege initly and we dont want it.
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((currInputs) => {
      const updatedValues = {
        ...currInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
      console.log(updatedValues);

      return updatedValues;
    });
  }

  function onSubmitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //show feedback
      //  Alert.alert("Invalid input", "Please check your input values");
      setInputs((currInputs) => {
        return {
          amount: { value: currInputs.amount.value, isValid: amountIsValid },
          date: { value: currInputs.date.value, isValid: dateIsValid },
          description: {
            value: currInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    } else {
    }
    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs.amount["value"],
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs.date["value"],
          }}
        />
      </View>

      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description["value"],
          // autoCapitalize: 'none',
          // autoCorrect: false,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>Invalid input values - Please check your entered data</Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={onSubmitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}
export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    color: Colors.primary650,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 24,
  },
  inputsRow: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 20,
  },
  errorText: {
    textAlign: 'center',
    color: Colors.errorC1,
    margin: 8,
  }
});
