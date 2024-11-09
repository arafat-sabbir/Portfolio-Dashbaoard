import WorkListsTable from "./WorkListTable";

const WorkListContainer = async () => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between mb-6 space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Client List</h2>
      </div>
      <WorkListsTable />
    </div>
  );
};

export default WorkListContainer;
