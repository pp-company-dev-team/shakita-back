"use client";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { Button } from "../../styled-components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import store from "@/stores/commentStore";
import { InputComponentChildren } from "@/styled-components/Input";
import CheckBoxComponet from "@/styled-components/SmallChecks";
import { Rating } from "@/styled-components/Rating";
import StarOn from "../../../public/StarOn.svg";
import StarOff from "../../../public/StartOff.svg";
import Image from "next/image";
type FormValues = {
  rate: number;
  text: string;
};

const schema = yup
  .object({
    rate: yup.number().required(),
    text: yup.string().required().min(3),
  })
  .required();

const FormComment = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onChange", resolver: yupResolver(schema) });

  const sendForm = async () => {
    //TODO ADD auth check and add all details if auth true

    const result = await store.sendForm();
    if (result) {
      //TODO add alert
      reset();
    }
  };
  useEffect(() => {}, []);
  //TODO checkbox not rebder svg
  return (
    <div className="form-booking">
      <h2>Form Comment</h2>
      <form className="inputs-form" onSubmit={handleSubmit(sendForm)}>
        <Rating>
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <Image
                alt="star-rating"
                key={index}
                src={index <= (hover || rating) ? StarOn : StarOff}
                onClick={() => {
                  setRating(index);
                  store.setRating(index);
                }}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              />
            );
          })}
        </Rating>
        <div className="input-container">
          <InputComponentChildren size="large" $invalid={!!errors?.text}>
            <input
              {...register("text", {
                onChange(event: React.SyntheticEvent<Element, Event>) {
                  store.addField(event);
                },
                value: store.comment.text,
              })}
              name="text"
              placeholder="Ваше Имя"
              autoComplete="off"
            />
          </InputComponentChildren>
          <p>{errors.text?.message}</p>
        </div>

        <CheckBoxComponet>
          <span>Test</span>
        </CheckBoxComponet>
        <Button>Add Commnet</Button>
      </form>
    </div>
  );
};

export default observer(FormComment);
