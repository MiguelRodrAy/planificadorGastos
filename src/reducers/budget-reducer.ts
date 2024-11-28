import { v4 as uuid } from "uuid";
import { DraftExpense, Expense } from "../types";

export type BudgetActions =
  | {
      type: "SET_BUDGET";
      payload: { budget: number };
    }
  | {
      type: "SHOW-MODAL";
    }
  | {
      type: "CLOSE-MODAL";
    }
  | {
      type: "ADD_EXPENSE";
      payload: { expense: DraftExpense };
    }
  | {
      type: "DELETE_EXPENSE";
      payload: { id: Expense["id"] };
    }
  | {
      type: "GET_EXPENSE_BY_ID";
      payload: { id: Expense["id"] };
    }
  | {
      type: "UPDATE_EXPENSE";
      payload: { expense: Expense };
    };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingExpense: Expense["id"];
};

const initialBudget = (): number => {
  const localBudget = localStorage.getItem("budget");

  return localBudget ? +localBudget : 0;
};

const initialExpenses = (): Expense[] => {
  const localExpenses = localStorage.getItem("expenses");

  return localExpenses ? JSON.parse(localExpenses) : [];
};

export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: initialExpenses(),
  editingExpense: "",
};

const createExpense = (expense: DraftExpense): Expense => ({
  ...expense,
  id: uuid(),
});

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  switch (action.type) {
    case "SET_BUDGET":
      return { ...state, budget: action.payload.budget };

    case "SHOW-MODAL":
      return { ...state, modal: true };

    case "CLOSE-MODAL":
      return { ...state, modal: false, editingExpense: "" };

    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, createExpense(action.payload.expense)],
        modal: false,
      };

    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter((exp) => exp.id !== action.payload.id),
      };

    case "GET_EXPENSE_BY_ID":
      return {
        ...state,
        editingExpense: action.payload.id,
        modal: true,
      };

    case "UPDATE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.expense.id
            ? action.payload.expense
            : expense
        ),
        modal: false,
        editingExpense: "",
      };

    default:
      return state;
  }
};
