import { permanentRedirect } from "next/navigation";

const DashboardPage = () => {
  return permanentRedirect("/dashboard/resume/educations");
};

export default DashboardPage;
