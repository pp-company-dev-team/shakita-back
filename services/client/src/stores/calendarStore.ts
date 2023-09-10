import { makeAutoObservable } from "mobx";
import moment from "moment";
import { BodyForm, ItemType, TablesActiveType } from "../types";

class CalendarStore {
  slideFunc: any;
  getTables: any;
  cleanChoosedTable: any;
  calendar: ItemType[] = [];
  day = moment().clone().locale("ru");
  limitDay = moment().clone().locale("ru");
  times = [
    {
      time: "00:00",
    },
    {
      time: "01:00",
    },
    {
      time: "02:00",
    },
    {
      time: "12:00",
    },
    {
      time: "13:00",
    },
    {
      time: "14:00",
    },
    {
      time: "15:00",
    },
    {
      time: "16:00",
    },
    {
      time: "17:00",
    },
    {
      time: "18:00",
    },
    {
      time: "19:00",
    },
    {
      time: "20:00",
    },
    {
      time: "21:00",
    },
    {
      time: "22:00",
    },
    {
      time: "23:00",
    },
  ];
  body: BodyForm = {
    status_book: false,
    name: "",
    email: "",
    phone: "",
    date: "",
    id_table: "",
  };
  date = {
    day: "",
    time: "",
  };
  active = false;
  correctSlide = {
    status: false,
    amount: 0,
    side: "",
  };
  today = moment().clone().locale("ru");

  constructor() {
    makeAutoObservable(this);
    this.limitDay = moment().clone().add(1, "month").locale("ru");
    const daysInNextMonth = this.limitDay.daysInMonth();
    this.limitDay = this.limitDay.add(
      daysInNextMonth - Number(this.limitDay.format("DD")),
      "days"
    );
    const amountSlides =
      moment().daysInMonth() -
      Number(moment().format("DD")) +
      daysInNextMonth +
      1;
    this.calendar = [...Array(amountSlides)].map(() => {
      const midObj = {
        dayName: this.day.format("dddd"),
        dayInNumber: this.day.format("L"),
        day: this.day.format("MM-DD-YYYY"),
        time: "00:00",
      };
      this.day.add(1, "day");
      return midObj;
    });
  }

  formateDate() {
    try {
      if (this.date.day && this.date.time) {
        const result = this.checkTimeRange();
        if (!result) {
          return { error: true, payload: "Time already in past" };
        }
        const localArray = this.date.day
          .split(".")
          .reverse()
          .concat(this.date.time.split(":"));
        this.body.date = moment(localArray)
          .subtract(1, "month")
          .format()
          .split("+")[0];
        return { error: false, payload: "Success" };
      } else {
        return { error: true, payload: "Empty field" };
      }
    } catch (err) {
      console.error("formateDate", err);
      return { error: true, payload: "Error format data" };
    }
  }

  checkTimeRange = () => {
    console.log(this.date.day ?? moment().locale("ru").format("MM/DD/YYYY"));
    if (this.today.isSame(moment(this.date.day), "day")) {
      const hours = this.today.hours();
      if (Number(this.date.time.split(":")[0]) <= hours) {
        return false;
      }
    }
    return true;
  };

  addField(event: React.SyntheticEvent) {
    let target = event.target as HTMLInputElement;
    this.body = { ...this.body, [target.name]: target.value };
  }

  chooseDateAndTime(name: string, value: string) {
    this.date = { ...this.date, [name]: value };
    this.getTables();
  }

  chooseTable(table: string) {
    this.body.id_table = table;
  }

  setActive(value: boolean) {
    this.active = value;
  }

  cleanBody() {
    this.body = {
      status_book: false,
      name: "",
      email: "",
      phone: "",
      date: "",
      id_table: "",
    };
  }

  getDaysBetweenDates(date1: moment.Moment, date2: moment.Moment) {
    const daysDifference = date2.diff(date1, "days");

    return daysDifference < 0
      ? daysDifference - 2 * daysDifference
      : daysDifference;
  }

  setDay(day: string) {
    const localMoment = moment;
    localMoment.locale("ru");
    let dateTest = this.date.day.split("/");
    let correctFormatDay: string = "";
    if (dateTest[2] === undefined) {
      dateTest = this.date.day.split(".");
      correctFormatDay = localMoment(
        `${dateTest[2]}-${dateTest[1]}-${dateTest[0]}T00:00`
      ).format("X");
    } else {
      correctFormatDay = localMoment(
        `${dateTest[2]}-${dateTest[0]}-${dateTest[1]}T00:00`
      ).format("X");
    }

    const newCorrectFormatDay = localMoment(
      day.split(".").reverse().join("-") + "T00:00"
    ).format("X");

    if (
      correctFormatDay !== "Invalid date" &&
      newCorrectFormatDay !== "Invalid date"
    ) {
      if (correctFormatDay !== newCorrectFormatDay) {
        if (correctFormatDay > newCorrectFormatDay) {
          this.correctSlide.amount = this.getDaysBetweenDates(
            moment(Number(correctFormatDay) * 1000),
            moment(Number(newCorrectFormatDay) * 1000)
          );
          this.correctSlide.side = "PREV";
          this.correctSlide.status = true;
          console.log(this.correctSlide.side, this.correctSlide.amount);
        } else if (correctFormatDay < newCorrectFormatDay) {
          this.correctSlide.amount = this.getDaysBetweenDates(
            moment(Number(correctFormatDay) * 1000),
            moment(Number(newCorrectFormatDay) * 1000)
          );
          this.correctSlide.side = "NEXT";
          this.correctSlide.status = true;
        }
        this.slideFunc(this.correctSlide.amount, this.correctSlide.side);
        this.date.day = day;
        console.log("setDayEnd", this.date.day);
        this.getTables();
      }
    } else {
      console.log("Error!!!");
    }
  }

  async sendForm() {
    try {
      let message: string = "Error";
      const result = this.formateDate();
      console.log({ ...this.body });
      if (result.error) {
        console.error("Not valid data", result.payload);
        return message;
      }
      // await fetch("http://localhost:4200/table", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     mode: "cors",
      //   },
      //   body: JSON.stringify(this.body),
      // })
      //   .then((response) => {
      //     if (response.status === 401) {
      //       return;
      //     }
      //     return response.json();
      //   })
      //   .then((json) => {
      //     if (!json.error) {
      //       message = "Success";
      //     }
      //   });
      this.cleanChoosedTable("");
      this.getTables();
      return message;
    } catch (e) {
      console.error("Error", e);
    }
  }
}
const store = new CalendarStore();
export default store;
