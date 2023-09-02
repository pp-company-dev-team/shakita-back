import {makeAutoObservable} from "mobx";

class AuthStore {
  user = {
    id: "",
    password: "",
    username: "",
  };
  activeUser = {
    name: "",
    accessToken: "",
    refreshToken: "",
  };
  ok = false;
  message = "";
  constructor() {
    makeAutoObservable(this);
  }

  addField(value: string, name: string) {
    this.user = {...this.user, [name]: value};
  }
  async signUp() {
    try {
      const data = await fetch("http://localhost:4200/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.user),
      })
        .then((info) => info.json())
        .then((info) => {
          if (info.error) {
            this.message = info.message;
          } else {
            this.message = info.message;
            this.ok = true;
          }
        });
      console.log(data);
    } catch (e) {
      throw e;
    }
  }

  async logIn() {
    try {
      await fetch("http://localhost:4200/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.user),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (!data.error) {
            this.ok = true;
          }
          this.message = data.message;
          this.activeUser.accessToken = data.accessToken;
          this.activeUser.refreshToken = data.refreshToken;
          this.activeUser.name = data.name;
        });
    } catch (e) {
      throw e;
    }
  }
}
export default new AuthStore();
