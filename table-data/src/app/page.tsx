"use client"
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { Button } from "@nextui-org/button";


export type Data = {
  Id: number
  FirstName : string
  LastName : string
  Position : string
  Phone : number
  Email : string
}

const formatPhoneNumber = (input: string | number): string => {
  const numberStr = input.toString();

  const part1 = numberStr.slice(0, 3);
  const part2 = numberStr.slice(3, 6); 
  const part3 = numberStr.slice(6);

  return `(${part1}) ${part2}-${part3}`;
};

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "FirstName",
    header: ({ column }) => {
      return (
        <Button
          fullWidth
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          {column.getIsSorted() === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
          {!column.getIsSorted() && <span className="ml-2 h-4 w-4 invisible"></span>}
        </Button>
      )
    },
  },
  {
    accessorKey: "LastName",
    header: ({ column }) => {
      return (
        <Button
          fullWidth
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
          {column.getIsSorted() === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
          {!column.getIsSorted() && <span className="ml-2 h-4 w-4 invisible"></span>}
        </Button>
      )
    },
  },
  {
    accessorKey: "Position",
    header: ({ column }) => {
      return (
        <Button
          fullWidth
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Position
          {column.getIsSorted() === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
          {!column.getIsSorted() && <span className="ml-2 h-4 w-4 invisible"></span>}
        </Button>
      )
    },
  },
  {
    accessorKey: "Phone",
    header: "Phone",
    cell: ({ row }) =>{
      const phoneNumber = row.original.Phone;
    
      return <div>{formatPhoneNumber(phoneNumber)}</div>
    }
  },
  {
    accessorKey: "Email",
    header: ({ column }) => {
      return (
        <Button
          fullWidth
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          {column.getIsSorted() === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
          {!column.getIsSorted() && <span className="ml-2 h-4 w-4 invisible"></span>}
        </Button>
      )
    },
  },
]

export const datas: Data[] = [
  {
    Id: 1,
    FirstName: "Kevin",
    LastName: "Carter",
    Position: "CEO",
    Phone: 2135552378,
    Email: "KevinC@example.com",
  },
  {
    Id: 2,
    FirstName: "Levin",
    LastName: "Carter",
    Position: "CTO",
    Phone: 2135552378,
    Email: "LevinC@example.com",
  },
  {
    Id: 3,
    FirstName: "Devin",
    LastName: "Carter",
    Position: "Staff",
    Phone: 2135552378,
    Email: "DevinC@example.com",
  },
  {
    Id: 4,
    FirstName: "Qevin",
    LastName: "Carter",
    Position: "HR Lead",
    Phone: 2135552378,
    Email: "QevinC@example.com",
  },
  {
    Id: 5,
    FirstName: "Kevin",
    LastName: "Carter",
    Position: "CEO",
    Phone: 2135552378,
    Email: "KevinC@example.com",
  },
  {
    Id: 6,
    FirstName: "Levin",
    LastName: "Carter",
    Position: "CTO",
    Phone: 2135552378,
    Email: "LevinC@example.com",
  },
  {
    Id: 7,
    FirstName: "Devin",
    LastName: "Carter",
    Position: "Staff",
    Phone: 2135552378,
    Email: "DevinC@example.com",
  },
  {
    Id: 8,
    FirstName: "Qevin",
    LastName: "Carter",
    Position: "HR Lead",
    Phone: 2135552378,
    Email: "QevinC@example.com",
  },
  {
    Id: 9,
    FirstName: "Kevin",
    LastName: "Carter",
    Position: "CEO",
    Phone: 2135552378,
    Email: "KevinC@example.com",
  },
  {
    Id: 10,
    FirstName: "Levin",
    LastName: "Carter",
    Position: "CTO",
    Phone: 2135552378,
    Email: "LevinC@example.com",
  },
  {
    Id: 11,
    FirstName: "Devin",
    LastName: "Carter",
    Position: "Staff",
    Phone: 2135552378,
    Email: "DevinC@example.com",
  },
  {
    Id: 12,
    FirstName: "Qevin",
    LastName: "Carter",
    Position: "HR Lead",
    Phone: 2135552378,
    Email: "QevinC@example.com",
  },
  {
    Id: 13,
    FirstName: "Kevin",
    LastName: "Carter",
    Position: "CEO",
    Phone: 2135552378,
    Email: "KevinC@example.com",
  },
  {
    Id: 14,
    FirstName: "Levin",
    LastName: "Carter",
    Position: "CTO",
    Phone: 2135552378,
    Email: "LevinC@example.com",
  },
  {
    Id: 15,
    FirstName: "Devin",
    LastName: "Carter",
    Position: "Staff",
    Phone: 2135552378,
    Email: "DevinC@example.com",
  },
  {
    Id: 16,
    FirstName: "Qevin",
    LastName: "Carter",
    Position: "HR Lead",
    Phone: 2135552378,
    Email: "QevinC@example.com",
  },
]

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={datas} />
    </div>
  )
}
