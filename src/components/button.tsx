import { ButtonHTMLAttributes } from "react";

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="shadow bg-indigo-500 px-4 h-12 rounded text-white"
      {...props}
    >
      {props.children}
    </button>
  );
};
