import { getAdmin } from "@/actions/auth/get-admin";
import { getUser } from "@/actions/auth/get-profile";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import CustomBreadcrumb from "@/components/CustomBreakCrumb";
import UserProfileForm from "@/components/profile/ProfileForm";

import { TUser } from "@/interface/user.interface";
import React from "react";

const ProfilePage = async () => {
  let user;
  let admin;
  try {
    const response = await getUser();
    const responseAdmin = await getAdmin();
    user = response?.data as TUser;
    admin = responseAdmin?.data;
  } catch (error) {
    console.log(error);
  }
  return (
    <AdminPanelLayout>
      <ContentLayout title="All FAQs">
        <CustomBreadcrumb />
        <UserProfileForm user={user as TUser} admin={admin as any}/>
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default ProfilePage;
