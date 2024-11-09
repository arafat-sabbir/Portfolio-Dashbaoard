/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Form, FormItem, FormLabel } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { workSchema } from "@/lib/zod.schema";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { generateImage } from "@/lib/utils";
import SubmitButton from "@/components/SubmitButton";
import { getSingleWork } from "@/actions/work/get-single-work";
import { updateWork } from "@/actions/work/update-work";

// Define Zod schema for validation

export function UpdateWorkForm({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [serverPhotoPreview, setServerPhotoPreview] = useState<string | null>(
    null
  );
  const form = useForm<z.infer<typeof workSchema>>({
    resolver: zodResolver(workSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { control, handleSubmit, reset } = form;

  useEffect(() => {
    const getSingleSkillDetails = async () => {
      try {
        const response = await getSingleWork(id);
        if (response?.error) {
          return toast.error(response?.error);
        }
        setServerPhotoPreview(response?.data?.photo);

        // Reset form values after fetching data
        reset({
          title: response?.data?.title || "",
          description: response?.data?.description || 0,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getSingleSkillDetails();
  }, [id, reset]);

  const handleSkillPhoto = useCallback((acceptedFiles: File[]) => {
    const photoFile = acceptedFiles[0]; // Only allow one banner
    setPhoto(photoFile);
    setPhotoPreview(URL.createObjectURL(photoFile));
    setServerPhotoPreview(null);
  }, []);

  const removeBlogBanner = () => {
    setPhoto(null);
    setPhotoPreview(null);
    setServerPhotoPreview(null);
  };
  const onSubmit = async (data: z.infer<typeof workSchema>) => {
    if (!photo && !serverPhotoPreview) {
      return toast.error("Work Photo Is Required");
    }
    setLoading(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (data[key] != null || data[key] != undefined)
        formData.append(key, value);
    });
    formData.append("photo", photo as File);
    try {
      const response = await updateWork(id, formData);
      if (response?.error) {
        return toast.error(response?.error);
      }
      toast.success(response?.message);
      router.push("/dashboard/about/work");
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
          name="title"
          label="Work Title"
          placeholder="Enter your Work Name"
        />
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={control}
          name="description"
          label="Description"
          placeholder="Enter A Small Description About Your Work"
          className="min-h-28"
        />
        <FormItem>
          <FormLabel>Work Logo | Photo</FormLabel>
          <div
            {...getRootProps()}
            className="border border-dashed rounded p-4 cursor-pointer"
          >
            <input {...getInputProps()} />
            <p>
              Drag and drop a image that represent the Work, or click to select
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
          {serverPhotoPreview && (
            <div className="relative mt-4 w-fit">
              <Image
                height={160}
                width={80}
                src={generateImage(serverPhotoPreview)}
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
