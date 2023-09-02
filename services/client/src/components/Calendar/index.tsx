import React from "react";
import Days from "./Days";
import Hours from "./Hours";
import ButtonCalendar from "./ButtonCalendar";
import { CalendarStyled } from "./styled-components";
import { observer } from "mobx-react-lite";

const Calendar = () => {
  return (
    <CalendarStyled>
      <div className="handChoose">
        <Hours />
        <Days />
      </div>
      <ButtonCalendar />
    </CalendarStyled>
  );
};

export default observer(Calendar);
