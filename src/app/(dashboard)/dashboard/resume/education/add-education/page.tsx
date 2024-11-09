import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Container from "@/components/Container";
import { AddEducationForm } from "@/components/resume/education/add-education/AddEducationForm";

import React from "react";

const AddEducation = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Add Education">
        <Container title="Add Education">
          <AddEducationForm />
        </Container>
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default AddEducation;
