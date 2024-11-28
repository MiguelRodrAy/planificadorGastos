import { useMemo } from "react";
import { Expense } from "../types";
import { formatDate } from "../utils";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/categories";

type ExpenseDetailsProps = {
  expense: Expense;
};

const ExpenseDetails = ({ expense }: ExpenseDetailsProps) => {
  const categoryInfo = useMemo(
    () => categories.filter((cat) => cat.id === expense.category)[0],
    [expense]
  );

  return (
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
  );
};

export default ExpenseDetails;
