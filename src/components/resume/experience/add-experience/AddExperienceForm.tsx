/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { addExperienceSchema } from "@/lib/zod.schema";
import { addExperience } from "@/actions/resume/experience/add-new-experience";
import SubmitButton from "@/components/SubmitButton";

export function AddExperienceForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof addExperienceSchema>>({
    resolver: zodResolver(addExperienceSchema),
    defaultValues: {
      companyName: "",
      position: "",
      startDate: undefined,
      endDate: undefined,
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof addExperienceSchema>) => {
    setLoading(true);
    try {
      const response = await addExperience(data);
      if (response?.error) {
        return toast.error(response?.error);
      }
      toast.success(response?.message);
      router.push("/dashboard/resume/experience");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="form-background">
        {/* Blog Title */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="companyName"
          label="Company Name"
          placeholder="Enter your companyName name"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="position"
          label="Your Position"
          placeholder="Enter your Position"
        />
        {/* Blog Category */}
        <CustomFormField
          fieldType={FormFieldType.CALENDAR}
          control={control}
          name="startDate"
          label="Start Date"
          placeholder="Enter Starting Date"
        />
        <CustomFormField
          fieldType={FormFieldType.CALENDAR}
          control={control}
          name="endDate"
          label="End Date"
          placeholder="Enter End Date"
        />
        {/* Submit Button */}
        <SubmitButton loading={loading} />
      </form>
    </Form>
  );
}
