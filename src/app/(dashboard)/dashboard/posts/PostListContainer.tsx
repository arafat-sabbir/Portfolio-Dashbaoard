// import { PostListTable } from "./PostListTable";

import PostListsTable from "./PostListTable";




const PostListContainer = async () => {
 
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between mb-6 space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Post List</h2>
      </div>
      <PostListsTable />
      {/* <UserContentTable /> */}
    </div>
  );
};

export default PostListContainer;
