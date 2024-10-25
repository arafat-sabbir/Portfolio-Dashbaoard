import React from "react";
import { AddExperienceForm } from "./AddExperienceForm";

const AddExperienceContainer = () => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between mb-6 space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Add Experience</h2>
      </div>
      <AddExperienceForm />
    </div>
  );
};

export default AddExperienceContainer;
