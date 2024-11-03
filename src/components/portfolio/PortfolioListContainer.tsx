// import { PostListTable } from "./PostListTable";

import PortfolioListsTable from "./PortfolioListTable";

const PortfolioListContainer = async () => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between mb-6 space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Portfolio List</h2>
      </div>
      <PortfolioListsTable />
    </div>
  );
};

export default PortfolioListContainer;
