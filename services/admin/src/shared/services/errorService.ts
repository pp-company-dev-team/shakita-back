import { errorBounderModel } from "@/components/Layout/ErrorBounder/model";
import { GraphQLError } from "graphql";

export class ErrorService {
  private errCode: number | null = null;
  private errMessage: string | null = null;

  public setError(error: any) {
    this.errCode = error.response?.statusCode;
    this.errMessage = error.response?.message;
    console.log("setError");
    errorBounderModel.setErrorsTrue();
  }
}

export const errorService = new ErrorService();
