import axios from "axios";

const BACKEND_URL =
  "https://react-native-course-5f9ac-default-rtdb.asia-southeast1.firebasedatabase.app";

export async function storeExpense(expenseData) {
  const res = await axios.post(`${BACKEND_URL}/expenses.json`, expenseData);
  const id = res.data.name;
  return id;
}

export async function fetchExpense() {
  const res = await axios.get(`${BACKEND_URL}/expenses.json`);

  const expenses = [];
  for (const key in res.data) {
    const expenseObj = {
      id: key,
      amount: res.data[key].amount,
      date: new Date(res.data[key].date).toISOString().slice(0, 10),
      description: res.data[key].description,
    };

    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpenseServer(id, expenseData) {
  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData);
}

export async function deleteExpenseServer(id) {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
}
