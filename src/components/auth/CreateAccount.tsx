"use client";

import { Button } from "@/components/ui/button";
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
import { Eye, EyeOff, Loader } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { registerAdmin } from "@/actions/auth/register-admin";

export function CreateAccount() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget as HTMLFormElement;
    const name = (form.elements.namedItem("fullName") as HTMLInputElement)
      .value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    try {
      const response = await registerAdmin({
        name,
        email,
        password,
      });
      if (response.error) {
        return toast.error(response?.error);
      }
      toast.success(response?.message);
      router.push("/sign-in");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-lg mx-4 p-6 shadow-lg rounded-lg bg-white dark:bg-gray-800">
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
              Create an Account
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Enter your details below to create your account.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label
                htmlFor="fullName"
                className="text-gray-800 dark:text-gray-200"
              >
                First Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                required
                placeholder="Enter Full Name"
                className="border-gray-300 dark:border-gray-700"
              />
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="email"
                className="text-gray-800 dark:text-gray-200"
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter Your Email"
                className="border-gray-300 dark:border-gray-700"
              />
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="password"
                className="text-gray-800 dark:text-gray-200"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  className="border-gray-300 dark:border-gray-700"
                />
                <Button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 bg-transparent hover:bg-transparent focus:ring-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff
                      size={16}
                      className="text-gray-700 dark:text-gray-300"
                    />
                  ) : (
                    <Eye
                      size={16}
                      className="text-gray-700 dark:text-gray-300"
                    />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="mt-6 grid gap-4">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white dark:bg-primary dark:hover:bg-primary/90 transition-all"
              disabled={loading}
            >
              Create Account
              {loading && <Loader className="animate-spin ml-2" size={22} />}
            </Button>

            <div className="text-center text-sm text-gray-600 dark:text-gray-300">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-primary hover:text-primary/90"
              >
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
