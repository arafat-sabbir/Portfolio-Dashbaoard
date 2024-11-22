/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import handleAxiosError from "@/handlers/axios/error";
import { ErrorResponse } from "@/interface/error";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";

export const resetPassword = async ({
  password,
  otp,
  email,
}: {
  password: string;
  otp: string;
  email: string;
}) => {
  try {
    const response = await axiosInstance.patch(`/admin/forgot-password`, {
      password,
      otp,
      email,
    });
    return response.data;
  } catch (error: any) {
    return handleAxiosError(error as AxiosError<ErrorResponse>);
  }
};
