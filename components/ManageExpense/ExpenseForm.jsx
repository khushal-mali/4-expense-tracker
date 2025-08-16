import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import Button from "../ui/Button";
import { getFormattedDate } from "../../utils/date";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = ({ defaultValues, submitBtnLabel, onCancel, onSubmit }) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  const inputChangeHandler = (inputIdentifier, enteredText) => {
    setInputs((currectInputs) => {
      return {
        ...currectInputs,
        [inputIdentifier]: { value: enteredText, isValid: true },
      };
    });
  };

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid =
      expenseData.date.toString() !== "Invalid Date" &&
      Date.now() >= expenseData.date.getTime();
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert("Invalid Input", "Please check your input values");

      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        {/* <Text>ExpenseForm</Text> */}
        <Input
          label={"Amount"}
          style={styles.rowInput}
          invalid={!inputs.amount.isValid}
          textIntpuConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          label={"Date"}
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
          textIntpuConfig={{
            placeholder: "YYYY-MM-DD",
            keyboardType: "decimal-pad",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>

      <Input
        label={"Description"}
        invalid={!inputs.description.isValid}
        textIntpuConfig={{
          placeholder: "YYYY-MM-DD",
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />

      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - Please check your entered data!
        </Text>
      )}
      <View style={styles.buttonStyle}>
        <Button style={styles.button} mode={"flat"} onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitBtnLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: { marginTop: 40 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 24,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: { flex: 1 },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttonStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: { minWidth: 120, marginHorizontal: 8 },
});
