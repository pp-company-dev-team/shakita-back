import React, { useState } from "react";
import styled from "styled-components";
import { device } from "../size";

export type InputProps = {
  hideArrows?: boolean;
  size?: string;
  name?: string;
  type?: string;
  text?: string;
  changeHandler?: (event: any) => void;
  min?: string;
  max?: string;
  disable?: boolean;
  eye?: boolean;
  img?: boolean;
  $invalid?: boolean;
  link?: string;
  val?: any;
  store?: any;
  list?: any;
  valid?: any;
  for?: any;
  children?: React.ReactNode;
  heightauto?: any;
  width?: string;
  color?: string;
  noAdaptive?: boolean;
};

export const InputDefault = styled.div<InputProps>`
  max-width: 400px;
  font-size: 12px;
  width: 200px;
  input {
    padding: 8px 2.4em 8px 10px;
    width: 100%;
  }

  img {
    position: absolute;
    right: 1em;
    cursor: pointer;
    width: 14px;
    height: 14px;
  }

  ${(props) => {
    if (props.noAdaptive) {
      switch (props.size) {
        case "small":
          return `
      font-size: 12px;
      width: 200px;
      input {
        padding: 8px;
      }
      img {
        width: 12px;
        height: 12px;
      }
      padding: 0px;
  `;
        case "medium":
          return `
      font-size: 14px;
      input {
        padding: 10px;
      }
      img {
        width: 14px;
        height: 14px;
      }
      width: 300px;
  `;
        case "large":
          return `
      font-size: 16px;
      input {
        padding: 12px;
      }
      width: 400px;
  `;
      }
    } else {
      return `@media ${device.mobileS} {
      font-size: 12px;
      width: 200px;
      input {
        padding: 8px;
      }
      img {
        width: 12px;
        height: 12px;
      }
      padding: 0px;
    }
  
    @media ${device.mobileM} {
      font-size: 14px;
      input {
        padding: 10px;
      }
      img {
        width: 14px;
        height: 14px;
      }
      width: 300px;
    }
  
    @media ${device.tablet} {
      font-size: 16px;
      input {
        padding: 12px;
      }
      img {
        width: 16px;
        height: 16px;
      }
      width: 400px;
    }`;
    }
  }}

  ${(props) => (props.width ? `width: ${props.width};` : "")}
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border-bottom: 1px solid ${(props) => (props.$invalid ? "red" : "#afb1b6")};
  border-bottom-left-radius: 8px;
  &:focus-within {
    border-bottom: 1px solid ${(props) => (props.$invalid ? "red" : "white")};
  }
  input {
    border: 0;
    z-index: 0;
    background-color: transparent;
    font: inherit;
    text-align: center;
    color: ${(props) => (props.color ? props.color : "white")};
    // padding: 0.25em 0;
    &:focus {
      outline: 0;
    }
    ${(props) => (props.$invalid ? "color: red" : "")}
    &::placeholder {
      ${(props) => (props.$invalid ? "color: red" : "")}
    }
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const InputComponentChildren: React.FC<InputProps> = (props) => {
  if (props.img) {
    return (
      <InputDefault {...props}>
        {props.children}
        <img src={props.link} alt="img" onClick={() => console.log("Click")} />
      </InputDefault>
    );
  }
  return <InputDefault {...props}>{props.children}</InputDefault>;
};

export const InpurForSelect = styled.div<{ color?: string; width?: string }>`
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background: #222222;
  min-width: ${(props) =>
    props.width ? `calc(${props.width} - 8px)` : "185px"};
  input {
    border: 0;
    z-index: 0;
    background-color: transparent;
    font: inherit;
    text-align: center;
    color: ${(props) => (props.color ? props.color : "white")};
    font-size: 10px;
    &:focus {
      outline: 0;
    }
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  img {
    width: 16px;
    height: auto;
  }
  border: 1px solid #2d2d2d;
  border-radius: 6px;
  &:focus-within {
    border: 1px solid #8b8484;
  }
`;

export const InputComponent = styled.div<InputProps>`
  max-width: 400px;
  font-size: 12px;
  width: 200px;
  input {
    padding: 8px 2.4em 8px 10px;
    width: 100%;
  }
  img {
    position: absolute;
    right: 1em;
    cursor: pointer;
    width: 14px;
    height: 14px;
  }
  ${(props) => {
    switch (props.size) {
      case "small":
        return `
    font-size: 12px;
    width: 200px;
    input {
      padding: 8px;
    }
    img {
      width: 12px;
      height: 12px;
    }
    padding: 0px;
`;
      case "medium":
        return `
    font-size: 14px;
    input {
      padding: 10px;
    }
    img {
      width: 14px;
      height: 14px;
    }
    width: 300px;
`;
      case "large":
        return `
    font-size: 16px;
    input {
      padding: 12px;
    }
    img {
      width: 16px;
      height: 16px;
    }
    width: 400px;
`;
    }
  }}
  ${(props) => (props.width ? `width: ${props.width};` : "")}
display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border: 2px solid
    ${(props) => (props.$invalid ? "red" : "rgba(255, 255, 255, 0.05)")};
  border-radius: 8px;
  background: #222222;
  transition: all 0.2s linear;
  &:focus-within {
    border: 2px solid #77799f;
  }
  input {
    border: 0;
    z-index: 0;
    background-color: transparent;
    font: inherit;
    color: white;
    &:focus {
      outline: 0;
    }
    ${(props) => (props.$invalid ? "color: red" : "")}
    &::placeholder {
      ${(props) => (props.$invalid ? "color: red" : "")}
    }
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const TextAreaStyled = styled.div<InputProps>`
  // width: 250px;
  width: 400px;
  @media (max-width: 450px) {
    width: 300px;
  }
  ${(props) => (props.heightauto ? "" : "height: 90px;")}
  font-size: 12px;
  ${(props) => {
    switch (props.size) {
      case "small":
        return `
      font-size: 12px;
      width: 240px;
  `;
      case "medium":
        return `
      font-size: 14px;
      width: 360px;
  `;
      case "large":
        return `
      font-size: 14px;
      width: 480px;
  `;
    }
  }}
  border: 2px solid
  ${(props) => (props.$invalid ? "red" : "rgba(255, 255, 255, 0.05)")};
  background: #222222;
  border-radius: 8px;
  transition: all 0.2s linear;
  &:focus-within {
    border: 2px solid #77799f;
  }
  textarea {
    width: 92%;
    height: 64%;
    padding: 1em;
    border: 0;
    z-index: 0;
    background-color: transparent;
    font: inherit;
    resize: none;
    color: white;
    &:focus {
      outline: 0;
    }
    &::placeholder {
      ${(props) => (props.$invalid ? "color: red" : "")}
    }
  }
`;
