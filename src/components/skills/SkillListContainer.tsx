// import { PostListTable } from "./PostListTable";

import SkillListsTable from "./SkillListTable";

const SkillListContainer = async () => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between mb-6 space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Skills List</h2>
      </div>
      <SkillListsTable />
    </div>
  );
};

export default SkillListContainer;
