import { createContext, useEffect, useReducer } from "react";
import { fetchExpense } from "../utils/https";

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  updateExpense: (id, { description, amount, date }) => {},
  deleteExpense: (id) => {},
});

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];

    case "SET":
      const inverted = action.payload.reverse();
      return inverted;

    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (exp) => exp.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };

      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

export default function ExpenseContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expenseReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  }

  function deleteExpense(expenseId) {
    dispatch({ type: "DELETE", payload: expenseId });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    setExpenses,
    updateExpense,
    deleteExpense,
  };

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
}
