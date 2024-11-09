import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { AddBlogForm } from "@/components/blog/add-blog/AddBlogForm";
import Container from "@/components/Container";
import React from "react";

const AddBlogPage = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Add Blog">
        <Container title="Add Blog">
          <AddBlogForm />
        </Container>
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default AddBlogPage;
