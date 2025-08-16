import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";
import { fetchExpense } from "../utils/https";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const RecentExpense = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const { expenses, setExpenses } = useContext(ExpenseContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpense();
        setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Assuming expense.date is a Date object or a string that can be parsed to Date
    const expenseDate = new Date(expense.date);

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
