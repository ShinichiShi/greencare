"use client"

import React, { useEffect, useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, TrendingUp, Check } from "lucide-react";

interface SustainabilityData {
  metrics: {
    paperSaved: number;
    carbonReduction: number;
    digitalAdoption: number;
    energyEfficiency: number;
  };
  monthlyData: Array<{
    name: string;
    Paper: number;
    Carbon: number;
    Energy: number;
  }>;
  departmentalData: Array<{
    name: string;
    value: number;
  }>;
  goals: Array<{
    name: string;
    achieved: number;
    goal: number;
    percentage: number;
    unit: string;
  }>;
  initiatives: Array<{
    name: string;
    completed: boolean;
    impact: string;
  }>;
}

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

export default function SustainabilityPage() {
  const [data, setData] = useState<SustainabilityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/sustainability');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch sustainability data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardShell>
    );
  }

  if (!data) {
    return (
      <DashboardShell>
        <div className="text-center py-8">
          Failed to load sustainability data
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Sustainability Dashboard"
        text="Track and monitor environmental impact metrics"
      >
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-500/10 text-green-600 dark:text-green-400">
            <Leaf className="mr-1 h-3 w-3" />
            SDG 3 Aligned
          </Badge>
        </div>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paper Saved</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.metrics.paperSaved.toLocaleString()} sheets</div>
            <p className="text-xs text-muted-foreground">{Math.round(data.metrics.paperSaved / 8333)} trees preserved</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Reduction</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.metrics.carbonReduction} tons CO₂e</div>
            <p className="text-xs text-muted-foreground">Equivalent to planting {Math.round(data.metrics.carbonReduction * 16.6)} trees</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Digital Adoption</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.metrics.digitalAdoption}%</div>
            <p className="text-xs text-muted-foreground">Across all hospital processes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Energy Efficiency</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.metrics.energyEfficiency}% reduction</div>
            <p className="text-xs text-muted-foreground">Compared to last year</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="charts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="charts">Charts & Metrics</TabsTrigger>
          <TabsTrigger value="goals">Sustainability Goals</TabsTrigger>
          <TabsTrigger value="initiatives">Green Initiatives</TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Monthly Progress</CardTitle>
                <CardDescription>Annual sustainability metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={data.monthlyData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '8px' 
                        }} 
                      />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="Paper" stroke="hsl(var(--chart-1))" activeDot={{ r: 8 }} name="Paper Saved (sheets x100)" />
                      <Line yAxisId="right" type="monotone" dataKey="Carbon" stroke="hsl(var(--chart-2))" name="Carbon Reduction (tons)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Paper Reduction by Department</CardTitle>
                <CardDescription>Distribution of paper-saving impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.departmentalData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {data.departmentalData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '8px' 
                        }} 
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Energy Consumption</CardTitle>
              <CardDescription>Monthly energy usage in kWh</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.monthlyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '8px' 
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="Energy" fill="hsl(var(--chart-3))" name="Energy Usage (kWh)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>2025 Sustainability Goals</CardTitle>
              <CardDescription>Progress towards annual targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {data.goals.map((goal) => (
                  <div key={goal.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{goal.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {goal.achieved} / {goal.goal} {goal.unit}
                        </p>
                      </div>
                      <span className="text-sm font-medium">{goal.percentage}%</span>
                    </div>
                    <Progress value={goal.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            {/* Keep the existing goal visualization cards */}
            {/* They can now use data from data.goals */}
          </div>
        </TabsContent>
        
        <TabsContent value="initiatives" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Green Initiatives</CardTitle>
              <CardDescription>Ongoing and completed sustainability projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {data.initiatives.map((initiative) => (
                  <div key={initiative.name} className="flex items-start space-x-4">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${initiative.completed ? 'bg-green-500/20' : 'bg-amber-500/20'}`}>
                      {initiative.completed ? (
                        <Check className={`h-4 w-4 text-green-600 dark:text-green-400`} />
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-amber-600 dark:bg-amber-400"></div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{initiative.name}</h3>
                        <Badge variant="outline" className={initiative.completed ? 
                          'bg-green-500/10 text-green-600 dark:text-green-400' : 
                          'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }>
                          {initiative.completed ? 'Completed' : 'In Progress'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{initiative.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Keep the existing SDG alignment section */}
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}