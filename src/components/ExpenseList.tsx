import { useBudget } from "../hooks/useBudget";
import { useMemo } from "react";
import Expense from "./ExpenseDetails";

const ExpenseList = () => {
  const { state } = useBudget();

  const filteredExpenses = state.currentCategory
    ? state.expenses.filter((exp) => exp.category === state.currentCategory)
    : state.expenses;

  const isEmpty = useMemo(
    () => filteredExpenses.length === 0,
    [filteredExpenses]
  );

  return (
    <div className='mt-10 flex flex-col gap-5'>
      {isEmpty ? (
        <div className='flex justify-center my-10'>
          <p className='text-2xl text-primary font-bold'>No hay gastos aún</p>
        </div>
      ) : (
        <>
          <p className='text-2xl text-primary font-bold'>Listado de gastos</p>
          {filteredExpenses.map((expense) => (
            <Expense key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  );
};

export default ExpenseList;
