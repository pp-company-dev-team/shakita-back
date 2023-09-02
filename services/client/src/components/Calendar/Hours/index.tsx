import Swiper from "../../Swiper";
import SwiperItem from "../../Swiper/SwiperItem";
import React from "react";
import store from "../../../stores/calendarStore";
import { observer } from "mobx-react-lite";
import { HoursStyled } from "../../../styled-components/Booking";

const Hours: React.FC = () => {
  return (
    <HoursStyled>
      <Swiper storeType="TIMES">
        {store.times.map((item) => (
          <SwiperItem key={item.time} {...item} />
        ))}
      </Swiper>
    </HoursStyled>
  );
};

export default observer(Hours);
