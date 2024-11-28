import { useMemo, useState } from "react";
import { FormEvent, ChangeEvent } from "react";

import { useBudget } from "../hooks/useBudget";

const BudgetInput = () => {
  const [budget, setBudget] = useState(0);

  const { dispatch } = useBudget();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(parseInt(e.target.value));
  };

  const isValid = useMemo(() => {
    return budget <= 0 || isNaN(budget);
  }, [budget]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({
      type: "SET_BUDGET",
      payload: { budget },
    });
  };

  return (
    <>
      <form className='space-y-5' onSubmit={handleSubmit}>
        <div className='flex flex-col space-y-5'>
          <label
            htmlFor='budget'
            className='text-4xl text-primary font-bold text-center '
          >
            Definir presupuesto
          </label>

          <input
            id='budgetId'
            type='number'
            className='w-full bg-white border border-slate-300 p-2'
            placeholder='Agrega tu presupuesto'
            name='budget'
            value={budget}
            onChange={handleChange}
          />
        </div>

        <input
          type='submit'
          className='w-full bg-secondary hover:bg-secondaryLight text-white 
           cursor-pointer rounded-md uppercase p-2 font-black disabled:opacity-40 disabled:cursor-not-allowed'
          value='Definir presupuesto'
          disabled={isValid}
        />
      </form>
    </>
  );
};

export default BudgetInput;
