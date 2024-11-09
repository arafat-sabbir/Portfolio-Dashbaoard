import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Container from "@/components/Container";
import { AddSkillForm } from "@/components/resume/skill/add-skills/AddSkillForm";
import React from "react";

const AddSkillPage = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Add Skill">
        <Container title="Add Skill">
          <AddSkillForm />
        </Container>
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default AddSkillPage;
