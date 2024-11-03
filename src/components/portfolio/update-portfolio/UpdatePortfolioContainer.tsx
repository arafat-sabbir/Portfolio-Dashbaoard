import React from "react";
import {  UpdatePortfolioForm } from "./UpdatePortfolioForm";

const UpdatePortfolioContainer = ({ id }: { id: string }) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Update Portfolio</h2>
      </div>
      <UpdatePortfolioForm id={id} />
    </div>
  );
};

export default UpdatePortfolioContainer;
