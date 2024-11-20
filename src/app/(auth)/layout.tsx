import { getUser } from "@/actions/auth/get-admin";
import { getServerToken } from "@/lib/get-server-token";
import { removeToken } from "@/lib/remove-token";
import { getDecodedUser } from "@/lib/utils";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }) => {
  const token = getServerToken();

  const user = getDecodedUser(token as string) as any;
  const serverUser = await getUser();

  if (!serverUser || user.id !== serverUser?.data?._id) {
    return redirectToSignIn();
  } else {
    redirect("/dashboard");
  }
  return <div className="auth-layout">{children}</div>;
};

// Helper function to redirect and handle token removal
async function redirectToSignIn() {
  removeToken(); // Ensure this function only runs in server-side context
  redirect("/sign-in");
}
export default AuthLayout;
