import { AddWorkForm } from "@/components/about/work/add-work/AddWorkForm";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Container from "@/components/Container";
import React from "react";

const AddSkillPage = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Add Work">
        <Container title="Add Work">
          <AddWorkForm />
        </Container>
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default AddSkillPage;
