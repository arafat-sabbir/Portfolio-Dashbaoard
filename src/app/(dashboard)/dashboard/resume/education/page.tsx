import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Container from "@/components/Container";
import EducationListTable from "@/components/resume/education/EducationListTable";

import React from "react";

const Educations = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="All Educations">
        <Container title="All Educations">
          <EducationListTable />
        </Container>
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default Educations;
