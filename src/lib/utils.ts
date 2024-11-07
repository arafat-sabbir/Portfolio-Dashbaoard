import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getClientToken = () => {
  const token = Cookies.get("accessToken");
  if (token) {
    return token;
  } else {
    return null;
  }
};

export const getDecodedUser = (token: string) => {
  return jwtDecode(token);
};



export const generateImage = (path: string) => {
  if (!path) {
    return "";
  }

  return `https://api.portfolio.finaltry-innovations.site${path}`;
};

