/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import handleAxiosError from "@/handlers/axios/error";
import { ErrorResponse } from "@/interface/error";
import axios from "@/lib/axios";
import { AxiosError } from "axios";

export const getAllBlogs = async () => {
  try {
    const response = await axios.get(`/blogs`);
    return response.data;
  } catch (error: any) {
    return handleAxiosError(error as AxiosError<ErrorResponse>);
  }
};