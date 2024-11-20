import type { Metadata } from "next";
import { getServerToken } from "@/lib/get-server-token";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "FinalTry Innovations",
  description: "Portfolio Dashboard Created By FinalTry Innovations",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const token = getServerToken();
  if (!token) {
    return redirect("/sign-in");
  }
  return <div>{children}</div>;
}
