"use server";

import { cookies } from "next/headers";

export const removeToken = () => {
  cookies().delete("accessToken");
};
