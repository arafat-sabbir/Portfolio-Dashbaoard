"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader, Pencil } from "lucide-react";
import { BottomGradient } from "@/components/BottomGradient";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { TUser } from "@/interface/user.interface";
import { updateUserSchema } from "@/lib/zod.schema"; // Adjust the schema import
import { useDropzone } from "react-dropzone";

const UserProfileForm = ({ user }: { user: TUser }) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      email: user?.email || "",
      location: user?.location || "",
      designation: user?.designation || "",
      dob: (user?.dob as any) || "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = form;

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
    try {
      // Replace this with your update logic
      // const response = await updateProfile(data);
      // if (response.error) {
      //   return toast.error(response.error);
      // }
      toast.success("Profile updated successfully!");
      router.push("/profile"); // Adjust the route as needed
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating your profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="flex items-center">
          <div className="relative">
            <div
              {...getRootProps()}
              className={`border-dashed border-2 border-gray-300 p-4 rounded-md flex items-center justify-center ${isEditing ? "cursor-pointer" : "cursor-default"}`}
            >
              <input {...getInputProps()} accept="image/*" disabled={!isEditing} />
              {file ? (
                <img src={URL.createObjectURL(file)} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
              ) : (
                <p className="text-gray-500">Drag & drop your photo here, or click to select</p>
              )}
              {isEditing && (
                <div className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg">
                  <Pencil size={20} className="text-gray-600" />
                </div>
              )}
            </div>
          </div>
        </div>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="name"
          label="Name"
          placeholder="Enter Your Name"
          disabled={!isEditing}
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
          name="email"
          label="Email"
          placeholder="Enter Your Email"
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
