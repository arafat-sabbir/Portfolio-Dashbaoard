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
import { editEducationSchema } from "@/lib/zod.schema";
import { getSingleEducation } from "@/actions/resume/education/get-single-education";
import { editEducation } from "@/actions/resume/education/edit-education";
import SubmitButton from "@/components/SubmitButton";

export function UpdateEducationForm({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof editEducationSchema>>({
    resolver: zodResolver(editEducationSchema),
    defaultValues: {
      instituteName: "",
      degreeName: "",
      startDate: undefined,
      endDate: undefined,
    },
  });

  const { control, handleSubmit, reset } = form;
  useEffect(() => {
    const getSingleBlogDetails = async () => {
      try {
        const response = await getSingleEducation(id);
        if (response?.error) {
          return toast.error(response?.error);
        }
        // Reset form values after fetching data
        reset({
          instituteName: response?.data?.instituteName || "",
          degreeName: response?.data?.degreeName || "",
          startDate: new Date(response?.data?.startDate) as Date,
          endDate: new Date(response?.data?.endDate) as Date,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getSingleBlogDetails();
  }, [id, reset]);
  const onSubmit = async (data: z.infer<typeof editEducationSchema>) => {
    setLoading(true);
    try {
      const response = await editEducation(id, data);
      if (response?.error) {
        return toast.error(response?.error);
      }
      toast.success(response?.message);
      router.push("/dashboard/resume/education");
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
          name="instituteName"
          label="Institute Name"
          placeholder="Enter your institute name"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="degreeName"
          label="Your Degree Name"
          placeholder="Enter your Degree Name"
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
