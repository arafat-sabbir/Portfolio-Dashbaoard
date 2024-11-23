/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorResponse } from "@/interface/error";
import { AxiosError } from "axios";

const handleAxiosError = (
  error: AxiosError<ErrorResponse>
): { error: string } => {
  const { response, request, message } = error;

  if (response) {
    const data = response?.data as any;

    // Handle `data.message` if it's a string or an array of strings
    const formattedMessage =
      Array.isArray(data?.message)
        ? data.message.join(", ") // Join array elements with a comma
        : data?.message || "An error occurred.";

    const errorMessages =
      data.errors?.map((err: { message: string }) => err.message).join(", ") ||
      "";

    return {
      error: formattedMessage || errorMessages,
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
