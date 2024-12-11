import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react";
import {
  budgetReducer,
  BudgetState,
  BudgetActions,
  initialState,
} from "../reducers/budget-reducer";

type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
  expent: number;
  available: number;
};

// export const BudgetContext = createContext<BudgetContextProps>(null!);
export const BudgetContext = createContext<BudgetContextProps>(
  {} as BudgetContextProps
);

type BudgetProviderProps = {
  children: ReactNode;
};

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const expent = useMemo(() => {
    return state.expenses.reduce((total, exp) => total + (exp.amount ?? 0), 0);
  }, [state.expenses]);

  const available = useMemo(() => {
    return state.budget - expent;
  }, [state.budget, expent]);

  return (
    <BudgetContext.Provider value={{ state, expent, available, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
};
