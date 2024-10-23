/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import handleAxiosError from "@/handlers/axios/error";
import { ErrorResponse } from "@/interface/error";
import axios from "@/lib/axios";
import { AxiosError } from "axios";

export const updateProfile = async (data: {first_name:string,last_name:string,email:string,bio:string,designation:string}) => {
  try {
    console.log(data);
    const response = await axios.put(`/user/update-user`, data);
    console.log(response?.data);
    return response.data;
  } catch (error: any) {
    console.log(error?.response?.data);
    return handleAxiosError(error as AxiosError<ErrorResponse>);
  }
};
