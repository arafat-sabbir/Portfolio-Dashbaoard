import { permanentRedirect } from "next/navigation";

const DashboardPage = () => {
  return permanentRedirect("/dashboard/blogs");
};

export default DashboardPage;
