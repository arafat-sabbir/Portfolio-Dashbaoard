import { getServerToken } from "@/lib/get-server-token";
import { permanentRedirect } from "next/navigation";

export default function Home() {
  const token = getServerToken();
  if (!token) {
    return permanentRedirect("/sign-in");
  } else {
    return permanentRedirect("/dashboard/resume/educations");
  }
}
