import { PropsWithChildren } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";

const ErrorMsg = ({ children }: PropsWithChildren) => {
  return (
    <p className=' border-2 border-red-500 p-2 text-red-500 font-bold text-sm text-center rounded-lg'>
      <ExclamationCircleIcon className='w-5 h-5 inline-block' /> {children}
    </p>
  );
};

export default ErrorMsg;
