/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "ckeditor5/ckeditor5.css";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader } from "lucide-react";
import { BottomGradient } from "@/components/BottomGradient";
import { Form, FormItem, FormLabel } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { portfolioSchema } from "@/lib/zod.schema";
import { addPortfolio } from "@/actions/portfolio/add-portfolio";

// Define Zod schema for validation

export function AddPortfolioForm() {
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof portfolioSchema>>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      technologiesUsed: [],
      features: [],
      livePreview: "",
      sourceCode: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
    },
  });

  const { control, handleSubmit, watch } = form;

  // Watch the currentlyWorking field
  const currentlyWorking = watch("currentlyWorking");
  const handleThumbnail = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  }, []);

  const removeThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
  };

  const onSubmit = async (data: z.infer<typeof portfolioSchema>) => {
    if (!thumbnail) {
      return toast.error("Thumbnail is required");
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("description", data.description);
    data.technologiesUsed.forEach((tech) => {
      formData.append("technologiesUsed[]", tech);
    });
    data.features.forEach((feature) => {
      formData.append("features[]", feature);
    });
    formData.append("livePreview", data.livePreview || "");
    formData.append("sourceCode", data.sourceCode);
    formData.append("photo", thumbnail as any);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);
    formData.append("currentlyWorking", JSON.stringify(data.currentlyWorking));

    try {
      const response = await addPortfolio(formData);

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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleThumbnail,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Project Title */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="title"
          label="Project Title"
          placeholder="Enter your project title"
        />

        {/* Project Category */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="category"
          label="Project Category"
          placeholder="Enter your project category"
        />

        {/* Project Description */}
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={control}
          name="description"
          label="Project Description"
          placeholder="Enter a description of the project"
        />

        {/* Technologies Used */}
        <CustomFormField
          fieldType={FormFieldType.TAGS}
          control={control}
          name="technologiesUsed"
          label="Technologies Used"
          placeholder="Add technologies"
        />

        {/* Features */}
        <CustomFormField
          fieldType={FormFieldType.TAGS}
          control={control}
          name="features"
          label="Features"
          placeholder="Add features"
        />

        {/* Live Preview */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="livePreview"
          label="Live Preview"
          placeholder="Enter the live project URL"
        />

        {/* Source Code */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="sourceCode"
          label="Source Code"
          placeholder="Enter the source code URL"
        />

        {/* Thumbnail */}
        <FormItem>
          <FormLabel>Thumbnail</FormLabel>
          <div
            {...getRootProps()}
            className="border border-dashed rounded p-4 cursor-pointer"
          >
            <input {...getInputProps()} />
            <p>Drag and drop a thumbnail image, or click to select a file</p>
          </div>
          {thumbnailPreview && (
            <div className="relative mt-4 w-fit">
              <Image
                height={160}
                width={80}
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="w-40 h-20 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={removeThumbnail}
                className="absolute top-0 right-0 h-6 w-6 flex items-center justify-center text-lg bg-black/50 hover:bg-black duration-300 text-white rounded-full"
              >
                &times;
              </button>
            </div>
          )}
        </FormItem>

        {/* Duration */}
        <CustomFormField
          fieldType={FormFieldType.CALENDAR}
          control={control}
          name="startDate"
          label="Start Date"
          placeholder="Enter start date"
        />

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={control}
          name="currentlyWorking"
          placeholder="Still Working on this project?"
        />

        {/* End Date (conditionally shown) */}
        {!currentlyWorking && (
          <CustomFormField
            fieldType={FormFieldType.CALENDAR}
            control={control}
            name="endDate"
            label="End Date"
            placeholder="Enter end date"
          />
        )}

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
