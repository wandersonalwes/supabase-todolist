import classNames from "classnames";
import { InputHTMLAttributes } from "react";

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const { className, ...rest } = props;
  return (
    <input
      type="text"
      className={classNames(
        "shadow w-full h-12 px-4 rounded outline-none focus:ring-2 ring-indigo-400",
        className
      )}
      {...rest}
    />
  );
};
