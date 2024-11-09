import React from "react";
import { AddClientForm } from "./AddClientForm";

const AddClientContainer = () => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between mb-6 space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Add Skill</h2>
      </div>
      <AddClientForm />
    </div>
  );
};

export default AddClientContainer;
