import { useReducer, createContext, Dispatch, ReactNode } from "react";
import {
  budgetReducer,
  BudgetState,
  BudgetActions,
  initialState,
} from "../reducers/budget-reducer";

type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
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

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
};
