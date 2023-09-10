import React from "react";
import MonthDay from "../MonthDay";

export const MonthDaysList: React.FC<{
  startDay: moment.Moment;
  today: moment.Moment;
}> = ({ startDay, today }) => {
  const day = startDay.clone().subtract(1, "day");
  const daysMap = [...Array(42)].map(() => day.add(1, "day").clone());
  return (
    <>
      {daysMap.map((dayItem) => (
        <MonthDay today={today} key={dayItem.toString()} dayItem={dayItem} />
      ))}
    </>
  );
};
