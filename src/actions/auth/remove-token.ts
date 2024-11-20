/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export const removeToken = async () => {
  try {
    const cookieStore = cookies();
    cookieStore.set("accessToken", "", { expires: new Date(0) }); // Remove the cookie
  } catch (error: any) {
    console.error("Error removing token:", error);
  }
};
