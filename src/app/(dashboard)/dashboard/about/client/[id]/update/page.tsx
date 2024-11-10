import { UpdateClientForm } from "@/components/about/client/update-client/UpdateClientForm";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Container from "@/components/Container";
import CustomBreadcrumb from "@/components/CustomBreakCrumb";
import React from "react";

const UpdateClientPage = ({ params }: { params: { id: string } }) => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Update Client">
        <CustomBreadcrumb />
        <Container title="Update Client">
          <UpdateClientForm id={params.id} />
        </Container>
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default UpdateClientPage;
