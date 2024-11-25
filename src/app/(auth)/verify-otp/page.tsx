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
import { verifyOtp } from "@/actions/auth/verify-otp";
import { useRouter } from "next/navigation";

function VerifyOtp() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const otp = (form.elements.namedItem("otp") as HTMLInputElement)
      .value as string;

    try {
      const response = await verifyOtp({ otp: otp });
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
    <div className="w-full h-screen flex justify-center items-center">
      {" "}
      <Card className="w-full mx-4 md:max-w-96">
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Verify Account</CardTitle>
            <CardDescription>Enter The Otp From Your Email To Verify Your Account</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="otp">Otp</Label>
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
          <CardFooter className="grid">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white dark:bg-primary dark:hover:bg-primary/90 transition-all"
              disabled={loading}
            >
              Verify Otp <ArrowRight />
              {loading && <Loader className="animate-spin ml-2" size={22} />}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default VerifyOtp;
