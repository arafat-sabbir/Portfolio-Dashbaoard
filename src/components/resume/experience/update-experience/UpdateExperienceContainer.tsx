import React from "react";
import { UpdateExperienceForm } from "./UpdateExperienceForm";

const UpdateExperienceContainer = ({ id }: { id: string }) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Update Experience</h2>
      </div>
      <UpdateExperienceForm id={id} />
    </div>
  );
};

export default UpdateExperienceContainer;
