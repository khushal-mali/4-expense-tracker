import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";

const AllExpenses = () => {
  const { expenses } = useContext(ExpenseContext);

  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod={"Total"}
      fallbackText={"No registered expenses found!"}
    />
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
