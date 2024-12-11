import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function getColor(percentage: number) {
  if (percentage > 85) return "#DC2626";
  if (percentage > 60 && percentage <= 85) return "#F97316";
  if (percentage > 40 && percentage <= 60) return "#FACC15";
  return "#16A34A";
}

const BudgetTracker = () => {
  const { state, expent, available, dispatch } = useBudget();
  const percentage = +((expent / state.budget) * 100).toFixed(0);

  const handleReset = () => {
    dispatch({ type: "RESET_APP" });
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      <div className='flex justify-center'>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}% gastado`}
          styles={buildStyles({
            textColor: getColor(percentage),
            pathColor: getColor(percentage),
            trailColor: "#f5f5f5",
            textSize: 8,
          })}
        />
      </div>

      <div className='flex flex-col justify-center items-center gap-8'>
        <button
          type='button'
          className='bg-secondary uppercase font-bold text-white w-full p-2 rounded-lg'
          onClick={handleReset}
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
