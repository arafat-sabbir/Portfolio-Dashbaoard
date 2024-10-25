import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import AddExperienceContainer from "@/components/resume/add-experience/AddExperienceContainer";
import React from "react";

const AddExperience = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="All Experiences">
        <AddExperienceContainer />
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default AddExperience;
