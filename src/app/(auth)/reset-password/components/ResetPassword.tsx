"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {  Eye, EyeOff, Loader } from "lucide-react";
import { resetPassword } from "../../../../actions/auth/reset-password";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function ResetPasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const searchParams = useSearchParams();
  const resetPasswordToken = searchParams.get("token") || "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const newPassword = (form.elements.namedItem("newPassword") as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement).value;

    if (newPassword !== confirmPassword) {
      setLoading(false);
      return toast.error("Passwords do not match");
    }

    try {
      const response = await resetPassword(newPassword, resetPasswordToken);
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
                  className="absolute inset-y-0 right-0 px-3 bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
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
                  className="absolute inset-y-0 right-0 px-3 bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid">
          <button
            disabled={loading}
            className="bg-gradient-to-br relative from-black to-neutral-600 w-full text-white flex items-center justify-center rounded-md h-10 font-medium"
            type="submit"
          >
            Submit {loading && <Loader size={22} className="animate-spin ml-2" />}
          </button>
        </CardFooter>
      </form>
    </Card>
  );
}

const ResetPassword=()=> {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
export default ResetPassword;