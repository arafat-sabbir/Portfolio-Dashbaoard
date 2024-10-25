import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import AddBlogContainer from "@/components/blogs/add-blog/AddBlogContainer";
import React from "react";

const Educations = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="All Educations">
        <AddBlogContainer />
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default Educations;
