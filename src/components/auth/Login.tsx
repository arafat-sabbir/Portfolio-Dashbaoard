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
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/actions/auth/login-admin";

export function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    try {
      const response = await loginAdmin({
        email,
        password,
      });
      console.log(response);
      if (response.error) {
        return toast.error(response?.error);
      }
      router.push("/dashboard");
      toast.success(response?.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
      <Card className="w-full max-w-lg p-8 mx-4 shadow-lg rounded-lg bg-white dark:bg-gray-800">
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-semibold text-gray-800 dark:text-white">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label
                htmlFor="email"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="example@student.com"
                className="border-gray-300 dark:border-gray-700"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="password"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  className="border-gray-300 dark:border-gray-700"
                  required
                />
                <Button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 bg-transparent hover:bg-transparent text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="space-y-4 flex flex-col">
            <Button disabled={loading} className="w-full bg-primary">
              {loading ? (
                <>
                  Logging in <Loader className="animate-spin ml-2" size={22} />
                </>
              ) : (
                "Login"
              )}
            </Button>
            <div className="text-center text-sm">
              <p className="text-gray-700 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-500 underline"
                >
                  Signup
                </Link>
              </p>
              <p className="text-gray-700 dark:text-gray-400">
                <Link
                  href="/forgot-password"
                  className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-500 underline"
                >
                  Forgot password?
                </Link>
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
