import { makeAutoObservable } from "mobx";

export class ErrorBounderModel {
  public isErrors: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  public setErrorsTrue() {
    console.log("setErrorsTrue");
    this.isErrors = true;
  }

  public setErrorsFalse() {
    this.isErrors = false;
  }
}

export const errorBounderModel = new ErrorBounderModel();
