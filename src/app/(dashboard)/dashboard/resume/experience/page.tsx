import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Container from "@/components/Container";
import ExperienceListTable from "@/components/resume/experience/ExperienceListTable";

const Experiences = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="All Experiences">
        <Container title="All Experience">
          <ExperienceListTable />
        </Container>
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default Experiences;
