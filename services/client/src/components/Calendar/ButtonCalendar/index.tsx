import { observer } from "mobx-react-lite";
import React from "react";
import CalendarSvg from "../../../../public/Calendar-icon.svg";
import store from "../../../stores/calendarStore";
import { ButtonCalendarStyled } from "../../../styled-components/Booking";
import Image from "next/image";

const ButtonCalendar = () => {
  return (
    <ButtonCalendarStyled
      onClick={() => {
        store.setActive(true);
      }}
    >
      <Image alt="calendar" src={CalendarSvg} />
    </ButtonCalendarStyled>
  );
};

export default observer(ButtonCalendar);
