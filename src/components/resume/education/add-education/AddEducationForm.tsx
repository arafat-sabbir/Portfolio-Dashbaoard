/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader } from "lucide-react";
import { BottomGradient } from "@/components/BottomGradient";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { addEducationSchema } from "@/lib/zod.schema";
import { addEducation } from "@/actions/resume/education/add-new-education";
import SubmitButton from "@/components/SubmitButton";

export function AddEducationForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof addEducationSchema>>({
    resolver: zodResolver(addEducationSchema),
    defaultValues: {
      instituteName: "",
      degreeName: "",
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof addEducationSchema>) => {
    setLoading(true);
    try {
      const response = await addEducation(data);
      if (response?.error) {
        return toast.error(response?.error);
      }
      toast.success(response?.message);
      router.push("/dashboard/resume/educations");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Blog Title */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="instituteName"
          label="Institute Name"
          placeholder="Enter your institute name"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="degreeName"
          label="Degree Name"
          placeholder="Enter your degree name"
        />
        {/* Blog Category */}
        <CustomFormField
          fieldType={FormFieldType.CALENDAR}
          control={control}
          name="startDate"
          label="Start Date"
          placeholder="Enter Education Starting Date"
        />
        <CustomFormField
          fieldType={FormFieldType.CALENDAR}
          control={control}
          name="endDate"
          label="End Date"
          placeholder="Enter Education End Date"
        />
        {/* Submit Button */}
        <SubmitButton loading={loading} />
      </form>
    </Form>
  );
}
