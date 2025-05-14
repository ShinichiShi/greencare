"use client"

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Leaf, TrendingUp, FileText, Recycle } from "lucide-react";

interface SustainabilityMetrics {
  daily: {
    paperSaved: number;
    digitalTransactions: number;
    carbonOffset: number;
  };
  total: {
    paperSaved: number;
    digitalTransactions: number;
    treesPreserved: number;
    carbonOffset: number;
  };
}

export default function SustainabilityMetricsPage() {
  const [metrics, setMetrics] = useState<SustainabilityMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/sustainability');
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Failed to fetch sustainability metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="text-center py-8">
        Failed to load sustainability metrics
      </div>
    );
  }

  return (
    <div className="  mx-auto py-8 space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paper Saved Today</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.daily.paperSaved} sheets</div>
            <p className="text-xs text-muted-foreground">
              Equivalent to {(metrics.daily.paperSaved / 8333).toFixed(2)} trees
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Digital Transactions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.daily.digitalTransactions}</div>
            <p className="text-xs text-muted-foreground">
              Today's paperless operations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trees Preserved</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.total.treesPreserved}</div>
            <p className="text-xs text-muted-foreground">
              Total trees saved through digitization
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Offset</CardTitle>
            <Recycle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.total.carbonOffset} kg</div>
            <p className="text-xs text-muted-foreground">
              CO₂ emissions prevented
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Environmental Impact Progress</CardTitle>
          <CardDescription>Tracking our sustainability goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Paper Reduction Goal</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-600">
                    On Track
                  </Badge>
                </div>
                <span className="text-sm font-medium">
                  {((metrics.total.paperSaved / 100000) * 100).toFixed(1)}%
                </span>
              </div>
              <Progress 
                value={(metrics.total.paperSaved / 100000) * 100} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                {metrics.total.paperSaved.toLocaleString()} of 100,000 sheets target
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Digital Adoption</span>
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-600">
                    Exceeding
                  </Badge>
                </div>
                <span className="text-sm font-medium">
                  {((metrics.total.digitalTransactions / 10000) * 100).toFixed(1)}%
                </span>
              </div>
              <Progress 
                value={(metrics.total.digitalTransactions / 10000) * 100} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                {metrics.total.digitalTransactions.toLocaleString()} of 10,000 transactions target
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Carbon Reduction</span>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-600">
                    In Progress
                  </Badge>
                </div>
                <span className="text-sm font-medium">
                  {((metrics.total.carbonOffset / 5000) * 100).toFixed(1)}%
                </span>
              </div>
              <Progress 
                value={(metrics.total.carbonOffset / 5000) * 100} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                {metrics.total.carbonOffset.toLocaleString()} of 5,000 kg CO₂ target
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}