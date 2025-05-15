// components/GoalsEditor.tsx
"use client"

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface GoalData {
  _id?: string;
  name: string;
  target: number;
  unit: string;
  currentValue?: number;
}

export default function GoalsEditor({ hospitalId }: { hospitalId: string | null}) {
  const [goals, setGoals] = useState<GoalData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      const res = await fetch(`/api/sustainability/goals?hospitalId=${hospitalId}`);
      const data = await res.json();
      setGoals(data);
      setIsLoading(false);
    };
    fetchGoals();
  }, [hospitalId]);

  const handleAddGoal = () => {
    setGoals([...goals, { name: "", target: 0, unit: "" }]);
  };

  const handleSave = async () => {
    setIsLoading(true);
    await fetch('/api/sustainability/goals', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: goals, hospitalId }),
    });
    setIsLoading(false);
  };

  if (isLoading) return <div>Loading goals...</div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Sustainability Goals</CardTitle>
          <div className="space-x-2">
            <Button variant="outline" onClick={handleAddGoal}>
              Add Goal
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
              <TableHead>Goal Name</TableHead>
              <TableHead>Target Value</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {goals.map((goal, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input
                    value={goal.name}
                    onChange={(e) => {
                      const newGoals = [...goals];
                      newGoals[index].name = e.target.value;
                      setGoals(newGoals);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={goal.target}
                    onChange={(e) => {
                      const newGoals = [...goals];
                      newGoals[index].target = Number(e.target.value);
                      setGoals(newGoals);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={goal.unit}
                    onChange={(e) => {
                      const newGoals = [...goals];
                      newGoals[index].unit = e.target.value;
                      setGoals(newGoals);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setGoals(goals.filter((_, i) => i !== index));
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