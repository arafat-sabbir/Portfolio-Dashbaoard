import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Container from "@/components/Container";
import CustomBreadcrumb from "@/components/CustomBreakCrumb";
import { UpdateEducationForm } from "@/components/resume/education/update-education/UpdateEducationForm";

const UpdateEducationPage = ({ params }: { params: { id: string } }) => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Companies">
        <CustomBreadcrumb />
        <Container title="Update Education">
          <UpdateEducationForm id={params.id} />
        </Container>
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default UpdateEducationPage;
