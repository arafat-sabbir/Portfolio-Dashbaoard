/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "ckeditor5/ckeditor5.css";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Form, FormItem, FormLabel } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { portfolioSchema } from "@/lib/zod.schema";
import { addNewCategory } from "@/actions/portfolio/add-portfolio";
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader, Plus } from "lucide-react";
import { getPortfolioCategories } from "@/actions/portfolio/get-portfolio-category";
import { SelectItem } from "@/components/ui/select";
import { addPortfolio } from "@/actions/portfolio/add-new-category";

// Define Zod schema for validation

export function AddPortfolioForm() {
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState("");
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [portfolioCategories, setPortfolioCategories] = useState([]);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [refetchCategories, setRefetchCategories] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getAllPortfolioCategories = async () => {
      try {
        const response = await getPortfolioCategories();
        setPortfolioCategories(response?.data?.portfolioCategories);
      } catch (error) {
        console.log(error);
      }
    };
    getAllPortfolioCategories();
  }, [refetchCategories]);

  const form = useForm<z.infer<typeof portfolioSchema>>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      technologiesUsed: [],
      features: [],
      livePreview: "",
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
    formData.append("photo", thumbnail as any);
    formData.append("startDate", data.startDate as any);
    formData.append("endDate", data.endDate as any);
    formData.append("currentlyWorking", JSON.stringify(data.currentlyWorking));

    try {
      const response = await addPortfolio(formData);

      if (response?.error) {
        return toast.error(response?.error);
      }
      toast.success(response?.message);
      router.push("/dashboard/portfolio");
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

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setCategoryLoading(true);
    try {
      const response = await addNewCategory({ category: newCategory });
      if (response?.error) {
        return toast.error(response?.error);
      }
      toast.success(response?.message);
      setRefetchCategories(true);
    } catch (error) {
      console.log(error);
    } finally {
      setCategoryLoading(false);
      setCategoryDialogOpen(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="form-background">
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
          fieldType={FormFieldType.SELECT}
          control={control}
          name="category"
          label="Project Category"
          placeholder="Select your project category"
        >
          {portfolioCategories && portfolioCategories.length > 0 ? (
            portfolioCategories.map((category) => (
              <SelectItem
                key={category}
                value={category}
                className="capitalize"
              >
                {category}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="notAvailable" disabled>
              No categories available
            </SelectItem>
          )}
        </CustomFormField>
        <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-100"
            >
              <Plus /> Add New Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px] p-6 rounded-lg bg-white shadow-lg border border-gray-200">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-800">
                Add New Category
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600 mt-1">
                Add a new category to organize your portfolio. Once added, you
                can manage projects under this category.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 grid gap-6">
              <div className="flex items-start gap-4 flex-col ">
                <Label
                  htmlFor="name"
                  className=" text-right text-sm font-medium "
                >
                  Category Name
                </Label>
                <Input
                  id="name"
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Example Category"
                  className="flex-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-primary focus:border-primary 0 text-sm "
                />
              </div>
            </div>
            <DialogFooter className="mt-6 flex justify-end space-x-4">
              <Button
                disabled={categoryLoading}
                type="button"
                onClick={handleAddCategory}
                className="px-6 py-2 rounded-lg   font-medium shadow-sm hover:bg-primary disabled:opacity-50"
              >
                Add Now
                {categoryLoading && (
                  <Loader className="ml-2 h-4 w-4 animate-spin " />
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setCategoryDialogOpen(false)}
                className="px-6 py-2 rounded-lg"
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
          label="Essential Link"
          placeholder="Enter A Link That Represent The Project"
        />

        {/* Source Code
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="sourceCode"
          label="Source Code"
          placeholder="Enter the source code URL"
        /> */}

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
        <SubmitButton loading={loading} />
      </form>
    </Form>
  );
}
