import { getUser } from "@/actions/auth/get-admin";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import UserProfileForm from "@/components/profile/ProfileForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { TUser } from "@/interface/user.interface";
import Link from "next/link";
import React from "react";

const ProfilePage = async () => {
  let user;
  try {
    const response = await getUser();
    user = response?.data as TUser;
  } catch (error) {
    console.log(error);
  }
  return (
    <AdminPanelLayout>
      <ContentLayout title="All FAQs">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Profille</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <UserProfileForm user={user as TUser} />
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default ProfilePage;
