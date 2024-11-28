import AmountDisplay from "./AmountDisplay";

const BudgetTracker = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      <div className='flex justify-center'>
        <img src='/grafico.jpg' alt='Gráfico de gastos'></img>
      </div>

      <div className='flex flex-col justify-center items-center gap-8'>
        <button
          type='button'
          className=' bg-secondary uppercase font-bold text-white  w-full p-2 rounded-lg'
        >
          Reiniciar aplicación
        </button>

        <AmountDisplay label='Presupuesto' amount={0} />
        <AmountDisplay label='Disponible' amount={0} />
        <AmountDisplay label='Gasto' amount={0} />
      </div>
    </div>
  );
};

export default BudgetTracker;
