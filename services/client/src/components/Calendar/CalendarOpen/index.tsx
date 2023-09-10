import React, { useState } from "react";
import styled from "styled-components";
import store from "../../../stores/calendarStore";
import { observer } from "mobx-react-lite";
import CalendarGrid from "./CalendarGrid";
import Monitor from "./Monitor";
import moment from "moment";
import { CalendarOpenStyled } from "../../../styled-components/Calendar";

const CalendarOpen: React.FC = () => {
  const [today, setToday] = useState(moment().locale("ru"));
  const prevHandler = () =>
    setToday((prev) => prev.clone().subtract(1, "month"));
  const todayHandler = () => setToday(moment().locale("ru"));
  const nextHandler = () => setToday((prev) => prev.clone().add(1, "month"));
  return (
    <CalendarOpenStyled $open={store.active}>
      <div
        className={!store.active ? "modal_active" : "modal"}
        onClick={() => store.setActive(false)}
      >
        <div
          className={!store.active ? "modal_content_active" : "modal_content"}
          onClick={(e) => e.stopPropagation()}
        >
          <Monitor
            nextHandler={nextHandler}
            prevHandler={prevHandler}
            today={today}
            todayHandler={todayHandler}
          />
          <CalendarGrid today={today} />
        </div>
      </div>
    </CalendarOpenStyled>
  );
};

export default observer(CalendarOpen);
