import { formatCurrency } from "../utils";

type AmountDisplayProps = {
  label?: string;
  amount: number;
};

const AmountDisplay = ({ label, amount }: AmountDisplayProps) => {
  return (
    <p className='text-2xl text-primary font-bold'>
      {label && `${label}: `}
      <span className='font-black text-blue-950'>{formatCurrency(amount)}</span>
    </p>
  );
};

export default AmountDisplay;
