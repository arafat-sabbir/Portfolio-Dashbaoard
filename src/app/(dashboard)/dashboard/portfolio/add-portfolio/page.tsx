import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import AddPortfolioContainer from "@/components/portfolio/add-portfolio/AddPortfolioContainer";
import React from "react";

const AddPortfolioPage = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Add Portfolio">
        <AddPortfolioContainer />
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default AddPortfolioPage;
