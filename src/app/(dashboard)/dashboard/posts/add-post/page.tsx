import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import React from "react";
import AddPostContainer from "./AddPostContainer";

const AddPostPage = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Add Post">
        <AddPostContainer />
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default AddPostPage;
