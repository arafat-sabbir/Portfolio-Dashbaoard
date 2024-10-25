// import { PostListTable } from "./PostListTable";

import EducationListTable from "./EducationListTable";


// import BlogListsTable from "./BlogListTable";

const EducationListContainer = async () => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between mb-6 space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Educations List</h2>
      </div>
      {/* <BlogListsTable /> */}
      {/* <UserContentTable /> */}
      <EducationListTable />
    </div>
  );
};

export default EducationListContainer;
