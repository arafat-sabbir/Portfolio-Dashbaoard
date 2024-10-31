/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
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
import { editEducationSchema, editExperienceSchema } from "@/lib/zod.schema";
// import { addExperience } from "@/actions/resume/experience/add-new-experience";
import { getSingleExperience } from "@/actions/resume/experience/get-single-experience";
import { editExperience } from "@/actions/resume/experience/edit-experience";
import { getSingleEducation } from "@/actions/resume/education/get-single-education";
import { editEducation } from "@/actions/resume/education/edit-education";

export function UpdateEducationForm({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof editEducationSchema>>({
    resolver: zodResolver(editEducationSchema),
    defaultValues: {
      instituteName: "",
      degreeName: "",
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;
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
          startDate: response?.data?.startDate || "",
          endDate: response?.data?.endDate || "",
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
      const response = await editEducation(id, data);
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