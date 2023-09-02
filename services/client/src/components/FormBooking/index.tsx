import React from "react";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Calendar from "../Calendar";
import { InputComponentChildren } from "../../styled-components/Input";
import { Button } from "../../styled-components/Button";
import store from "../../stores/calendarStore";

type FormValues = {
  name: string;
  email: string;
  phone: string;
};
const phoneRegExp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const schema = yup
  .object({
    name: yup.string().required().min(3),
    email: yup.string().required().email(),
    phone: yup
      .string()
      .required()
      .matches(phoneRegExp, "Phone number is not valid"),
  })
  .required();

const FormBooking: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onChange", resolver: yupResolver(schema) });

  const sendBodyTableBooked = async () => {
    if (store.body.id_table) {
      const status = await store.sendForm();
      if (status !== "Error") {
        store.cleanBody();
        reset();
      }
    }
  };
  return (
    <div className="form-booking">
      <h2>Зарезервируй свой стол!</h2>
      <Calendar />
      <form
        className="inputs-form"
        onSubmit={handleSubmit(sendBodyTableBooked)}
      >
        <div>
          <InputComponentChildren size="large" $invalid={!!errors?.name}>
            <input
              {...register("name", {
                onChange(event: React.SyntheticEvent<Element, Event>) {
                  store.addField(event);
                },
                value: store.body.name,
              })}
              name="name"
              placeholder="Ваше Имя"
              autoComplete="off"
            />
          </InputComponentChildren>
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <InputComponentChildren size="large" $invalid={!!errors?.email}>
            <input
              {...register("email", {
                value: store.body.email,
                onChange(event: React.SyntheticEvent<Element, Event>) {
                  store.addField(event);
                },
              })}
              name="email"
              placeholder="Введите ваш Email"
              autoComplete="off"
            />
          </InputComponentChildren>
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <InputComponentChildren size="large" $invalid={!!errors?.phone}>
            <input
              {...register("phone", {
                value: store.body.phone,
                onChange(event: React.SyntheticEvent<Element, Event>) {
                  store.addField(event);
                },
              })}
              name="phone"
              placeholder="Введите ваш номер телефона"
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
          Забей!
        </Button>
      </form>
    </div>
  );
};

export default observer(FormBooking);
