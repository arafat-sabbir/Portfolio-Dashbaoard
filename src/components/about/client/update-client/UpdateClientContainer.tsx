import React from "react";
import { UpdateClientForm } from "./UpdateClientForm";

const UpdateClientContainer = ({ id }: { id: string }) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Update Client</h2>
      </div>
      <UpdateClientForm id={id} />
    </div>
  );
};

export default UpdateClientContainer;