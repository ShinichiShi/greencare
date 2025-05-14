"use client"

import React, { useEffect, useState } from 'react';
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, FileText, MoreHorizontal, Activity } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Doctor {
  _id: string;
  employeeId: string;
  name: string;
  gender: string;
  specialists: string[];
  burnoutMetrics: {
    workloadLevel: number;
    stressIndicators: number;
    lastAssessmentDate: string;
  };
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('/api/doctors');
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getBurnoutLevel = (level: number) => {
    if (level < 30) return { label: "Low", class: "bg-green-500/10 text-green-600" };
    if (level < 70) return { label: "Moderate", class: "bg-amber-500/10 text-amber-600" };
    return { label: "High", class: "bg-red-500/10 text-red-600" };
  };

  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Doctor Management" 
        text="Monitor and manage hospital staff and their well-being"
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Doctor
        </Button>
      </DashboardHeader>

      <Card>
        <CardHeader>
          <CardTitle>Hospital Staff Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search doctors..."
              className="h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Workload</TableHead>
                  <TableHead>Stress Level</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDoctors.map((doctor) => {
                  const burnout = getBurnoutLevel(doctor.burnoutMetrics.workloadLevel);
                  return (
                    <TableRow key={doctor._id}>
                      <TableCell className="font-medium">{doctor.employeeId}</TableCell>
                      <TableCell>Dr. {doctor.name}</TableCell>
                      <TableCell>{doctor.specialists.join(", ")}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={burnout.class}>
                          {burnout.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-muted-foreground" />
                          <span>{doctor.burnoutMetrics.stressIndicators}%</span>
                        </div>
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
                              <DropdownMenuItem>View profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit details</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Schedule</DropdownMenuItem>
                              <DropdownMenuItem>Performance metrics</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                Deactivate account
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}