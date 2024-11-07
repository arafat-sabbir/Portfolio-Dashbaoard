"use client";

import { createSocial } from "@/actions/social/create-social";
import { getAllSocial } from "@/actions/social/get-all-social";
import { updateSocial } from "@/actions/social/update-social";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export type TOptions = {
  _id: string;
  name: string;
  url: string;
  created_by: {
    _id: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
};

const SocialListTable = () => {
  const [options, setOptions] = useState<TOptions[]>([]);
  const [refetch, setRefetch] = useState<boolean>(false);

  // State for each social platform
  const [facebook, setFacebook] = useState<TOptions | null>(null);
  const [twitter, setTwitter] = useState<TOptions | null>(null);
  const [instagram, setInstagram] = useState<TOptions | null>(null);
  const [linkedin, setLinkedin] = useState<TOptions | null>(null);
  const [github, setGithub] = useState<TOptions | null>(null);
  const [youtube, setYoutube] = useState<TOptions | null>(null);

  // Loading state for each platform
  const [loading, setLoading] = useState<Record<string, boolean>>({
    facebook: false,
    twitter: false,
    instagram: false,
    linkedin: false,
    github: false,
    youtube: false,
  });

  // Fetch all social options on mount and when refetch changes
  useEffect(() => {
    const getAllOptionsData = async () => {
      try {
        const response = await getAllSocial();
        if (response?.data) {
          setOptions(response.data);
        } else {
          toast.error("Failed to fetch social options.");
        }
      } catch (error) {
        console.error("Error fetching social options:", error);
        toast.error("An error occurred while fetching social options.");
      }
    };
    getAllOptionsData();
  }, [refetch]);

  // Update individual social platform states when options change
  useEffect(() => {
    const updateSocial = () => {
      setFacebook(options.find((option) => option.name === "facebook") || null);
      setTwitter(options.find((option) => option.name === "twitter") || null);
      setInstagram(options.find((option) => option.name === "instagram") || null);
      setLinkedin(options.find((option) => option.name === "linkedin") || null);
      setGithub(options.find((option) => option.name === "github") || null);
      setYoutube(options.find((option) => option.name === "youtube") || null);
    };
    updateSocial();
  }, [options]);

  // Handle form submission for creating/updating social URLs
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    name: string,
    id: string
  ) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, [name]: true }));

    const form = e.currentTarget;
    const input = form.elements.namedItem(name) as HTMLInputElement;
    const url = input.value.trim();

    if (!url) {
      toast.error(`${name} URL cannot be empty.`);
      setLoading((prev) => ({ ...prev, [name]: false }));
      return;
    }

    try {
      let response;
      if (id) {
        // Update existing social URL
        response = await updateSocial(id, { name, url });
      } else {
        // Create new social URL
        response = await createSocial({ name, url });
      }

      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success(
          response.message ||
            `${name} has been successfully ${id ? "updated" : "created"}.`
        );
        setRefetch((prev) => !prev); // Trigger refetch to update the state
      }
    } catch (error) {
      console.error(`Error ${id ? "updating" : "creating"} ${name}:`, error);
      toast.error(
        `An error occurred while ${id ? "updating" : "creating"} ${name}.`
      );
    } finally {
      setLoading((prev) => ({ ...prev, [name]: false }));
    }
  };

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white dark:bg-[#0A0A0A] rounded-md">
        {/* Facebook Form */}
        <form onSubmit={(e) => handleSubmit(e, "facebook", facebook?._id || "")}>
          <div className="col-span-1 space-y-3">
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              required
              name="facebook"
              type="url"
              placeholder="Enter the Facebook URL"
              defaultValue={facebook?.url || ""}
            />
            <Button type="submit" disabled={loading["facebook"]}>
              {loading["facebook"]
                ? facebook
                  ? "Updating..."
                  : "Creating..."
                : facebook
                ? "Update"
                : "Create"}
            </Button>
          </div>
        </form>

        {/* Twitter Form */}
        <form onSubmit={(e) => handleSubmit(e, "twitter", twitter?._id || "")}>
          <div className="col-span-1 space-y-3">
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              required
              name="twitter"
              type="url"
              placeholder="Enter the Twitter URL"
              defaultValue={twitter?.url || ""}
            />
            <Button type="submit" disabled={loading["twitter"]}>
              {loading["twitter"]
                ? twitter
                  ? "Updating..."
                  : "Creating..."
                : twitter
                ? "Update"
                : "Create"}
            </Button>
          </div>
        </form>

        {/* Instagram Form */}
        <form onSubmit={(e) => handleSubmit(e, "instagram", instagram?._id || "")}>
          <div className="col-span-1 space-y-3">
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              required
              name="instagram"
              type="url"
              placeholder="Enter the Instagram URL"
              defaultValue={instagram?.url || ""}
            />
            <Button type="submit" disabled={loading["instagram"]}>
              {loading["instagram"]
                ? instagram
                  ? "Updating..."
                  : "Creating..."
                : instagram
                ? "Update"
                : "Create"}
            </Button>
          </div>
        </form>

        {/* LinkedIn Form */}
        <form onSubmit={(e) => handleSubmit(e, "linkedin", linkedin?._id || "")}>
          <div className="col-span-1 space-y-3">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              required
              name="linkedin"
              type="url"
              placeholder="Enter the LinkedIn URL"
              defaultValue={linkedin?.url || ""}
            />
            <Button type="submit" disabled={loading["linkedin"]}>
              {loading["linkedin"]
                ? linkedin
                  ? "Updating..."
                  : "Creating..."
                : linkedin
                ? "Update"
                : "Create"}
            </Button>
          </div>
        </form>

        {/* GitHub Form */}
        <form onSubmit={(e) => handleSubmit(e, "github", github?._id || "")}>
          <div className="col-span-1 space-y-3">
            <Label htmlFor="github">GitHub</Label>
            <Input
              required
              name="github"
              type="url"
              placeholder="Enter the GitHub URL"
              defaultValue={github?.url || ""}
            />
            <Button type="submit" disabled={loading["github"]}>
              {loading["github"]
                ? github
                  ? "Updating..."
                  : "Creating..."
                : github
                ? "Update"
                : "Create"}
            </Button>
          </div>
        </form>

        {/* YouTube Form */}
        <form onSubmit={(e) => handleSubmit(e, "youtube", youtube?._id || "")}>
          <div className="col-span-1 space-y-3">
            <Label htmlFor="youtube">YouTube</Label>
            <Input
              required
              name="youtube"
              type="url"
              placeholder="Enter the YouTube URL"
              defaultValue={youtube?.url || ""}
            />
            <Button type="submit" disabled={loading["youtube"]}>
              {loading["youtube"]
                ? youtube
                  ? "Updating..."
                  : "Creating..."
                : youtube
                ? "Update"
                : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SocialListTable;
