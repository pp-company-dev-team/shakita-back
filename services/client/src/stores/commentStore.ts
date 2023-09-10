import { makeAutoObservable } from "mobx";

class CommentStore {
  comment = {
    text: "",
    rate: 0,
  };

  constructor() {
    makeAutoObservable(this);
  }
  addField(event: React.SyntheticEvent) {
    let target = event.target as HTMLInputElement;
    this.comment = { ...this.comment, [target.name]: target.value };
  }

  setRating(value: number) {
    this.comment.rate = value;
  }

  async sendForm() {
    try {
      const message = {
        isSuccess: false,
        payload: "Error",
      };
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
      return message;
    } catch (e) {
      console.error("Error", e);
    }
  }
}

const store = new CommentStore();
export default store;
