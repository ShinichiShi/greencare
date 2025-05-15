"use client"

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function MonthlyDataEditor({ hospitalId }: { hospitalId: string | null}) {
    const [monthlyData, setMonthlyData] = useState<
      Array<{
        _id?: string;
        month: string;
        paperSaved: number;
        carbonReduction: number;
        energyUsage: number;
      }>
    >([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const res = await fetch(`/api/sustainability/monthly?hospitalId=${hospitalId}`);
        const data = await res.json();
        setMonthlyData(data);
      };
      fetchData();
    }, [hospitalId]);
  
    const handleAddMonth = () => {
      setMonthlyData([
        ...monthlyData,
        {
          month: "",
          paperSaved: 0,
          carbonReduction: 0,
          energyUsage: 0,
        },
      ]);
    };
  
    const handleSave = async () => {
      await fetch(`/api/sustainability/monthly`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: monthlyData, hospitalId }),
      });
    };
  
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Monthly Sustainability Data</CardTitle>
            <div className="space-x-2">
              <Button variant="outline" onClick={handleAddMonth}>
                Add Month
              </Button>
              <Button onClick={handleSave}>Save All</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Paper Saved</TableHead>
                <TableHead>Carbon Reduction</TableHead>
                <TableHead>Energy Usage</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyData.map((month, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Input
                      value={month.month}
                      onChange={(e) => {
                        const newData = [...monthlyData];
                        newData[index].month = e.target.value;
                        setMonthlyData(newData);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={month.paperSaved}
                      onChange={(e) => {
                        const newData = [...monthlyData];
                        newData[index].paperSaved = Number(e.target.value);
                        setMonthlyData(newData);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      step="0.1"
                      value={month.carbonReduction}
                      onChange={(e) => {
                        const newData = [...monthlyData];
                        newData[index].carbonReduction = Number(e.target.value);
                        setMonthlyData(newData);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={month.energyUsage}
                      onChange={(e) => {
                        const newData = [...monthlyData];
                        newData[index].energyUsage = Number(e.target.value);
                        setMonthlyData(newData);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setMonthlyData(monthlyData.filter((_, i) => i !== index));
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