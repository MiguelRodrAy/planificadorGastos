import { useBudget } from "../hooks/useBudget";
import { useMemo } from "react";
import Expense from "./ExpenseDetails";

const ExpenseList = () => {
  const { state } = useBudget();

  const isEmpty = useMemo(() => {
    return state.expenses.length === 0;
  }, [state.expenses]);

  return (
    <div className='mt-10 flex flex-col gap-5'>
      {isEmpty ? (
        <div className='flex justify-center my-10'>
          <p className='text-2xl text-primary font-bold'>No hay gastos aún</p>
        </div>
      ) : (
        <>
          <p className='text-2xl text-primary font-bold'>Listado de gastos</p>
          {state.expenses.map((expense) => (
            <Expense key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  );
};

export default ExpenseList;
