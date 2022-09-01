import classNames from "classnames";
import { forwardRef, InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  containerClassName?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { className, error, containerClassName, ...rest } = props;
  return (
    <div className={containerClassName}>
      <input
        ref={ref}
        type="text"
        className={classNames(
          "shadow w-full h-12 px-4 rounded outline-none focus:ring-2 ring-indigo-400",
          className
        )}
        {...rest}
      />
      {error && (
        <span className="text-red-500 mt-1 block text-sm">{error}</span>
      )}
    </div>
  );
});
