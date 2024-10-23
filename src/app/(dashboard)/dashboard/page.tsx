// import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
// import { ContentLayout } from "@/components/admin-panel/content-layout";
// import DashboardOverview from "@/components/dashboardOverview";
// import PlaceholderContent from "@/components/placeholder-content";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
import { permanentRedirect } from "next/navigation";

const DashboardPage = () => {
  return permanentRedirect("/dashboard/posts");
  // <AdminPanelLayout>
  //   <ContentLayout title="Dashboard">
  //     <Breadcrumb>
  //       <BreadcrumbList>
  //         <BreadcrumbItem>
  //           <BreadcrumbLink asChild>
  //             <Link href="/">Home</Link>
  //           </BreadcrumbLink>
  //         </BreadcrumbItem>
  //         <BreadcrumbSeparator />
  //         <BreadcrumbItem>
  //           <BreadcrumbPage>Dashboard</BreadcrumbPage>
  //         </BreadcrumbItem>
  //       </BreadcrumbList>
  //     </Breadcrumb>
  //     {/* <PlaceholderContent /> */}
  //     <DashboardOverview />
  //   </ContentLayout>
  // </AdminPanelLayout>
};

export default DashboardPage;
