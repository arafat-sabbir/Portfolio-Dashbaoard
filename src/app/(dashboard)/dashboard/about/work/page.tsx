import React from "react";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Container from "@/components/Container";
import WorkListsTable from "@/components/about/work/WorkListTable";
import CustomBreadcrumb from "@/components/CustomBreakCrumb";

const SkillsPage = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="All Work">
        <CustomBreadcrumb />
        <Container title="All Work">
          <WorkListsTable />
        </Container>
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default SkillsPage;
