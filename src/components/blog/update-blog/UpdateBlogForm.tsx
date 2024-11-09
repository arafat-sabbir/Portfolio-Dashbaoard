"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "ckeditor5/ckeditor5.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { getSingleBlog } from "@/actions/blog/getSingleBlog";
import { generateImage } from "@/lib/utils";
import { editBlog } from "@/actions/blog/edit-blog";
import SubmitButton from "@/components/SubmitButton";

// Define Zod schema for validation
const blogSchema = z.object({
  title: z.string().nonempty("Blog title is required"),
  category: z.string().nonempty("Category is required"),
  content: z.string().nonempty("Content is required"),
  photo: z.any(), // Will handle image separately
});

export function UpdateBlogForm({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const [blogBanner, setBlogBanner] = useState<File | null>(null);
  const [blogBannerPreview, setBlogBannerPreview] = useState<string | null>(
    null
  );
  const [serverBannerPreview, setServerBannerPreview] = useState(null);
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
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    const getSingleBlogDetails = async () => {
      try {
        const response = await getSingleBlog(id);
        if (response?.error) {
          return toast.error(response?.error);
        }
        setServerBannerPreview(response?.data?.photo);

        // Reset form values after fetching data
        reset({
          title: response?.data?.title || "",
          category: response?.data?.category || "",
          content: response?.data?.content || "",
          photo: null,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getSingleBlogDetails();
  }, [id, reset]);

  const handleBlogBanner = useCallback((acceptedFiles: File[]) => {
    const bannerFile = acceptedFiles[0]; // Only allow one banner
    setServerBannerPreview(null);
    setBlogBanner(bannerFile);
    setBlogBannerPreview(URL.createObjectURL(bannerFile));
  }, []);

  const removeBlogBanner = () => {
    setBlogBanner(null);
    setBlogBannerPreview(null);
    setServerBannerPreview(null);
  };

  const onSubmit = async (data: z.infer<typeof blogSchema>) => {
    if (!blogBanner && !serverBannerPreview) {
      return toast.error("Banner is required");
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("content", data.content);
    if (blogBanner) {
      formData.append("photo", blogBanner as any);
    }

    try {
      const response = await editBlog(id, formData);
      if (response?.error) {
        return toast.error(response?.error);
      }
      toast.success(response?.message);
      router.push("/dashboard/blog");
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
      <form onSubmit={handleSubmit(onSubmit)} className="form-background">
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
          {serverBannerPreview && (
            <div className="relative mt-4 w-fit">
              <Image
                height={160}
                width={80}
                src={generateImage(serverBannerPreview)}
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
