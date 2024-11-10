import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Container from "@/components/Container";
import CustomBreadcrumb from "@/components/CustomBreakCrumb";
import SocialListTable from "@/components/social/SocialsListTable";
import React from "react";

const SocialsPage = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Manage Social">
        <CustomBreadcrumb />
        <Container title="Manage Social">
          <SocialListTable />
        </Container>
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default SocialsPage;
