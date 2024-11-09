import AddWorkContainer from "@/components/about/work/add-work/AddWorkContainer";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import React from "react";

const AddSkillPage = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Add Client">
        <AddWorkContainer />
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default AddSkillPage;
