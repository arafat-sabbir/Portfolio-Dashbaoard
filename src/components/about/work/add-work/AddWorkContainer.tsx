import React from "react";
import { AddWorkForm } from "./AddWorkForm";

const AddWorkContainer = () => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between mb-6 space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Add Work</h2>
      </div>
      <AddWorkForm />
    </div>
  );
};

export default AddWorkContainer;
