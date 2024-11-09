import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Container from "@/components/Container";
import { AddPortfolioForm } from "@/components/portfolio/add-portfolio/AddPortfolioForm";
import React from "react";

const AddPortfolioPage = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Add Portfolio">
        <Container title="Add Portfolio">
          <AddPortfolioForm />
        </Container>
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default AddPortfolioPage;
