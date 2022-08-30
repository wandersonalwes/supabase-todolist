import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";

export const Checkbox = (props: CheckboxPrimitive.CheckboxProps) => {
  return (
    <CheckboxPrimitive.Root
      className="w-5 h-5 rounded-md bg-gray-100 checkbox"
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        <Check className="w-4 h-4 text-white mx-auto" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};
