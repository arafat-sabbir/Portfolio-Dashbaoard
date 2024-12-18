/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { editExperienceSchema } from "@/lib/zod.schema";
import { getSingleExperience } from "@/actions/resume/experience/get-single-experience";
import { editExperience } from "@/actions/resume/experience/edit-experience";
import SubmitButton from "@/components/SubmitButton";

export function UpdateExperienceForm({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof editExperienceSchema>>({
    resolver: zodResolver(editExperienceSchema),
    defaultValues: {
      companyName: "",
      position: "",
    },
  });

  const { control, handleSubmit, reset } = form;
  useEffect(() => {
    const getSingleBlogDetails = async () => {
      try {
        const response = await getSingleExperience(id);
        if (response?.error) {
          return toast.error(response?.error);
        }
        // Reset form values after fetching data
        reset({
          companyName: response?.data?.companyName || "",
          position: response?.data?.position || "",
          startDate: new Date(response?.data?.startDate) as Date,
          endDate: new Date(response?.data?.endDate) as Date,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getSingleBlogDetails();
  }, [id, reset]);
  const onSubmit = async (data: z.infer<typeof editExperienceSchema>) => {
    setLoading(true);
    try {
      const response = await editExperience(id, data);
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
