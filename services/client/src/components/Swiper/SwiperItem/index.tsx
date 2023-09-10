import React from "react";
import styled from "styled-components";
import { ItemType } from "../../../types";

export type Props = ItemType;

const SwiperItem = (props: Props) => {
  if (!props.day) {
    return (
      <label className="swiper-content" draggable={false}>
        {props.time}
      </label>
    );
  }
  return (
    <div className="swiper-content">
      <h3>{props.dayName}</h3>
      <label>{props.dayInNumber}</label>
    </div>
  );
};

export default SwiperItem;
