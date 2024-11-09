import AddClientContainer from "@/components/about/client/add-client/AddClientContainer";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import React from "react";

const AddSkillPage = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Add Client">
        <AddClientContainer />
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default AddSkillPage;
