import { makeAutoObservable } from "mobx";

class MessageStore {
  message = {
    username: "",
    message: "",
    parentId: 0,
    id: Date.now(),
    event: "message",
  };

  constructor() {
    makeAutoObservable(this);
  }

  addField(value: string | number, name: string) {
    this.message = { ...this.message, [name]: value };
    console.log(this.message.parentId);
  }
}

const store = new MessageStore();
export default store;
