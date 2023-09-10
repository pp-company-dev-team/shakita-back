import {refreshTokenReq} from "../hooks/auth.hook";
import {makeAutoObservable} from "mobx";
import moment from "moment";
import {ApplicationType} from "../types";

export type TablesFilterBodyType = {
  date: string;
  email?: string;
  phone?: string;
  id_table?: string;
};

export type TablesFilterType = TablesFilterBodyType & {
  time: string;
};

class TablesStore {
  setTables: any;
  setCount: any;
  filter: TablesFilterType = {
    date: "",
    time: "",
    email: "",
    phone: "",
    id_table: "",
  };
  body: TablesFilterBodyType = {
    date: "",
    email: "",
    phone: "",
    id_table: "",
  };
  onChangeFilter = {
    email: "",
    phone: "",
  };
  currentPage: number = 1;
  constructor() {
    makeAutoObservable(this);
    this.filter.date = "0";
    this.body.date = "0";
  }

  formatDate() {
    if (this.filter.date === "0") {
      this.body.date = `T${this.filter.time}`;
    } else {
      this.body.date = `${this.filter.date}T${this.filter.time}`;
    }
  }

  selectFilterField(name: string, value: string) {
    this.filter = {...this.filter, [name]: value};
  }

  setCurrentpage(page: number) {
    this.currentPage = page;
  }

  getTablesFormating() {
    this.formatDate();
    for (let key in this.filter) {
      if (this.filter[key as keyof TablesFilterType]) {
        if (key !== "time" && key !== "date") {
          this.body[key as keyof TablesFilterBodyType] =
            this.filter[key as keyof TablesFilterType]!;
        }
      }
    }
    console.log("Body", this.body);
  }

  async getList(token: string) {
    try {
      this.getTablesFormating();
      const {date, ...body} = this.body;
      console.log("Date", date);
      console.log("Body", body);
      if (this.filter.id_table) {
        this.body.id_table = this.filter.id_table;
      }
      await fetch(`http://localhost:4200/tables/${date}/${this.currentPage}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": `${token}`,
        },
        body: JSON.stringify(body),
      })
        .then(async (res) => {
          if (res.status === 403) {
            console.log(res.status);
            await refreshTokenReq();
            return;
          }
          return res.json();
        })
        .then((json) => {
          this.setTables(json.tables);
          this.setCount(json.count);
        });
    } catch (e) {
      console.log(e);
    }
  }
}
export default new TablesStore();
