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
  code: string;
};

const schema = yup
  .object({
    code: yup.string().required().min(3),
  })
  .required();

const FormResetCode: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onChange", resolver: yupResolver(schema) });

  const sendFormBody = async (props: any) => {
    console.log(props);

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
          <InputComponent size="large" $invalid={!!errors?.code}>
            <input
              {...register("code", {
                onChange(event: React.SyntheticEvent<Element, Event>) {
                  store.addFieldReset(event);
                },
                value: store.resetpassword.code,
              })}
              name="code"
              placeholder="code"
              autoComplete="off"
            />
          </InputComponent>
          <p>{errors.code?.message}</p>
        </div>
        <Button
          size="large"
          $backcolor="rgb(218, 64, 64)"
          $backcolor_hover="red"
        >
          Check
        </Button>
      </form>
    </div>
  );
};

export default observer(FormResetCode);
