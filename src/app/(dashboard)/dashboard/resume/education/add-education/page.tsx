import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import AddEducationContainer from "@/components/resume/education/add-education/AddEducationContainer";

import React from "react";

const AddEducation = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Add Education">
        <AddEducationContainer />
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default AddEducation;
