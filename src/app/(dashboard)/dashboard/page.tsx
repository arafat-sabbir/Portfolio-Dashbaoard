import { permanentRedirect } from "next/navigation";

const DashboardPage = () => {
  return permanentRedirect("/dashboard/resume/education");
};

export default DashboardPage;
