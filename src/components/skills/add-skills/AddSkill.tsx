/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "ckeditor5/ckeditor5.css";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader } from "lucide-react";
import { BottomGradient } from "@/components/BottomGradient";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import {  skillSchema } from "@/lib/zod.schema";
import { addPortfolio } from "@/actions/portfolio/add-portfolio";

// Define Zod schema for validation

export function AddSkillForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof skillSchema>>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      skill: "",
      level: 0,
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof skillSchema>) => {
    setLoading(true);
    try {
      const response = await addPortfolio(data);

      if (response?.error) {
        return toast.error(response?.error);
      }
      toast.success(response?.message);
      router.push("/dashboard/portfolios");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Project Title */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="skill"
          label="Skill Name"
          placeholder="Enter your Skill Name"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="level"
          label="Enter Your Skill Level (1-100)"
          placeholder="Enter your Skill Level (1-100)"
        />
        {/* Submit Button */}
        <Button
          disabled={loading}
          className="bg-gradient-to-br relative group/btn from-black dark:from-black dark:to-black to-neutral-600 dark:bg-black w-full text-white gap-2 items-center justify-center flex rounded-md h-10 font-medium max-w-32"
        >
          Submit{" "}
          {loading ? (
            <Loader size={22} className="animate-spin" />
          ) : (
            <ArrowRight size={22} />
          )}
          <BottomGradient />
        </Button>
      </form>
    </Form>
  );
}
