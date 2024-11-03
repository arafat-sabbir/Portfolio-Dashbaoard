import React from "react";
import { AddPortfolioForm } from "./AddPortfolioForm";

const AddPortfolioContainer = () => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between mb-6 space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Add Portfolio</h2>
      </div>
      <AddPortfolioForm />
    </div>
  );
};

export default AddPortfolioContainer;
