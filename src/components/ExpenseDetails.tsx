import { useMemo } from "react";
import { Expense } from "../types";
import { formatDate } from "../utils";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/categories";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  TrailingActions,
  SwipeAction,
} from "react-swipeable-list";
import { useBudget } from "../hooks/useBudget";

import "react-swipeable-list/dist/styles.css";

type ExpenseDetailsProps = {
  expense: Expense;
};

const ExpenseDetails = ({ expense }: ExpenseDetailsProps) => {
  const { dispatch } = useBudget();

  const categoryInfo = useMemo(
    () => categories.filter((cat) => cat.id === expense.category)[0],
    [expense]
  );

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          dispatch({ type: "GET_EXPENSE_BY_ID", payload: { id: expense.id } });
        }}
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => {
          dispatch({ type: "DELETE_EXPENSE", payload: { id: expense.id } });
        }}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList className='SwipeableList'>
      <SwipeableListItem
        maxSwipe={1}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div
          className='bg-white p-10  w-full border-b border-gray-200rounded-md 
    shadow-md flex gap-5 items-center'
        >
          <div>
            <img
              src={`/icono_${categoryInfo.icon}.svg`}
              alt={categoryInfo.name}
              className='w-20'
            />
          </div>

          <div className='flex flex-col flex-1 space-y-2'>
            <p className='text-md font-bold uppercase text-primary'>
              {categoryInfo.name}
            </p>
            <p>{expense.expenseName}</p>
            <p className='text-primary text-sm'>
              {formatDate(expense.date!.toString())}
            </p>
          </div>

          <AmountDisplay amount={expense.amount!} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default ExpenseDetails;
