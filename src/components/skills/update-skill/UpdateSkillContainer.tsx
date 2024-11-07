import React from "react";
import { UpdateSkillForm } from "./UpdateSkillForm";

const UpdateSkillContainer = ({ id }: { id: string }) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Update Skill</h2>
      </div>
      <UpdateSkillForm id={id} />
    </div>
  );
};

export default UpdateSkillContainer;
