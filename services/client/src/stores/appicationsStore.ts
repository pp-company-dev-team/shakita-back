import {refreshTokenReq} from "../hooks/auth.hook";
import {makeAutoObservable} from "mobx";

export type ApplicationsFilterBodyType = {
  date: string;
  email?: string;
  phone?: string;
  id_table?: string;
};

export type ApplicationsFilterType = ApplicationsFilterBodyType & {
  time: string;
};

class ApplicationsStore {
  setApplications: any;
  setCount: any;
  filter: ApplicationsFilterType = {
    date: "",
    time: "",
    email: "",
    phone: "",
    id_table: "",
  };
  body: ApplicationsFilterBodyType = {
    date: "",
    email: "",
    phone: "",
    id_table: "",
  };
  onChangeFilter = {
    email: "",
    phone: "",
  };
  count: number = 0;
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

  getApplicationsFormating() {
    this.formatDate();
    for (let key in this.filter) {
      if (this.filter[key as keyof ApplicationsFilterType]) {
        if (key !== "time" && key !== "date") {
          this.body[key as keyof ApplicationsFilterBodyType] =
            this.filter[key as keyof ApplicationsFilterType]!;
        }
      }
    }
    console.log("Body", this.body);
  }

  async getList(token: string) {
    try {
      this.getApplicationsFormating();
      const {date, ...body} = this.body;
      console.log("Date", date);
      console.log("Body", body);
      if (this.filter.id_table) {
        this.body.id_table = this.filter.id_table;
      }
      await fetch(
        `http://localhost:4200/applications/${date}/${this.currentPage}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Token": `${token}`,
          },
          body: JSON.stringify(body),
        }
      )
        .then(async (res) => {
          if (res.status === 403) {
            console.log(res.status);
            await refreshTokenReq();
            return;
          }
          return res.json();
        })
        .then((json) => {
          this.setApplications(json.tables);
          this.setCount(json.count);
        });
    } catch (e) {
      console.log(e);
    }
  }

  async getCount(token: string) {
    try {
      await fetch(`http://localhost:4200/applications/count`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": `${token}`,
        },
      })
        .then((res) => {
          if (res.status === 403) {
            console.log(res.status);
            return;
          }
          return res.json();
        })
        .then((json) => {
          this.count = json;
        });
    } catch (e) {
      console.log(e);
    }
  }
}
export default new ApplicationsStore();
