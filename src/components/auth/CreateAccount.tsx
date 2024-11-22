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
import { Loader } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { registerAdmin } from "@/actions/auth/register-admin";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUserSchema } from "@/lib/zod.schema";
import { z } from "zod";
import { Form } from "../ui/form";

// Define form type using zod schema
type RegisterUserFormData = z.infer<typeof registerUserSchema>;

export function CreateAccount() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterUserFormData>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (data: RegisterUserFormData) => {
    setLoading(true);
    try {
      const response = await registerAdmin(data);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(response.message);
        router.push("/verify-otp");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-lg mx-4 p-6 shadow-lg rounded-lg bg-white dark:bg-gray-800">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
                Create an Account
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Enter your details below to create your account.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Email Field */}
              <CustomFormField
                control={control}
                name="email"
                label="Email"
                fieldType={FormFieldType.INPUT}
                placeholder="Enter Your Email"
              />

              {/* Password Field */}
              <CustomFormField
                control={control}
                name="password"
                label="Password"
                fieldType={FormFieldType.PASSWORD}
                placeholder="Enter Your Password"
              />
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
    </Form>
  );
}
