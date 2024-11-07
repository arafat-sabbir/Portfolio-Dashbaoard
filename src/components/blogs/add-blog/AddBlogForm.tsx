/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "ckeditor5/ckeditor5.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { addBlog } from "@/actions/blog/create-blog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import Image from "next/image";

// Define Zod schema for validation
const blogSchema = z.object({
  title: z.string().nonempty("Blog title is required"),
  category: z.string().nonempty("Category is required"),
  content: z.string().nonempty("Content is required"),
  photo: z.any(), // Will handle image separately
});

export function AddBlogForm() {
  const [loading, setLoading] = useState(false);
  const [blogBanner, setBlogBanner] = useState<File | null>(null);
  const [blogBannerPreview, setBlogBannerPreview] = useState<string | null>(
    null
  );
  const router = useRouter();

  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
      photo: null,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const handleBlogBanner = useCallback((acceptedFiles: File[]) => {
    const bannerFile = acceptedFiles[0]; // Only allow one banner
    setBlogBanner(bannerFile);
    setBlogBannerPreview(URL.createObjectURL(bannerFile));
  }, []);

  const removeBlogBanner = () => {
    setBlogBanner(null);
    setBlogBannerPreview(null);
  };

  const onSubmit = async (data: z.infer<typeof blogSchema>) => {
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
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Blog Title */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="title"
          label="Blog Title"
          placeholder="Enter your blog title"
        />

        {/* Blog Thumbnail */}
        <FormItem>
          <FormLabel>Blog Thumbnail</FormLabel>
          <div
            {...getRootProps()}
            className="border border-dashed rounded p-4 cursor-pointer"
          >
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
        </FormItem>

        {/* Blog Category */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="category"
          label="Blog Category"
          placeholder="Enter your blog category"
        />

        {/* Blog Content */}
        <FormField
          control={control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Content</FormLabel>
              <FormControl>
                <CKEditor
                  editor={ClassicEditor}
                  config={{
                    toolbar: [
                      "heading",
                      "|",
                      "bold",
                      "italic",
                      "link",
                      "bulletedList",
                      "numberedList",
                      "blockQuote",
                    ],
                  }}
                  data={field.value || ""}
                  onChange={(event, editor) => field.onChange(editor.getData())}
                />
              </FormControl>
              <FormMessage>{errors.content?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <SubmitButton loading={loading} />
      </form>
    </Form>
  );
}
