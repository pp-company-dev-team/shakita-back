import React, {useState} from "react";
import styled from "styled-components";
import {InputProps, InputDefault} from "../Input";
import arrow from "../../../static/images/ArrowDownWhite.svg";

export const InputSelectDefault = styled.div<InputProps & {width?: string}>`
  .content {
    display: none;
    position: absolute;
    background: #222222;
    // max-width: 400px;
    font-size: 8px;
    padding: 2px 4px;
    ${(props) => {
      switch (props.size) {
        case "small":
          return `
      font-size: 12px;
      padding: 4px 8px ;
      width: 185px;
  `;
        case "medium":
          return `
      font-size: 14px;
      padding: 5px 10px;
      width: 280px;
  `;
        case "large":
          return `
      font-size: 16px;
      padding: 6px 12px;
      width: 375px;
  `;
      }
    }}
    width: ${(props) =>
      props.width ? `calc(${props.width} - 8px - 1em)` : "185px"};
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    overflow-y: scroll;
    max-height: 120px;
    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
      background: #888;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }

  .content:active {
    display: block;
  }

  .content p {
    cursor: pointer;
    margin: 0;
    padding: 1em 0.5em;
    &:hover {
      background: #8b8484;
    }
  }

  &:focus-within .content {
    display: block;
  }
`;

export const SelectDefault = styled(InputSelectDefault)<InputProps>`
  input {
    cursor: pointer;
    caret-color: transparent;
  }
  img {
    cursor: auto;
    transition: all 0.25s ease;
  }
  // &:focus-within img {
  //   transform: rotate(180deg);
  // }
`;

const SelectDefaultComponet: React.FC<InputProps> = (props) => {
  let list = ["Будівництво", "Ремонт квартир", "цфвцфв", "цфввцф"];
  if (props.list) {
    list = props.list;
  }
  return (
    <SelectDefault {...props}>
      <InputDefault
        {...props}
        link={arrow}
        val={props.store.post.category}
        img
      />
      <div className="content">
        {list.map((arg) => (
          <p
            onClick={() => {
              props.store.selectField(props.name, arg);
            }}
            key={arg}
          >
            {arg}
          </p>
        ))}
      </div>
    </SelectDefault>
  );
};

export default SelectDefaultComponet;
