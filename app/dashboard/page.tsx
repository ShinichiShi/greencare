import { Leaf, Users, FilePlus, Calendar, Activity, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { PatientFlow } from "@/components/dashboard/PatientFlow";
import { AppointmentsChart } from "@/components/dashboard/AppointmentsChart";
import { SustainabilityMetrics } from "@/components/dashboard/SustainabilityMetrics";
import { DoctorWellbeingChart } from "@/components/dashboard/DoctorWellbeingChart";

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Overview of hospital operations and sustainability metrics">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Last updated: Today at 09:32 AM</span>
        </div>
      </DashboardHeader>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStats 
          title="Total Patients"
          value="1,284"
          description="+4.3% from last month"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardStats 
          title="New Registrations"
          value="42"
          description="Today"
          icon={<FilePlus className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardStats 
          title="Appointments"
          value="128"
          description="Scheduled for today"
          icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardStats 
          title="Average Wait Time"
          value="14 min"
          description="-22% from last week"
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Patient Flow</CardTitle>
            <CardDescription>
              Real-time patient flow and department utilization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PatientFlow />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>
              Distribution by department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AppointmentsChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Sustainability Metrics</CardTitle>
              <CardDescription>Environmental impact tracking</CardDescription>
            </div>
            <Leaf className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <SustainabilityMetrics />
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Doctor Wellbeing</CardTitle>
            <CardDescription>
              Monitoring workload and stress indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DoctorWellbeingChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Paper Usage Reduction</CardTitle>
              <CardDescription>YTD statistics</CardDescription>
            </div>
            <TrendingUp className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Paper Saved</span>
                <span className="text-sm font-medium">47,392 sheets</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span>Patient Records</span>
                  <span>58%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-chart-1" style={{ width: "58%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span>Administrative Forms</span>
                  <span>32%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-chart-2" style={{ width: "32%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span>Prescriptions</span>
                  <span>10%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-chart-3" style={{ width: "10%" }}></div>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-xs text-muted-foreground">
                  Equivalent to saving approximately 5.7 trees
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Carbon Footprint</CardTitle>
            <CardDescription>Impact reduction tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-2">
              <div className="relative h-52 w-52">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-3xl font-bold">-32%</span>
                    <p className="text-xs text-muted-foreground">From baseline</p>
                  </div>
                </div>
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <circle
                    className="stroke-muted fill-none"
                    cx="50"
                    cy="50"
                    r="40"
                    strokeWidth="10"
                  />
                  <circle
                    className="stroke-chart-2 fill-none animate-[dash_1.5s_ease-in-out]"
                    cx="50"
                    cy="50"
                    r="40"
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 * (1 - 0.32)}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm">Total CO₂ Reduction</p>
                <p className="text-lg font-semibold">28.4 tons</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Digital Adoption</CardTitle>
            <CardDescription>Paperless transition progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Patient Registration</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-chart-1" style={{ width: "92%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">E-Prescriptions</span>
                  <span className="text-sm font-medium">87%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-chart-2" style={{ width: "87%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Digital Documentation</span>
                  <span className="text-sm font-medium">76%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-chart-3" style={{ width: "76%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Mobile Check-in</span>
                  <span className="text-sm font-medium">64%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-chart-4" style={{ width: "64%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}