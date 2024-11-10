"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowRight, Loader, Pencil } from "lucide-react";
import { BottomGradient } from "@/components/BottomGradient";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { TUser } from "@/interface/user.interface";
import { updateUserSchema } from "@/lib/zod.schema"; // Adjust the schema import
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { updateProfile } from "@/actions/auth/update-profile";
import { generateImage } from "@/lib/utils";

const UserProfileForm = ({ user }: { user: TUser }) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      displayEmail: user?.email || "",
      location: user?.location || "",
      designation: user?.designation || "",
      dob: (user?.dob as any) || "",
      locationLink: user.locationLink || "",
      bio: user?.bio || "",
    },
  });
  const { control, handleSubmit, setValue } = form;

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
      setValue("photo", file); // If using in the form
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onSubmit = async (data: z.infer<typeof updateUserSchema>) => {
    setLoading(true);

    // Log the incoming `data` to see if it contains expected values

    const form = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        form.append(key, value.toString()); // Convert non-string values to string
      }
    });

    if (file) {
      form.append("photo", file);
    } else {
      console.warn("No file selected.");
    }
    try {
      const response = await updateProfile(form);
      if (response?.error) {
        return toast.error(response?.error);
      }
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating your profile.");
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-4xl mx-auto min-h-[90vh] flex flex-col justify-center "
      >
        <div className="flex items-center justify-center">
          <div className="relative">
            <div
              {...getRootProps()}
              className={`border-dashed border-2 border-gray-300 size-40 rounded-full flex items-center justify-center ${
                isEditing ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <input
                {...getInputProps()}
                accept="image/*"
                disabled={!isEditing}
              />
              <Image
                width={1000}
                height={1000}
                src={
                  file ? URL.createObjectURL(file) : generateImage(user?.photo)
                }
                alt="Profile"
                className="size-40 rounded-full object-cover"
              />
              {isEditing && (
                <div className="absolute p-1 z-50 bg-gray-800 size-40 bg-opacity-20 rounded-full shadow-lg">
                  <Pencil
                    size={20}
                    className="text-gray-600 absolute top-[40%] right-[40%]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <CustomFormField
          disabled={!isEditing}
          fieldType={FormFieldType.INPUT}
          control={control}
          name="name"
          label="Name"
          placeholder="Enter Your Name"
        />
        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={control}
          name="phone"
          label="Phone"
          placeholder="Enter Your Phone Number"
          disabled={!isEditing}
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="displayEmail"
          label="Display Email"
          placeholder="Enter Your Email"
          disabled={!isEditing}
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="location"
          label="Location"
          placeholder="Enter Your Location"
          disabled={!isEditing}
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="designation"
          label="Designation"
          placeholder="Enter Your Designation"
          disabled={!isEditing}
        />
        <CustomFormField
          fieldType={FormFieldType.CALENDAR}
          control={control}
          name="dob"
          label="Date Of Birth"
          placeholder="Enter Your Date of Birth"
          disabled={!isEditing}
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="locationLink"
          label="Google Map Location Iframe Link"
          placeholder="Enter Your Location Google Map Location Iframe Link"
          disabled={!isEditing}
        />
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={control}
          name="bio"
          label="Enter Your Bio"
          placeholder="Enter A Short Description About Yourself"
          className="min-h-40"
          disabled={!isEditing}
        />

        <div className="flex justify-between">
          <Button
            type="button"
            onClick={() => setIsEditing((prev) => !prev)}
            className="bg-gray-200 text-gray-800 rounded-md"
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
          <Button
            disabled={loading}
            className="bg-gradient-to-br relative group/btn from-black dark:from-black dark:to-black to-neutral-600 dark:bg-black w-full text-white gap-2 items-center justify-center flex rounded-md h-10 font-medium max-w-32"
            type="submit"
          >
            Submit{" "}
            {loading ? (
              <Loader size={22} className="animate-spin" />
            ) : (
              <ArrowRight size={22} />
            )}
            <BottomGradient />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserProfileForm;
