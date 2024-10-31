"use client";
import UserProfileForm from "./ProfileForm";
import { getClientToken, getDecodedUser } from "@/lib/utils";
import { TUser } from "@/interface/user.interface";

const ProfileDetails = () => {
  const token = getClientToken();
  const user = token ? (getDecodedUser(token) as TUser) : null;

  return (
    <div className="mt-10">
      <UserProfileForm user={user as TUser} />
    </div>
  );
};

export default ProfileDetails;
