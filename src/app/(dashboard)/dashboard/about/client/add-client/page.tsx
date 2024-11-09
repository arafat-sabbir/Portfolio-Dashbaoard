import { AddClientForm } from "@/components/about/client/add-client/AddClientForm";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Container from "@/components/Container";
import React from "react";

const AddSkillPage = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Add Client">
      <Container title="Add Client">
        <AddClientForm />
      </Container>
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default AddSkillPage;
