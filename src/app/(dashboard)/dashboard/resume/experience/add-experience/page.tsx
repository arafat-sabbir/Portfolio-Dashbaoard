import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Container from "@/components/Container";
import { AddExperienceForm } from "@/components/resume/experience/add-experience/AddExperienceForm";
import React from "react";

const AddExperience = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="All Experiences">
        <Container title="Add Experience">
          <AddExperienceForm />
        </Container>
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default AddExperience;
