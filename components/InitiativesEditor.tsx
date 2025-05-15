// components/InitiativesEditor.tsx
"use client"

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InitiativeData {
  _id?: string;
  name: string;
  status: 'planned' | 'in-progress' | 'completed';
  impact: string;
  startDate?: string;
  completionDate?: string;
}

export default function InitiativesEditor({ hospitalId }: { hospitalId: string | null}) {
  const [initiatives, setInitiatives] = useState<InitiativeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitiatives = async () => {
      const res = await fetch(`/api/sustainability/initiatives?hospitalId=${hospitalId}`);
      const data = await res.json();
      setInitiatives(data);
      setIsLoading(false);
    };
    fetchInitiatives();
  }, [hospitalId]);

  const handleAddInitiative = () => {
    setInitiatives([...initiatives, { name: "", status: "planned", impact: "" }]);
  };

  const handleSave = async () => {
    setIsLoading(true);
    await fetch('/api/sustainability/initiatives', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: initiatives, hospitalId }),
    });
    setIsLoading(false);
  };

  if (isLoading) return <div>Loading initiatives...</div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Green Initiatives</CardTitle>
          <div className="space-x-2">
            <Button variant="outline" onClick={handleAddInitiative}>
              Add Initiative
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
              <TableHead>Initiative Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Impact Description</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Completion Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initiatives.map((initiative, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input
                    value={initiative.name}
                    onChange={(e) => {
                      const newInitiatives = [...initiatives];
                      newInitiatives[index].name = e.target.value;
                      setInitiatives(newInitiatives);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={initiative.status}
                    onValueChange={(value) => {
                      const newInitiatives = [...initiatives];
                      newInitiatives[index].status = value as any;
                      setInitiatives(newInitiatives);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planned">Planned</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Input
                    value={initiative.impact}
                    onChange={(e) => {
                      const newInitiatives = [...initiatives];
                      newInitiatives[index].impact = e.target.value;
                      setInitiatives(newInitiatives);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="date"
                    value={initiative.startDate || ""}
                    onChange={(e) => {
                      const newInitiatives = [...initiatives];
                      newInitiatives[index].startDate = e.target.value;
                      setInitiatives(newInitiatives);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="date"
                    value={initiative.completionDate || ""}
                    onChange={(e) => {
                      const newInitiatives = [...initiatives];
                      newInitiatives[index].completionDate = e.target.value;
                      setInitiatives(newInitiatives);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setInitiatives(initiatives.filter((_, i) => i !== index));
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