import React from "react";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Calendar from "../../Calendar";
import { InputComponent } from "../../../styled-components/Input";
import { Button } from "../../../styled-components/Button";
import store from "../../../stores/authStore";

type FormValues = {
  password: string;
  email: string;
};

const schema = yup
  .object({
    password: yup.string().required().min(6),
    email: yup.string().required().email(),
  })
  .required();

const FormSignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onChange", resolver: yupResolver(schema) });

  const sendFormBody = async () => {
    await store.logIn();
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

export default observer(FormSignIn);
