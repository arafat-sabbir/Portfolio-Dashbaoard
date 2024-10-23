/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorResponse } from "@/interface/error";
import { AxiosError } from "axios";

const handleAxiosError = (
  error: AxiosError<ErrorResponse>
): { error: string } => {
  const { response, request, message } = error;
  if (response) {
    const data = response?.data as any;
    const errorMessages =
      data.errors?.map((error: { message: string }) => error.message) || [];

    return {
      error: data?.message || errorMessages,
    };
  }

  if (request) {
    return {
      error:
        request?.data?.message || "Something is wrong. Please try again later.",
    };
  }

  return { error: message || "Something is wrong. Please try again later." };
};

export default handleAxiosError;
