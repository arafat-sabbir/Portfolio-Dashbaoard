import ClientListsTable from "./ClientListTable";

const ClientListContainer = async () => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between mb-6 space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Client List</h2>
      </div>
      <ClientListsTable />
    </div>
  );
};

export default ClientListContainer;
