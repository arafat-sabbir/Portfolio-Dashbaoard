"use client";

import { createSocial } from "@/actions/social/create-social";
import { deleteSocial } from "@/actions/social/delete-social";
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

  // Deleting state for each platform
  const [deleting, setDeleting] = useState<Record<string, boolean>>({
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
      setInstagram(
        options.find((option) => option.name === "instagram") || null
      );
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
        response = await updateSocial({ name, url });
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

  // Handle delete
  const handleDelete = async (id: string, name: string) => {
    setDeleting((prev) => ({ ...prev, [name]: true }));

    try {
      const response = await deleteSocial(id);
      if (response?.error) {
        return toast.error(response.error);
      } else {
        toast.success(
          response?.data?.message || `${name} has been successfully deleted.`
        );
        setRefetch((prev) => !prev);
      }
    } catch (error) {
      console.error(`Error deleting ${name}:`, error);
      toast.error(`An error occurred while deleting ${name}.`);
    } finally {
      setDeleting((prev) => ({ ...prev, [name]: false }));
    }
  };

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white dark:bg-[#0A0A0A] rounded-md">
        {/* Social Forms */}
        {[
          { platform: "facebook", data: facebook },
          { platform: "twitter", data: twitter },
          { platform: "instagram", data: instagram },
          { platform: "linkedin", data: linkedin },
          { platform: "github", data: github },
          { platform: "youtube", data: youtube },
        ].map(({ platform, data }) => (
          <form
            key={platform}
            onSubmit={(e) => handleSubmit(e, platform, data?._id || "")}
          >
            <div className="col-span-1 space-y-3">
              <Label htmlFor={platform}>
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </Label>
              <Input
                required
                name={platform}
                type="url"
                placeholder={`Enter the ${
                  platform.charAt(0).toUpperCase() + platform.slice(1)
                } URL`}
                defaultValue={data?.url || ""}
              />
              <div className="flex gap-2">
                <Button type="submit" disabled={loading[platform]}>
                  {loading[platform]
                    ? data
                      ? "Updating..."
                      : "Creating..."
                    : data
                    ? "Update"
                    : "Create"}
                </Button>
                {data && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleDelete(data._id, platform)}
                    disabled={deleting[platform]}
                  >
                    {deleting[platform] ? "Deleting..." : "Delete"}
                  </Button>
                )}
              </div>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
};

export default SocialListTable;
