import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Container from "@/components/Container";
import CustomBreadcrumb from "@/components/CustomBreakCrumb";
import { UpdateSkillForm } from "@/components/resume/skill/update-skill/UpdateSkillForm";


const UpdateSkillPage = ({ params }: { params: { id: string } }) => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Update Skill">
        <CustomBreadcrumb />
        <Container title="Update Skill">
          <UpdateSkillForm id={params.id} />
        </Container>
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default UpdateSkillPage;
