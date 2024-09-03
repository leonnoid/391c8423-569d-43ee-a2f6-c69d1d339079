"use client"
import { ArrowDown, ArrowUp } from "lucide-react"
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { Button } from "@nextui-org/button";


export type Data = {
  Id: number
  FirstName : string
  LastName : string
  Position : string
  Phone : string
  Email : string
}

const formatPhoneNumber = (input: string) => {
  if (input === undefined || input === null || input.length === 0) {
    return '';
  }
  
    const part1 = input.slice(0, 3);
    const part2 = input.slice(3, 6); 
    const part3 = input.slice(6);

    return `(${part1}) ${part2}-${part3}`;
};

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "FirstName",
    header: ({ column }) => {
      return (
        <Button
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
    cell:({ row }) => {
      return <div className="ml-8">{row.original.FirstName}</div>
  }
  },
  {
    accessorKey: "LastName",
    header: ({ column }) => {
      return (
        <Button
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
    cell:({ row }) => {
      return <div className="ml-8">{row.original.LastName}</div>
  }
  },
  {
    accessorKey: "Position",
    header: ({ column }) => {
      return (
        <Button
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
    cell:({ row }) => {
        return <div className="ml-8">{row.original.Position}</div>
    }
  },
  {
    accessorKey: "Phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone
          {column.getIsSorted() === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
          {!column.getIsSorted() && <span className="ml-2 h-4 w-4 invisible"></span>}
        </Button>
      )
    },
    cell: ({ row }) =>{
      const phoneNumber = row.original.Phone;
    
      return <div className="ml-8">{formatPhoneNumber(phoneNumber)}</div>
    }
  },
  {
    accessorKey: "Email",
    header: ({ column }) => {
      return (
        <Button
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
    cell:({ row }) => {
      return <div className="ml-8">{row.original.Email}</div>
  }
  },
]

export const datas: Data[] = [
  {
    Id: 1,
    FirstName: "Kevin",
    LastName: "Carter",
    Position: "CEO",
    Phone: "2135552378",
    Email: "KevinC@example.com",
  },
  {
    Id: 2,
    FirstName: "Levin",
    LastName: "Carter",
    Position: "CTO",
    Phone: "2135552378",
    Email: "LevinC@example.com",
  },
  {
    Id: 3,
    FirstName: "Devin",
    LastName: "Carter",
    Position: "Staff",
    Phone: "2135552378",
    Email: "DevinC@example.com",
  },
  {
    Id: 4,
    FirstName: "Qevin",
    LastName: "Carter",
    Position: "HR Lead",
    Phone: "2135552378",
    Email: "QevinC@example.com",
  },
  {
    Id: 5,
    FirstName: "Kevin",
    LastName: "Carter",
    Position: "CEO",
    Phone: "2135552378",
    Email: "KevinC@example.com",
  },
  {
    Id: 6,
    FirstName: "Levin",
    LastName: "Carter",
    Position: "CTO",
    Phone: "2135552378",
    Email: "LevinC@example.com",
  },
  {
    Id: 7,
    FirstName: "Devin",
    LastName: "Carter",
    Position: "Staff",
    Phone: "2135552378",
    Email: "DevinC@example.com",
  },
  {
    Id: 8,
    FirstName: "Qevin",
    LastName: "Carter",
    Position: "HR Lead",
    Phone: "2135552378",
    Email: "QevinC@example.com",
  },
  {
    Id: 9,
    FirstName: "Kevin",
    LastName: "Carter",
    Position: "CEO",
    Phone: "2135552378",
    Email: "KevinC@example.com",
  },
  {
    Id: 10,
    FirstName: "Levin",
    LastName: "Carter",
    Position: "CTO",
    Phone: "2135552378",
    Email: "LevinC@example.com",
  },
  {
    Id: 11,
    FirstName: "Devin",
    LastName: "Carter",
    Position: "Staff",
    Phone: "2135552378",
    Email: "DevinC@example.com",
  },
  {
    Id: 12,
    FirstName: "Qevin",
    LastName: "Carter",
    Position: "HR Lead",
    Phone: "2135552378",
    Email: "QevinC@example.com",
  },
  {
    Id: 13,
    FirstName: "Kevin",
    LastName: "Carter",
    Position: "CEO",
    Phone: "2135552378",
    Email: "KevinC@example.com",
  },
  {
    Id: 14,
    FirstName: "Levin",
    LastName: "Carter",
    Position: "CTO",
    Phone: "2135552378",
    Email: "LevinC@example.com",
  },
  {
    Id: 15,
    FirstName: "Devin",
    LastName: "Carter",
    Position: "Staff",
    Phone: "2135552378",
    Email: "DevinC@example.com",
  },
  {
    Id: 16,
    FirstName: "Qevin",
    LastName: "Carter",
    Position: "HR Lead",
    Phone: "2135552378",
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
