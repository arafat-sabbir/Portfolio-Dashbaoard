import { getUser } from "@/actions/auth/get-admin";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import CustomBreadcrumb from "@/components/CustomBreakCrumb";
import UserProfileForm from "@/components/profile/ProfileForm";

import { TUser } from "@/interface/user.interface";
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
          <CustomBreadcrumb />
        <UserProfileForm user={user as TUser} />
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default ProfilePage;
