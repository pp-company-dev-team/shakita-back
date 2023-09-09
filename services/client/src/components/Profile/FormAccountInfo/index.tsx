import React from "react";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputComponentChildren } from "../../../styled-components/Input";
import { Button } from "../../../styled-components/Button";
import store from "../../../stores/authStore";
import Image from "next/image";

type FormValues = {
  username: string;
  email: string;
  phone: string;
};
const phoneRegExp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const schema = yup
  .object({
    username: yup.string().required().min(3),
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
        <Image
          src={
            "https://www.figma.com/file/dpEBjDFaU1TxkbBKDLASGM/ShakitaEcoSyctem(ShakitaFamily)?type=design&node-id=151-1254&mode=design&t=mNmWcdmCLZn17ycj-4"
          }
          alt="avatar"
        />
        <div>
          <InputComponentChildren size="large" $invalid={!!errors?.username}>
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
          </InputComponentChildren>
          <p>{errors.username?.message}</p>
        </div>
        <div>
          <InputComponentChildren size="large" $invalid={!!errors?.email}>
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
          </InputComponentChildren>
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <InputComponentChildren size="large" $invalid={!!errors?.phone}>
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
          </InputComponentChildren>
          <p>{errors.phone?.message}</p>
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

export default observer(FormSignUp);
