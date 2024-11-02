/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import handleAxiosError from "@/handlers/axios/error";
import { ILogin } from "@/interface/auth.interface";
import { ErrorResponse } from "@/interface/error";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

export const loginAdmin = async (data: ILogin) => {
  try {
    const response = await axiosInstance.post(`/user/login`, data);
    cookies().set("accessToken", response?.data?.data.token, {
      maxAge: 30 * 24 * 60 * 60,
    });
    console.log(response?.data);
    return response.data;
  } catch (error: any) {
    console.log(error?.response?.data);
    return handleAxiosError(error as AxiosError<ErrorResponse>);
  }
};
