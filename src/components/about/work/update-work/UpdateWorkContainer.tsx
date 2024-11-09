import React from "react";
import { UpdateWorkForm } from "./UpdateWorkForm";

const UpdateWorkContainer = ({ id }: { id: string }) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Update Work</h2>
      </div>
      <UpdateWorkForm id={id} />
    </div>
  );
};

export default UpdateWorkContainer;
