import React from "react";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Container from "@/components/Container";
import SkillListsTable from "@/components/resume/skill/SkillListTable";
import CustomBreadcrumb from "@/components/CustomBreakCrumb";

const SkillsPage = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="All Skills">
        <CustomBreadcrumb />
        <Container title="All Skill">
          <SkillListsTable />
        </Container>
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default SkillsPage;
