"use client"

import * as React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileText, MoreHorizontal, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const patients = [
  {
    mrNo: "P-20250001",
    name: "Emily Johnson",
    gender: "Female",
    age: 42,
    date: "Today, 9:32 AM",
    status: "Active",
  },
  {
    mrNo: "P-20250002",
    name: "Michael Williams",
    gender: "Male",
    age: 58,
    date: "Today, 10:15 AM",
    status: "Waiting",
  },
  {
    mrNo: "P-20250003",
    name: "Sophia Martinez",
    gender: "Female",
    age: 29,
    date: "Today, 11:05 AM",
    status: "With Doctor",
  },
  {
    mrNo: "P-20250004",
    name: "Daniel Brown",
    gender: "Male",
    age: 35,
    date: "Yesterday, 3:45 PM",
    status: "Completed",
  },
  {
    mrNo: "P-20250005",
    name: "Olivia Davis",
    gender: "Female",
    age: 62,
    date: "Yesterday, 2:30 PM",
    status: "Completed",
  },
  {
    mrNo: "P-20250006",
    name: "James Wilson",
    gender: "Male",
    age: 48,
    date: "2 days ago",
    status: "Completed",
  },
  {
    mrNo: "P-20250007",
    name: "Ava Thompson",
    gender: "Female",
    age: 8,
    date: "2 days ago",
    status: "Completed",
  },
  {
    mrNo: "P-20250008",
    name: "Liam Garcia",
    gender: "Male",
    age: 71,
    date: "3 days ago",
    status: "Completed",
  },
]

export function PatientTable() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.mrNo.toLowerCase().includes(searchQuery.toLowerCase())
  )

  function getStatusColor(status: string) {
    switch (status) {
      case "Active":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10"
      case "Waiting":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
      case "With Doctor":
        return "bg-violet-500/10 text-violet-600 dark:text-violet-400 hover:bg-violet-500/10"
      case "Completed":
        return "bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/10"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search patients..."
          className="h-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>MR No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.mrNo}>
                <TableCell className="font-medium">{patient.mrNo}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.date}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(patient.status)}>
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit patient</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Schedule appointment</DropdownMenuItem>
                        <DropdownMenuItem>Generate QR code</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Archive patient
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}