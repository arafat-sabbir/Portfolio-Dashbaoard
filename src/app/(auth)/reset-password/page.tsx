"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/actions/auth/reset-password";

function ResetPasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const searchParams = useSearchParams();
  const otp = searchParams.get("otp") || "";
  const email = searchParams.get("email") || "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("submitting");
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const newPassword = (
      form.elements.namedItem("newPassword") as HTMLInputElement
    ).value;
    const confirmPassword = (
      form.elements.namedItem("confirmPassword") as HTMLInputElement
    ).value;

    if (newPassword !== confirmPassword) {
      setLoading(false);
      return toast.error("Passwords do not match");
    }

    try {
      const response = await resetPassword({
        password: newPassword,
        otp,
        email,
      });
      if (response.error) {
        return toast.error(response.error);
      }
      toast.success(response.message);
      router.push("/sign-in");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen">
      <Card className="w-full mx-4 md:max-w-96">
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Reset Password</CardTitle>
            <CardDescription>Enter your new password below</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    placeholder="Enter your new password"
                    name="newPassword"
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                  />
                  <Button
                    type="button"
                    className="absolute inset-y-0 right-0 shadow-none px-3 bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff
                        size={16}
                        className="text-black dark:text-gray-200"
                      />
                    ) : (
                      <Eye
                        size={16}
                        className="text-black dark:text-gray-200"
                      />
                    )}
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    placeholder="Confirm your new password"
                    name="confirmPassword"
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                  />
                  <Button
                    type="button"
                    className="absolute shadow-none inset-y-0 right-0 px-3 bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff
                        size={16}
                        className="text-black dark:text-gray-200"
                      />
                    ) : (
                      <Eye
                        size={16}
                        className="text-black dark:text-gray-200"
                      />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="grid">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white dark:bg-primary dark:hover:bg-primary/90 transition-all"
              disabled={loading}
            >
              Submit
              {loading && <Loader className="animate-spin ml-2" size={20} />}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}

const ResetPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
};
export default ResetPassword;
