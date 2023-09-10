import React from "react";
import styled from "styled-components";
import {
  isCurrentDay,
  is_selected_month,
} from "../../../../helpers/calendar-helpers";
import {
  CellWrapper,
  CurrentDay,
  DayWrapper,
  RowInCell,
  ShowDayWrapper,
} from "../../../../styled-components/Calendar";
import store from "../../../../stores/calendarStore";
import moment from "moment";
import { observer } from "mobx-react-lite";

const MonthDay: React.FC<{
  dayItem: moment.Moment;
  today: moment.Moment;
}> = ({ dayItem, today }) => {
  let active =
    !moment().isSameOrBefore(dayItem, "day") ||
    !store.limitDay.isAfter(dayItem);
  return (
    <CellWrapper
      $is_weekday={dayItem.day() === 6 || dayItem.day() === 0}
      key={dayItem.unix()}
      $is_selected_month={is_selected_month(dayItem, today)}
      onDoubleClick={() => {
        if (!active) {
          store.setDay(dayItem.format("DD.MM.YYYY"));
          store.setActive(false);
        }
      }}
    >
      <RowInCell $justify_content={"flex-end"}>
        <ShowDayWrapper $is_active_day={active}>
          {window.innerWidth > 925 && (
            <DayWrapper
              $active={active}
              onClick={() => {
                if (!active) {
                  store.setDay(dayItem.format("DD.MM.YYYY"));
                  store.setActive(false);
                }
              }}
            >
              {dayItem.format("dd")}
            </DayWrapper>
          )}
          <DayWrapper
            $active={active}
            onClick={() => {
              if (!active) {
                store.setDay(dayItem.format("DD.MM.YYYY"));
                store.setActive(false);
              }
            }}
          >
            {isCurrentDay(dayItem) ? (
              <CurrentDay>{dayItem.format("D")}</CurrentDay>
            ) : (
              dayItem.format("D")
            )}
          </DayWrapper>
        </ShowDayWrapper>
      </RowInCell>
    </CellWrapper>
  );
};

export default observer(MonthDay);
