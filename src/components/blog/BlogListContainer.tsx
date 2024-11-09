// import { PostListTable } from "./PostListTable";

import BlogListsTable from "./BlogListTable";

const BlogListContainer = async () => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between mb-6 space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Blog List</h2>
      </div>
      <BlogListsTable />
      {/* <UserContentTable /> */}
    </div>
  );
};

export default BlogListContainer;
