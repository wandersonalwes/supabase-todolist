import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className, ...rest } = props;
  return (
    <button
      className={classNames(
        "shadow bg-indigo-500 px-4 h-12 rounded text-white",
        className
      )}
      {...rest}
    >
      {props.children}
    </button>
  );
};
