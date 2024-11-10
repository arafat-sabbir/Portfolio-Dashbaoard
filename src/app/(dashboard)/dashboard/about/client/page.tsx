import React from "react";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import ClientListsTable from "@/components/about/client/ClientListTable";
import Container from "@/components/Container";
import CustomBreadcrumb from "@/components/CustomBreakCrumb";

const ClientPage = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="All Skills">
      <CustomBreadcrumb />
        <Container title="All Client">
          <ClientListsTable />
        </Container>
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default ClientPage;
