import { useBudget } from "./hooks/useBudget";
import BudgetInput from "./components/BudgetInput";
import { useMemo, useEffect } from "react";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";
import FilterByCategory from "./components/FilterByCategory";

//Context API
//Estado global sin dependencias

function App() {
  const { state } = useBudget();

  const isValidBudget = useMemo(() => {
    return state.budget > 0 || isNaN(state.budget);
  }, [state.budget]);

  useEffect(() => {
    localStorage.setItem("budget", String(state.budget));
  }, [state.budget]);

  return (
    <>
      <header className='bg-gradient-to-r from-primary to-secondary py-8 max-h-72'>
        <h1 className='text-center font-black text-4xl text-white'>
          Planificador de gastos
        </h1>
      </header>

      <div className='max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10'>
        {isValidBudget ? <BudgetTracker /> : <BudgetInput />}
      </div>

      {isValidBudget && (
        <main className='max-w-3xl mx-auto py-10'>
          <FilterByCategory />

          <ExpenseList />

          <ExpenseModal />
        </main>
      )}
    </>
  );
}

export default App;
