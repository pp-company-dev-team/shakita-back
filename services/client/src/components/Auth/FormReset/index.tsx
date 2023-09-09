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
  oldpassword: string;
  newpassword: string;
};

const schema = yup
  .object({
    oldpassword: yup.string().required().min(6),
    newpassword: yup.string().required().min(6),
  })
  .required();

const FormReset: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onChange", resolver: yupResolver(schema) });

  const sendFormBody = async () => {
    // await store.logIn();
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
          <InputComponent size="large" $invalid={!!errors?.oldpassword}>
            <input
              {...register("oldpassword", {
                onChange(event: React.SyntheticEvent<Element, Event>) {
                  store.addFieldReset(event);
                },
                value: store.resetpassword.oldpassword,
              })}
              name="oldpassword"
              placeholder="oldpassword"
              autoComplete="off"
            />
          </InputComponent>
          <p>{errors.oldpassword?.message}</p>
        </div>
        <div>
          <InputComponent size="large" $invalid={!!errors?.newpassword}>
            <input
              {...register("newpassword", {
                onChange(event: React.SyntheticEvent<Element, Event>) {
                  store.addFieldReset(event);
                },
                value: store.resetpassword.newpassword,
              })}
              name="newpassword"
              placeholder="newpassword"
              autoComplete="off"
            />
          </InputComponent>
          <p>{errors.newpassword?.message}</p>
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

export default observer(FormReset);
