// import { PostListTable } from "./PostListTable";

import ExperienceListTable from "./ExperienceListTable";

// import BlogListsTable from "./BlogListTable";

const ExperienceListContainer = async () => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between mb-6 space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Experience List</h2>
      </div>
      {/* <BlogListsTable /> */}
      {/* <UserContentTable /> */}
      <ExperienceListTable />
    </div>
  );
};

export default ExperienceListContainer;
