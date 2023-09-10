import React from "react";
import Swiper from "../../Swiper";
import SwiperItem from "../../Swiper/SwiperItem";
import store from "../../../stores/calendarStore";
import { observer } from "mobx-react-lite";
import { DaysStyled } from "../../../styled-components/Booking";

const Days: React.FC = () => {
  return (
    <DaysStyled>
      <Swiper storeType="DAYS">
        {store.calendar.map((item) => (
          <SwiperItem key={item.dayInNumber} {...item} />
        ))}
      </Swiper>
    </DaysStyled>
  );
};

export default observer(Days);
