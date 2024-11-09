import React from "react";
import { UpdateEducationForm } from "./UpdateEducationForm";
// import { UpdateExperienceForm } from "./UpdateExperienceForm";

const UpdateEducationContainer = ({ id }: { id: string }) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Update Education</h2>
      </div>
      <UpdateEducationForm id={id} />
    </div>
  );
};

export default UpdateEducationContainer;
