import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 56.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A pair of pants",
    amount: 69.99,
    date: new Date("2021-12-26"),
  },
  {
    id: "e3",
    description: "A pair of t-shirts",
    amount: 73.99,
    date: new Date("2022-12-19"),
  },
  {
    id: "e4",
    description: "Bought Apples",
    amount: 73.99,
    date: new Date("2022-12-19"),
  },
  {
    id: "e5",
    description: "Video Game",
    amount: 433.99,
    date: new Date("2023-1-10"),
  },
];

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  updateExpense: (id, { description, amount, date }) => {},
  deleteExpense: (id) => {},
});

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];

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
  const [expensesState, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  }

  function deleteExpense(expenseId) {
    dispatch({ type: "DELETE", payload: expenseId });
  }

  const value = { expenses: expensesState, addExpense, updateExpense, deleteExpense };

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
}
