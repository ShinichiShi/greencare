"use client"

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: '8 AM', Emergency: 12, Outpatient: 24, Admission: 8 },
  { name: '9 AM', Emergency: 15, Outpatient: 35, Admission: 10 },
  { name: '10 AM', Emergency: 18, Outpatient: 42, Admission: 11 },
  { name: '11 AM', Emergency: 21, Outpatient: 48, Admission: 12 },
  { name: '12 PM', Emergency: 17, Outpatient: 38, Admission: 9 },
  { name: '1 PM', Emergency: 14, Outpatient: 29, Admission: 7 },
  { name: '2 PM', Emergency: 16, Outpatient: 31, Admission: 8 },
  { name: '3 PM', Emergency: 19, Outpatient: 36, Admission: 10 },
  { name: '4 PM', Emergency: 15, Outpatient: 32, Admission: 9 },
];

export function PatientFlow() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
          <Bar dataKey="Emergency" fill="hsl(var(--chart-1))" barSize={20} />
          <Bar dataKey="Outpatient" fill="hsl(var(--chart-2))" barSize={20} />
          <Bar dataKey="Admission" fill="hsl(var(--chart-3))" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}