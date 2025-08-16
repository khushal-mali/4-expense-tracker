import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";

const RecentExpense = () => {
  const { expenses } = useContext(ExpenseContext);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Assuming expense.date is a Date object or a string that can be parsed to Date
    const expenseDate = new Date(expense.date);
    console.log(expenseDate, date7DaysAgo);

    return expenseDate >= date7DaysAgo && expenseDate <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod={"Last 7 Days"}
      fallbackText={"No expenses registered for last 7 days."}
    />
  );
};

export default RecentExpense;

const styles = StyleSheet.create({});
