/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import handleAxiosError from "@/handlers/axios/error";
import { ErrorResponse } from "@/interface/error";
import { axiosInstance } from "@/lib/axios";
import  { AxiosError } from "axios";

export const deletePortfolio = async (id:string) => {
  try {
    const response = await axiosInstance.delete(`/portfolios/${id}`);
    return response.data;
  } catch (error: any) {

    return handleAxiosError(error as AxiosError<ErrorResponse>);
  }
};