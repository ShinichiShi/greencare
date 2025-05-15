// components/DepartmentsEditor.tsx
"use client"

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface DepartmentData {
  _id?: string;
  department: string;
  paperReduction: number;
}

export default function DepartmentsEditor({ hospitalId }: { hospitalId: string | null }) {
  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await fetch(`/api/sustainability/departments?hospitalId=${hospitalId}`);
      const data = await res.json();
      setDepartments(data);
      setIsLoading(false);
    };
    fetchDepartments();
  }, [hospitalId]);

  const handleAddDepartment = () => {
    setDepartments([...departments, { department: "", paperReduction: 0 }]);
  };

  const handleSave = async () => {
    setIsLoading(true);
    await fetch('/api/sustainability/departments', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: departments, hospitalId }),
    });
    setIsLoading(false);
  };

  if (isLoading) return <div>Loading departments...</div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Departmental Paper Reduction</CardTitle>
          <div className="space-x-2">
            <Button variant="outline" onClick={handleAddDepartment}>
              Add Department
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save All"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Department</TableHead>
              <TableHead>Paper Reduction (%)</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((dept, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input
                    value={dept.department}
                    onChange={(e) => {
                      const newData = [...departments];
                      newData[index].department = e.target.value;
                      setDepartments(newData);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={dept.paperReduction}
                    onChange={(e) => {
                      const newData = [...departments];
                      newData[index].paperReduction = Number(e.target.value);
                      setDepartments(newData);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setDepartments(departments.filter((_, i) => i !== index));
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}