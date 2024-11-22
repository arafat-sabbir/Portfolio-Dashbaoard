/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import handleAxiosError from "@/handlers/axios/error";
import { ErrorResponse } from "@/interface/error";
import {axiosInstance} from "@/lib/axios";
import { AxiosError } from "axios";

export const verifyOtp = async (data: {otp:string}) => {
  try {
    const response = await axiosInstance.patch(`/admin/verify-opt`, data);
    return response.data;
  } catch (error: any) {
    return handleAxiosError(error as AxiosError<ErrorResponse>);
  }
};
