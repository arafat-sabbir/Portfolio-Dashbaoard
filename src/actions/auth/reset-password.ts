/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import handleAxiosError from "@/handlers/axios/error";
import { ErrorResponse } from "@/interface/error";
import {axiosInstance} from "@/lib/axios";
import { AxiosError } from "axios";

export const resetPassword = async (new_password:string, resetPasswordToken:string) => {
  try {
    const response = await axiosInstance.post(
      `/auth/reset-password?resetPasswordToken=${resetPasswordToken}`,
      {new_password}
    );
    return response.data;
  } catch (error: any) {
    return handleAxiosError(error as AxiosError<ErrorResponse>);
  }
};
