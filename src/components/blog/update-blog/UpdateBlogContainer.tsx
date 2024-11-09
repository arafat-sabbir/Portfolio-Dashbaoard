import React from "react";
import { UpdateBlogForm } from "./UpdateBlogForm";

const UpdateBlogContainer = ({ id }: { id: string }) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Update Blog</h2>
      </div>
      <UpdateBlogForm id={id} />
    </div>
  );
};

export default UpdateBlogContainer;
