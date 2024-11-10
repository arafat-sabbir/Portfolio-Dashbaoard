import React from "react";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Container from "@/components/Container";
import BlogListsTable from "@/components/blog/BlogListTable";
import CustomBreadcrumb from "@/components/CustomBreakCrumb";

const PostsPage = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="All Blog">
        <CustomBreadcrumb />
        <Container title="All Blog">
          <BlogListsTable />
        </Container>
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default PostsPage;
