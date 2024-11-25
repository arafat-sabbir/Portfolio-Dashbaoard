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
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/actions/auth/forgot-password";

function ForgetPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)
      .value as string;

    try {
      const response = await forgotPassword({ email });
      if (response.error) {
        return toast.error(response?.error);
      }
      toast.success(response?.message);
      router.push(`/verify-forgot-otp?email=${email}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="flex justify-center items-center min-h-screen">
      <Card className="w-full mx-4 md:max-w-96">
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Forgot Password</CardTitle>
            <CardDescription>Enter your email below to confirm</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                required
                type="email"
                placeholder="example@student.com"
              />
            </div>
          </CardContent>
          <CardFooter className="grid">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white dark:bg-primary dark:hover:bg-primary/90 transition-all"
              disabled={loading}
            >
              Send Otp <ArrowRight />
              {loading && <Loader className="animate-spin ml-2" size={22} />}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}

export default ForgetPassword;
