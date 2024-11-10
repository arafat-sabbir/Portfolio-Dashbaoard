import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { UpdateBlogForm } from "@/components/blog/update-blog/UpdateBlogForm";
import Container from "@/components/Container";
import CustomBreadcrumb from "@/components/CustomBreakCrumb";
import React from "react";

const UpdatePostPage = ({ params }: { params: { id: string } }) => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Companies">
      <CustomBreadcrumb />
        <Container title="Update Blog">
          <UpdateBlogForm id={params.id} />
        </Container>
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default UpdatePostPage;
