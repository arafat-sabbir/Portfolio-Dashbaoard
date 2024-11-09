/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { generateImage } from "@/lib/utils";
import SubmitButton from "@/components/SubmitButton";
import { updateClient } from "@/actions/client/update-client";
import { getSingleClient } from "@/actions/client/get-single-client";

// Define Zod schema for validation

export function UpdateClientForm({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [serverPhotoPreview, setServerPhotoPreview] = useState<string | null>(
    null
  );

  useEffect(() => {
    const getSingleSkillDetails = async () => {
      try {
        const response = await getSingleClient(id);
        if (response?.error) {
          return toast.error(response?.error);
        }
        setServerPhotoPreview(response?.data?.photo);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleSkillDetails();
  }, [id]);

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
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!photo && !serverPhotoPreview) {
      return toast.error("Skill Photo Is Required");
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("photo", photo as File);
    try {
      const response = await updateClient(id, formData);
      if (response?.error) {
        return toast.error(response?.error);
      }
      toast.success(response?.message);
      router.push("/dashboard/about/client");
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
    <form onSubmit={onSubmit} className="form-background">
      <label>Skill Logo</label>
      <div
        {...getRootProps()}
        className="border border-dashed rounded p-4 cursor-pointer mt-3 mb-6"
      >
        <input {...getInputProps()} />
        <p>
          Drag and drop a image that represent the skill, or click to select a
          file
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
      {/* Submit Button */}
      <SubmitButton loading={loading} />
    </form>
  );
}
