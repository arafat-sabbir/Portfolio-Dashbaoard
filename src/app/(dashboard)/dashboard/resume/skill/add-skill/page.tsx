import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import AddSkillContainer from "@/components/skill/add-skills/AddSkillContainer";
import React from "react";

const AddSkillPage = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Add Skill">
        <AddSkillContainer />
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default AddSkillPage;
