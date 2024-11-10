import { UpdateWorkForm } from "@/components/about/work/update-work/UpdateWorkForm";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Container from "@/components/Container";
import CustomBreadcrumb from "@/components/CustomBreakCrumb";
import React from "react";

const UpdateSkillPage = ({ params }: { params: { id: string } }) => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Update Skill">
        <CustomBreadcrumb />
        <Container title="Update Work">
          <UpdateWorkForm id={params.id} />
        </Container>
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default UpdateSkillPage;
