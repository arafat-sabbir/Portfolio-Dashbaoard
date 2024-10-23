/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "ckeditor5/ckeditor5.css";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader } from "lucide-react";
import { LabelInputContainer } from "./LabelInputContainer";
import { BottomGradient } from "@/components/BottomGradient";
import { addBlog } from "@/actions/blog/create-blog";

// Define Zod schema for validation
const blogSchema = z.object({
  title: z.string().nonempty("Blog title is required"),
  category: z.string().nonempty("Category is required"),
  content: z.string().nonempty("Content is required"),
  photo: z.any(), // Will handle image separately
});

type BlogFormValues = z.infer<typeof blogSchema>;

export function AddBlogForm() {
  const [loading, setLoading] = useState(false);
  const [blogBanner, setBlogBanner] = useState<File | null>(null);
  const [blogBannerPreview, setBlogBannerPreview] = useState<string | null>(null);
  const router = useRouter();

  const { register, handleSubmit, control, formState: { errors } } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
  });

  const handleBlogBanner = useCallback((acceptedFiles: File[]) => {
    const bannerFile = acceptedFiles[0]; // Only allow one banner
    setBlogBanner(bannerFile);
    setBlogBannerPreview(URL.createObjectURL(bannerFile));
  }, []);

  const removeBlogBanner = () => {
    setBlogBanner(null);
    setBlogBannerPreview(null);
  };

  const onSubmit = async (data: BlogFormValues) => {
    if (!blogBanner) {
      return toast.error("Banner is required");
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("content", data.content);
    formData.append("photo", blogBanner as any);

    try {
      const response = await addBlog(formData);
      if (response?.error) {
        return toast.error(response?.error);
      }
      toast.success(response?.message);
      router.push("/dashboard/blogs");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleBlogBanner,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div className="w-full mx-auto shadow-input p-6 bg-white dark:bg-[#0A0A0A] rounded-md">
      <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
        {/* Blog Title */}
        <LabelInputContainer>
          <Label htmlFor="title">Blog Title</Label>
          <Input
            id="title"
            placeholder="Enter Blog Title"
            {...register("title")}
            className={cn(errors.title && "border-red-500")}
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </LabelInputContainer>

        {/* Blog Thumbnail */}
        <LabelInputContainer>
          <Label>Blog Thumbnail</Label>
          <div {...getRootProps()} className="border border-dashed rounded p-4 cursor-pointer">
            <input {...getInputProps()} />
            <p>Drag and drop a banner image, or click to select a file</p>
          </div>
          {blogBannerPreview && (
            <div className="relative mt-4 w-fit">
              <Image
                height={160}
                width={80}
                src={blogBannerPreview}
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
        </LabelInputContainer>

        {/* Blog Category */}
        <LabelInputContainer>
          <Label htmlFor="category">Blog Category</Label>
          <Input
            id="category"
            placeholder="Enter Blog Category"
            {...register("category")}
            className={cn(errors.category && "border-red-500")}
          />
          {errors.category && <p className="text-red-500">{errors.category.message}</p>}
        </LabelInputContainer>

        {/* Blog Content */}
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <CKEditor
              editor={ClassicEditor}
              config={{
                toolbar: ["heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "blockQuote"],
              }}
              data={field.value || ""}
              onChange={(event, editor) => field.onChange(editor.getData())}
            />
          )}
        />
        {errors.content && <p className="text-red-500">{errors.content.message}</p>}

        {/* Submit Button */}
        <Button
          disabled={loading}
          className="bg-gradient-to-br relative group/btn from-black dark:from-black dark:to-black to-neutral-600  dark:bg-black w-full text-white gap-2 items-center justify-center flex rounded-md h-10 font-medium max-w-32"
        >
          Submit {loading ? <Loader size={22} className="animate-spin" /> : <ArrowRight size={22} />}
          <BottomGradient />
        </Button>
      </form>
    </div>
  );
}
