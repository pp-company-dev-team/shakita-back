import moment from "moment";
import React from "react";
import styled from "styled-components";
import {MonthDaysList} from "../MonthDaysList";
import {GridWrapper} from "../../../../styled-components/Booking";

const CalendarGrid: React.FC<{today: moment.Moment}> = ({today}) => {
  const startDay = today.clone().startOf("month").startOf("week");
  return (
    <>
      <GridWrapper>
        <MonthDaysList startDay={startDay} today={today} />
      </GridWrapper>
    </>
  );
};

export default CalendarGrid;
