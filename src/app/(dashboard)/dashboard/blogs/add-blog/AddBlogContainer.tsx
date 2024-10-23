import React from "react";
import { AddBlogForm } from "./AddBlogForm";


const AddPostContainer = () => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between mb-6 space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Add Post</h2>
      </div>
      <AddBlogForm />
    </div>
  );
};

export default AddPostContainer;
