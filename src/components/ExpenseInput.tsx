import { useState, ChangeEvent, FormEvent } from "react";
import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import type { DraftExpense, Value } from "../types";
import "../index.css";
import ErrorMsg from "./ErrorMsg";

import { useBudget } from "../hooks/useBudget";

const ExpenseInput = () => {
  const [expense, setExpense] = useState<DraftExpense>({
    expenseName: "",
    amount: null,
    category: "",
    date: new Date(),
  });

  const [error, setError] = useState("");

  const { dispatch } = useBudget();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isNumber = name === "amount";
    setExpense({
      ...expense,
      [name]: isNumber ? (value ? +value : null) : value,
    });
  };

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      Object.values(expense).includes("") ||
      Object.values(expense).includes(null)
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }

    dispatch({
      type: "ADD_EXPENSE",
      payload: { expense },
    });

    setExpense({
      expenseName: "",
      amount: null,
      category: "",
      date: new Date(),
    });
  };

  return (
    <form className='space-y-5' onSubmit={handleSubmit}>
      <legend className='uppercase text-center text-2xl font-bold border-b-4 py-2 border-primary'>
        Nuevo Gasto
      </legend>

      <div className='flex flex-col gap-2'>
        <label htmlFor='expenseName' className='text-xl'>
          Nombre Gasto:
        </label>
        <input
          type='text'
          id='expenseName'
          placeholder='Ej: Transporte, Almuerzo...'
          className='bg-slate-200 p-2'
          name='expenseName'
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='amount' className='text-xl'>
          Cantidad:
        </label>
        <input
          type='number'
          id='amount'
          placeholder='Ej: 5, 10, 50, 100...'
          className='bg-slate-200 p-2'
          name='amount'
          value={expense.amount ?? ""}
          onChange={handleChange}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='category' className='text-xl'>
          Categoría:
        </label>
        <select
          id='category'
          className='bg-slate-200 p-2 outline-none border-none'
          name='category'
          value={expense.category}
          onChange={handleChange}
        >
          <option value=''>Selecciona una...</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='date' className='text-xl'>
          Fecha:
          <DatePicker
            className='bg-slate-200 p-2'
            name='date'
            value={expense.date}
            onChange={handleChangeDate}
          />
        </label>
      </div>

      {error && <ErrorMsg>{error}</ErrorMsg>}

      <input
        type='submit'
        className='bg-secondary custom-animated-text cursor-pointer w-full py-2 text-white uppercase font-bold rounded-lg'
        value={"Agregar Gasto"}
      ></input>
    </form>
  );
};

export default ExpenseInput;
