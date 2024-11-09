import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import AddBlogContainer from "@/components/blog/add-blog/AddBlogContainer";
import React from "react";

const AddBlogPage = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Add Blog">
        <AddBlogContainer />
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default AddBlogPage;
