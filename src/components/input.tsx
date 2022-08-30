import { InputHTMLAttributes } from "react";

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      type="text"
      placeholder="Novo todo"
      className="shadow w-full h-12 px-4 rounded outline-none focus:ring-2 ring-indigo-400"
      {...props}
    />
  );
};
