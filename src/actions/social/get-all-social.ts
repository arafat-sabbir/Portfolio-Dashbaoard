/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import handleAxiosError from "@/handlers/axios/error";
import { ErrorResponse } from "@/interface/error";
import {axiosInstance} from "@/lib/axios";
import { AxiosError } from "axios";

export const getAllSocial = async () => {
  try {
    const response = await axiosInstance.get(`/socials`);
    return response.data;
  } catch (error: any) {
    return handleAxiosError(error as AxiosError<ErrorResponse>);
  }
};