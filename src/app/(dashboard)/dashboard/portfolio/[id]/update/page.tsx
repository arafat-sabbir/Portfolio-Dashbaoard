import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Container from "@/components/Container";
import CustomBreadcrumb from "@/components/CustomBreakCrumb";
import { UpdatePortfolioForm } from "@/components/portfolio/update-portfolio/UpdatePortfolioForm";


const UpdatePortfolioPage = ({params}:{params:{id:string}}) => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Update Portfolio">
      <CustomBreadcrumb />
        <Container title="Update Portfolio">
          <UpdatePortfolioForm id={params.id} />
        </Container>
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default UpdatePortfolioPage;
