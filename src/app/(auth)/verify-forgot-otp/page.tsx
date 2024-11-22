"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { verifyForgotOtp } from "@/actions/auth/verify-forgot-otp";
import { useRouter, useSearchParams } from "next/navigation";

function VerifyForgotOtp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const otp = (form.elements.namedItem("otp") as HTMLInputElement).value;

    try {
      const response = await verifyForgotOtp({
        otp,
        email: searchParams.get("email") as string,
      });
      if (response.error) {
        return toast.error(response?.error);
      }
      toast.success(response?.message);
      router.push(
        `/reset-password?email=${searchParams.get("email")}&&otp=${otp}`
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-full mx-4 md:max-w-lg">
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Verify OTP</CardTitle>
            <CardDescription>Enter the OTP sent to your email</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="otp" className="text-sm font-medium">
                OTP
              </Label>
              <Input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="123456"
                required
                className="text-center tracking-widest"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white dark:bg-primary dark:hover:bg-primary/90 transition-all"
              disabled={loading}
            >
              {loading ? (
                <>
                  Verifying <Loader className="animate-spin ml-2" size={20} />
                </>
              ) : (
                <>
                  Verify OTP <ArrowRight className="ml-2" />
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default VerifyForgotOtp;
