import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useSwipeable } from "react-swipeable";
import {
  Wrapper,
  CarouselContainer,
  CarouselSlot,
  SlideButton,
  SwiperStyled,
  PREV,
  NEXT,
} from "../../styled-components/Swiper";
import store from "../../stores/calendarStore";
import { observer } from "mobx-react-lite";

// дуже кастильний не адаптивний модуль, розрахований тільки на calendarStore

type Direction = typeof PREV | typeof NEXT;

interface CarouselState {
  pos: number;
  sliding: boolean;
  dir: Direction;
}

type CarouselAction =
  | { type: Direction; numItems: number }
  | { type: "stopSliding" };

const getOrder = (index: number, pos: number, numItems: number) => {
  return index - pos < 0 ? numItems - Math.abs(index - pos) : index - pos;
};

const getInitialState = (numItems: number): CarouselState => ({
  pos: numItems - 1,
  sliding: false,
  dir: NEXT,
});

const DAYS = "DAYS";
const TIMES = "TIMES";

type StoreType = typeof DAYS | typeof TIMES;

const Swiper: FunctionComponent<{
  children: ReactNode;
  storeType?: StoreType;
}> = (props) => {
  const [cuurentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    if (store.date.day === "") {
      store.chooseDateAndTime("day", store.calendar[cuurentSlide].dayInNumber!);
    }
    if (store.date.time === "") {
      store.chooseDateAndTime("time", store.times[cuurentSlide].time);
    }
    if (props.storeType === "DAYS") {
      store.slideFunc = corectSlide;
    }
  }, [cuurentSlide]);

  const numItems = React.Children.count(props.children);
  const [state, dispatch] = useReducer(reducer, getInitialState(numItems));

  const slide = (dir: Direction, activeIf: boolean = true) => {
    if (activeIf) {
      if (props.storeType === "DAYS") {
        if (
          (cuurentSlide === 0 && dir === "PREV") ||
          (cuurentSlide === store.calendar.length - 1 && dir === "NEXT")
        ) {
        } else {
          if (dir === "NEXT") {
            store.chooseDateAndTime(
              "day",
              store.calendar[cuurentSlide + 1].dayInNumber!
            );
            setCurrentSlide(cuurentSlide + 1);
          } else {
            store.chooseDateAndTime(
              "day",
              store.calendar[cuurentSlide - 1].dayInNumber!
            );
            setCurrentSlide(cuurentSlide - 1);
          }
          dispatch({ type: dir, numItems });
          setTimeout(() => {
            dispatch({ type: "stopSliding" });
          }, 50);
        }
      } else if (props.storeType === "TIMES") {
        if (
          (cuurentSlide === 0 && dir === "PREV") ||
          (cuurentSlide === store.times.length - 1 && dir === "NEXT")
        ) {
        } else {
          if (dir === "NEXT") {
            setCurrentSlide(cuurentSlide + 1);
            store.chooseDateAndTime("time", store.times[cuurentSlide + 1].time);
          } else {
            setCurrentSlide(cuurentSlide - 1);
            store.chooseDateAndTime("time", store.times[cuurentSlide - 1].time);
          }
          dispatch({ type: dir, numItems });
          setTimeout(() => {
            dispatch({ type: "stopSliding" });
          }, 50);
        }
      } else {
        dispatch({ type: dir, numItems });
        setTimeout(() => {
          dispatch({ type: "stopSliding" });
        }, 50);
      }
    } else {
      dispatch({ type: dir, numItems });
      setTimeout(() => {
        dispatch({ type: "stopSliding" });
      }, 50);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => slide(NEXT),
    onSwipedRight: () => slide(PREV),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const corectSlide = (amount: number, dir: Direction) => {
    for (let i = 0; i < amount; i++) {
      slide(dir, false);
    }
    setCurrentSlide(
      dir === "NEXT" ? cuurentSlide + amount : cuurentSlide - amount
    );
  };

  return (
    <SwiperStyled {...handlers}>
      <SlideButton onClick={() => slide(PREV)} $float="left">
        {"<"}
      </SlideButton>
      <Wrapper>
        <CarouselContainer dir={state.dir} $sliding={state.sliding}>
          {React.Children.map(props.children, (child, index) => (
            <CarouselSlot order={getOrder(index, state.pos, numItems)}>
              {child}
            </CarouselSlot>
          ))}
        </CarouselContainer>
      </Wrapper>
      <SlideButton onClick={() => slide(NEXT)} $float="right">
        {">"}
      </SlideButton>
    </SwiperStyled>
  );
};

function reducer(state: CarouselState, action: CarouselAction): CarouselState {
  switch (action.type) {
    case PREV:
      return {
        ...state,
        dir: PREV,
        sliding: true,
        pos: state.pos === 0 ? action.numItems - 1 : state.pos - 1,
      };
    case NEXT:
      return {
        ...state,
        dir: NEXT,
        sliding: true,
        pos: state.pos === action.numItems - 1 ? 0 : state.pos + 1,
      };
    case "stopSliding":
      return { ...state, sliding: false };
    default:
      return state;
  }
}

export default observer(Swiper);
