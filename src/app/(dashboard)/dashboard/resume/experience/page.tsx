import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import ExperienceListContainer from "@/components/resume/experience/ExperienceListContainer";
import React from "react";

const Experiences = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="All Experiences">
        <ExperienceListContainer />
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default Experiences;
