"use client";

import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

export type StringInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string;
};

const StringInput: React.FC<StringInputProps> = (props) => {
  const { control } = useFormContext();

  return <input {...props} {...control.register(props.name)} />;
};

export default StringInput;
