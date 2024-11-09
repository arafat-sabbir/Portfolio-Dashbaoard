/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Form, FormItem, FormLabel } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { skillSchema } from "@/lib/zod.schema";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { addSkill } from "@/actions/skill/add-skill";
import SubmitButton from "@/components/SubmitButton";

// Define Zod schema for validation

export function AddSkillForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const form = useForm<z.infer<typeof skillSchema>>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      skill: "",
      level: 0,
    },
  });

  const { control, handleSubmit } = form;
  const handleSkillPhoto = useCallback((acceptedFiles: File[]) => {
    const photoFile = acceptedFiles[0]; // Only allow one banner
    setPhoto(photoFile);
    setPhotoPreview(URL.createObjectURL(photoFile));
  }, []);

  const removeBlogBanner = () => {
    setPhoto(null);
    setPhotoPreview(null);
  };
  const onSubmit = async (data: z.infer<typeof skillSchema>) => {
    data.level = Number(data.level);
    if (!photo) {
      toast.error("Skill Photo Is Required");
    }
    setLoading(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (data[key] != null || data[key] != undefined)
        formData.append(key, value);
    });
    formData.append("photo", photo as File);
    try {
      const response = await addSkill(formData);
      if (response?.error) {
        return toast.error(response?.error);
      }
      toast.success(response?.message);
      router.push("/dashboard/resume/skill");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleSkillPhoto,
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
          name="skill"
          label="Skill Name"
          placeholder="Enter your Skill Name"
        />
        <CustomFormField
          fieldType={FormFieldType.RANGE}
          control={control}
          name="level"
          label="Enter Your Skill Level (1%-100%)"
          placeholder="Enter your Skill Level (1-100%)"
        />
        <FormItem>
          <FormLabel>Skill Logo</FormLabel>
          <div
            {...getRootProps()}
            className="border border-dashed rounded p-4 cursor-pointer"
          >
            <input {...getInputProps()} />
            <p>
              Drag and drop a image that represent the skill, or click to select
              a file
            </p>
          </div>
          {photoPreview && (
            <div className="relative mt-4 w-fit">
              <Image
                height={160}
                width={80}
                src={photoPreview}
                alt="Banner Preview"
                className="w-40 h-20 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={removeBlogBanner}
                className="absolute top-0 right-0 h-6 w-6 flex items-center justify-center text-lg bg-black/50 hover:bg-black duration-300 text-white rounded-full"
              >
                &times;
              </button>
            </div>
          )}
        </FormItem>
        {/* Submit Button */}
        <SubmitButton loading={loading} />
      </form>
    </Form>
  );
}
