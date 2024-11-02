/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import handleAxiosError from "@/handlers/axios/error";
import { ErrorResponse } from "@/interface/error";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";

export const updateProfile = async (data: FormData) => {
  try {
    console.log(data);
    const response = await axiosInstance.patch(`/user/update`, data);
    console.log(response?.data);
    return response.data;
  } catch (error: any) {
    console.log(error?.response?.data);
    return handleAxiosError(error as AxiosError<ErrorResponse>);
  }
};
