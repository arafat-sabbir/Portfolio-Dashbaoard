import { permanentRedirect } from "next/navigation";

const DashboardPage = () => {
  return permanentRedirect("/dashboard/profile");
};

export default DashboardPage;
