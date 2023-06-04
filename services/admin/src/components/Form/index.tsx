"use client";

import {
  DetailedHTMLProps,
  FormHTMLAttributes,
  ReactNode,
  useEffect,
} from "react";
import { useForm, FormProvider, UseFormProps } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export type FormProps = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> &
  UseFormProps & {
    onValuesChange?: (values: any) => void;
    validationSchema?: yup.AnyObjectSchema;
    onSubmit?: (values: any) => void;
    sensitiveTo?: string[];
    children: ReactNode;
  };

const Form: React.FC<FormProps> = ({ onValuesChange, ...props }) => {
  const methods = useForm({
    ...props,
    resolver: yupResolver(props?.validationSchema ?? yup.object({})),
  });

  if (onValuesChange) {
    useEffect(() => {
      methods.watch(() => onValuesChange(methods.getValues()));
    }, [methods.watch]);
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          if (props.onSubmit) {
            props.onSubmit(data);
          }
        })}
        {...props}
      >
        {props.children}
      </form>
    </FormProvider>
  );
};

export default Form;

//   if (props.sensitiveTo) {
//     useEffect(
//       () => {
//         methods.reset(props.defaultValues);
//       },
//       props.sensitiveTo?.map((value) => props.defaultValues[value])
//     );
//   }
