import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Container from "@/components/Container";
import CustomBreadcrumb from "@/components/CustomBreakCrumb";
import { UpdateExperienceForm } from "@/components/resume/experience/update-experience/UpdateExperienceForm";

const UpdatePostPage = ({ params }: { params: { id: string } }) => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Companies">
        <CustomBreadcrumb />
        <Container title="Update Experience">
          <UpdateExperienceForm id={params.id} />
        </Container>
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default UpdatePostPage;
