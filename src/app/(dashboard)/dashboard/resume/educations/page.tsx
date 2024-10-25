import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import EducationListContainer from "@/components/resume/education/EducationListContainer";
// import ExperienceListContainer from "@/components/resume/experience/ExperienceListContainer";
import React from "react";

const Educations = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="All Educations">
        {/* <ExperienceListContainer /> */}
        <EducationListContainer />
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default Educations;
