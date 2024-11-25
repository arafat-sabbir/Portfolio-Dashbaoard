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
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { Loader } from "lucide-react";
import { loginAdmin } from "@/actions/auth/login-admin";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { useForm } from "react-hook-form";
import { loginUserSchema } from "@/lib/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

type LoginUserFormData = z.infer<typeof loginUserSchema>;

export function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const form = useForm<LoginUserFormData>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (data: LoginUserFormData) => {
    setLoading(true);
    try {
      const response = await loginAdmin(data);
      if (response.error) {
        return toast.error(response?.error);
      }
      router.push("/dashboard/profile");
      toast.success(response?.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <Card className="w-full max-w-lg p-8 mx-4 shadow-lg rounded-lg bg-white dark:bg-gray-800">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader className="space-y-2">
              <CardTitle className="text-3xl font-semibold text-gray-800 dark:text-white">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <CustomFormField
                name="email"
                control={control}
                placeholder="Enter your email"
                fieldType={FormFieldType.INPUT}
                type="email"
                label="Email"
              />
              <CustomFormField
                name="password"
                control={control}
                placeholder="Enter your password"
                fieldType={FormFieldType.PASSWORD}
                type="password"
                label="Password"
              />
            </CardContent>
            <CardFooter className="space-y-4 flex flex-col">
              <Button disabled={loading} className="w-full bg-primary">
                {loading ? (
                  <>
                    Logging in{" "}
                    <Loader className="animate-spin ml-2" size={22} />
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
    </Form>
  );
}
