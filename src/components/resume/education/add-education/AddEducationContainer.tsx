import React from "react";
import { AddEducationForm } from "./AddEducationForm";

const AddEducationContainer = () => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between mb-6 space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Add Education</h2>
      </div>
      <AddEducationForm />
    </div>
  );
};

export default AddEducationContainer;
