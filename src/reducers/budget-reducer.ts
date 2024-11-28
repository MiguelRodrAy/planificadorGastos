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
    };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
};

export const initialState: BudgetState = {
  budget: 0,
  modal: false,
  expenses: [],
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
      return { ...state, modal: false };

    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, createExpense(action.payload.expense)],
        modal: false,
      };
    default:
      return state;
  }
};
