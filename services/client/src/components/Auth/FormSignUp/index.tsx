import React from "react";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Calendar from "../../Calendar";
import {
  InputComponent,
  InputComponentChildren,
} from "../../../styled-components/Input";
import { Button } from "../../../styled-components/Button";
import store from "../../../stores/authStore";
import CheckBoxComponet from "@/styled-components/SmallChecks";

type FormValues = {
  username: string;
  email: string;
  password: string;
  phone: string;
};
const phoneRegExp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const schema = yup
  .object({
    username: yup.string().required().min(3),
    password: yup.string().required().min(6),
    email: yup.string().required().email(),
    phone: yup
      .string()
      .required()
      .matches(phoneRegExp, "Phone number is not valid"),
  })
  .required();

const FormSignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onChange", resolver: yupResolver(schema) });

  const sendFormBody = async () => {
    await store.signUp();
    // if (store.body.id_table) {
    //   const status = await store.sendForm();
    //   if (status !== "Error") {
    //     store.cleanBody();
    //     reset();
    //   }
    // }
  };
  return (
    <div className="form-auth">
      <form className="inputs-form" onSubmit={handleSubmit(sendFormBody)}>
        <div>
          <InputComponent size="large" $invalid={!!errors?.email}>
            <input
              {...register("email", {
                onChange(event: React.SyntheticEvent<Element, Event>) {
                  store.addField(event);
                },
                value: store.user.email,
              })}
              name="email"
              placeholder="email"
              autoComplete="off"
            />
          </InputComponent>
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <InputComponent size="large" $invalid={!!errors?.password}>
            <input
              {...register("password", {
                onChange(event: React.SyntheticEvent<Element, Event>) {
                  store.addField(event);
                },
                value: store.user.password,
              })}
              name="password"
              placeholder="password"
              autoComplete="off"
            />
          </InputComponent>
          <p>{errors.password?.message}</p>
        </div>
        <div>
          <InputComponent size="large" $invalid={!!errors?.phone}>
            <input
              {...register("phone", {
                onChange(event: React.SyntheticEvent<Element, Event>) {
                  store.addField(event);
                },
                value: store.user.phone,
              })}
              name="phone"
              placeholder="phone"
              autoComplete="off"
            />
          </InputComponent>
          <p>{errors.phone?.message}</p>
        </div>
        <div>
          <InputComponent size="large" $invalid={!!errors?.username}>
            <input
              {...register("username", {
                onChange(event: React.SyntheticEvent<Element, Event>) {
                  store.addField(event);
                },
                value: store.user.username,
              })}
              name="username"
              placeholder="username"
              autoComplete="off"
            />
          </InputComponent>
          <p>{errors.username?.message}</p>
        </div>
        <CheckBoxComponet>
          <input type="checkbox" required />
        </CheckBoxComponet>
        <Button
          size="large"
          $backcolor="rgb(218, 64, 64)"
          $backcolor_hover="red"
        >
          SignIn
        </Button>
      </form>
    </div>
  );
};

export default observer(FormSignUp);
