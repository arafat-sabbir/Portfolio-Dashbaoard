import React from "react";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Container from "@/components/Container";
import PortfolioListsTable from "@/components/portfolio/PortfolioListTable";
import CustomBreadcrumb from "@/components/CustomBreakCrumb";

const PostsPage = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="All Blogs">
      <CustomBreadcrumb />
        <Container title="All Portfolio">
          <PortfolioListsTable />
        </Container>
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default PostsPage;
