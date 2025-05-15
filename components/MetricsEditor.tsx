"use client"

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function MetricsEditor({ hospitalId }: { hospitalId: string | null}) {
    const [metrics, setMetrics] = useState({
      paperSaved: 0,
      carbonReduction: 0,
      digitalAdoption: 0,
      energyEfficiency: 0
    });
  
    useEffect(() => {
      const fetchMetrics = async () => {
        const res = await fetch(`/api/sustainability/metrics?hospitalId=${hospitalId}`);
        const data = await res.json();
        setMetrics(data);
      };
      fetchMetrics();
    }, [hospitalId]);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await fetch(`/api/sustainability/metrics`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...metrics, hospitalId }),
      });
    };
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Core Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label>Paper Saved (sheets)</label>
                <Input
                  type="number"
                  value={metrics.paperSaved}
                  onChange={(e) => setMetrics({...metrics, paperSaved: Number(e.target.value)})}
                />
              </div>
              <div>
                <label>Carbon Reduction (tons CO₂e)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={metrics.carbonReduction}
                  onChange={(e) => setMetrics({...metrics, carbonReduction: Number(e.target.value)})}
                />
              </div>
              <div>
                <label>Digital Adoption (%)</label>
                <Input
                  type="number"
                  value={metrics.digitalAdoption}
                  onChange={(e) => setMetrics({...metrics, digitalAdoption: Number(e.target.value)})}
                />
              </div>
              <div>
                <label>Energy Efficiency (% reduction)</label>
                <Input
                  type="number"
                  value={metrics.energyEfficiency}
                  onChange={(e) => setMetrics({...metrics, energyEfficiency: Number(e.target.value)})}
                />
              </div>
            </div>
            <Button type="submit">Save Metrics</Button>
          </form>
        </CardContent>
      </Card>
    );
  }