"use client"

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function SustainabilityMetrics() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Paper Reduction</span>
            <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/10">+8.2%</Badge>
          </div>
          <span className="text-sm font-medium">92%</span>
        </div>
        <Progress value={92} className="h-2 bg-secondary" />
        <p className="text-xs text-muted-foreground">47,392 sheets saved YTD (5.7 trees)</p>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Carbon Reduction</span>
            <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10">+4.5%</Badge>
          </div>
          <span className="text-sm font-medium">32%</span>
        </div>
        <Progress value={32} className="h-2 bg-secondary" />
        <p className="text-xs text-muted-foreground">28.4 tons CO₂ saved compared to baseline</p>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Eco-Friendly Medications</span>
            <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10">+2.1%</Badge>
          </div>
          <span className="text-sm font-medium">68%</span>
        </div>
        <Progress value={68} className="h-2 bg-secondary" />
        <p className="text-xs text-muted-foreground">68% of prescribed medications have high sustainability ratings</p>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Digital Adoption</span>
            <Badge variant="outline" className="text-xs bg-violet-500/10 text-violet-600 dark:text-violet-400 hover:bg-violet-500/10">+5.8%</Badge>
          </div>
          <span className="text-sm font-medium">84%</span>
        </div>
        <Progress value={84} className="h-2 bg-secondary" />
        <p className="text-xs text-muted-foreground">84% of all hospital processes are now fully digital</p>
      </div>
    </div>
  );
}