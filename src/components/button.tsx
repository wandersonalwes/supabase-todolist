import classNames from "classnames";
import { CircleNotch } from "phosphor-react";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export const Button = (props: Props) => {
  const { className, isLoading, children, ...rest } = props;
  return (
    <button
      disabled={isLoading}
      className={classNames(
        "shadow bg-indigo-500 px-4 h-12 rounded text-white flex items-center justify-center",
        className
      )}
      {...rest}
    >
      {isLoading && <CircleNotch className="text-white w-5 h-5 animate-spin" />}

      {!isLoading && children}
    </button>
  );
};
