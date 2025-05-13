"use client"

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', Workload: 76, StressLevel: 62, Satisfaction: 85 },
  { name: 'Feb', Workload: 72, StressLevel: 68, Satisfaction: 82 },
  { name: 'Mar', Workload: 80, StressLevel: 72, Satisfaction: 78 },
  { name: 'Apr', Workload: 85, StressLevel: 78, Satisfaction: 73 },
  { name: 'May', Workload: 78, StressLevel: 70, Satisfaction: 80 },
  { name: 'Jun', Workload: 72, StressLevel: 65, Satisfaction: 85 },
  { name: 'Jul', Workload: 68, StressLevel: 60, Satisfaction: 88 },
];

export function DoctorWellbeingChart() {
  return (
    <div className="h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              borderColor: 'hsl(var(--border))',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }} 
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="Workload" 
            stroke="hsl(var(--chart-1))" 
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="StressLevel" 
            stroke="hsl(var(--chart-2))" 
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="Satisfaction" 
            stroke="hsl(var(--chart-4))" 
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}