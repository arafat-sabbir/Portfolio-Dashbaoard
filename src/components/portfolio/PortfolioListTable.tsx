"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { DataTablePagination } from "@/components/table-pagination";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { generateImage } from "@/lib/utils";
import { getAllPortfolios } from "@/actions/portfolio/get-all-portfolios";
import { deletePortfolio } from "@/actions/portfolio/delete-portfolio";

interface TPortfolio {
  title: string;
  category: string;
  description: string;
  technologiesUsed: string[];
  features: string[];
  livePreview?: string;
  sourceCode: string;
  thumbnail: string;
  duration?: string;
  reviews: string[];
  currentlyWorking?: boolean;
  startDate?: Date;
  endDate?: Date;
  _id: string;
}

const PortfolioListsTable = () => {
  const [portfolios, setPortfolios] = useState<TPortfolio[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const getAllPortfolio = async () => {
      const response = await getAllPortfolios();
      if (response?.error) {
        return toast.error(response?.error);
      }
      setPortfolios(response?.data);
    };
    getAllPortfolio();
  }, [refetch]);

  const handleDeletePortfolio = async (id: string) => {
    const toastId = toast.loading("Deleting Portfolio...");
    const response = await deletePortfolio(id);

    if (response?.error) {
      return toast.error(response?.error);
    }
    toast.success(response?.message, { id: toastId });
    setRefetch(!refetch);
  };

  const columns: ColumnDef<TPortfolio>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <div>{row.getValue("category")}</div>,
    },
    {
      accessorKey: "thumbnail",
      header: "Thumbnail",
      cell: ({ row }) => (
        <Image
          className="rounded-md w-60 h-32 object-cover"
          height={1000}
          width={1000}
          src={generateImage(row.getValue("thumbnail"))}
          alt={`Thumbnail`}
        />
      ),
    },
    {
      accessorKey: "technologiesUsed",
      header: "Technologies Used",
      cell: ({ row }) => (
        <div>
          {" "}
          {(row.getValue("technologiesUsed") as any).map(
            (feature: string, index: number) => (
              <li key={index}>{feature || "N/A"}</li>
            )
          )}
        </div>
      ),
    },
    {
      accessorKey: "features",
      header: "Features",
      cell: ({ row }) => (
        <ul className="list-disc pl-5">
          {(row.getValue("features") as any).map(
            (feature: string, index: number) => (
              <li key={index}>{feature}</li>
            )
          )}
        </ul>
      ),
    },
    {
      accessorKey: "livePreview",
      header: "Live Preview",
      cell: ({ row }) =>
        row.getValue("livePreview") ? (
          <Link href={row.getValue("livePreview")} target="_blank">
            Live Link
          </Link>
        ) : (
          "N/A"
        ),
    },
    {
      accessorKey: "sourceCode",
      header: "Source Code",
      cell: ({ row }) => (
        <Link href={row.getValue("sourceCode")} target="_blank">
          Source Link
        </Link>
      ),
    },
    {
      id: "actions",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/dashboard/portfolios/${row?.original?._id}/update`}>
              <DropdownMenuItem className="cursor-pointer">
                Edit
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => handleDeletePortfolio(row?.original?._id)}
              className="cursor-pointer"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: portfolios,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border mb-6">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
};

export default PortfolioListsTable;
