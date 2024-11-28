import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";
import { useMemo } from "react";

const BudgetTracker = () => {
  const { state } = useBudget();

  const expent = useMemo(() => {
    return state.expenses.reduce((total, exp) => total + (exp.amount ?? 0), 0);
  }, [state.expenses]);

  const available = useMemo(() => {
    return state.budget - expent;
  }, [state.budget, expent]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      <div className='flex justify-center'>
        <img src='/grafico.jpg' alt='Gráfico de gastos' />
      </div>

      <div className='flex flex-col justify-center items-center gap-8'>
        <button
          type='button'
          className='bg-secondary uppercase font-bold text-white w-full p-2 rounded-lg'
        >
          Reiniciar aplicación
        </button>

        <AmountDisplay label='Presupuesto' amount={state.budget} />
        <AmountDisplay label='Disponible' amount={available} />
        <AmountDisplay label='Gasto' amount={expent} />
      </div>
    </div>
  );
};

export default BudgetTracker;
