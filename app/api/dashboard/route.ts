import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("greencare");
    
    // Get dashboard stats
    const stats = await db.collection("dashboard_stats").findOne({});
    
    // Get patient flow data
    const patientFlow = await db.collection("patient_flow").find().sort({ hour: 1 }).toArray();
    
    // Get appointments data
    const appointments = await db.collection("appointments").aggregate([
      { $group: { _id: "$department", count: { $sum: 1 } } }
    ]).toArray();
    
    // Get sustainability metrics
    const sustainability = await db.collection("sustainability_metrics").findOne({});
    
    // Get doctor wellbeing data
    const wellbeing = await db.collection("doctor_wellbeing").find().toArray();
    
    // Get paper usage data
    const paperUsage = await db.collection("paper_usage").find().toArray();
    
    // Get digital adoption data
    const digitalAdoption = await db.collection("digital_adoption").find().toArray();

    return NextResponse.json({
      stats: {
        totalPatients: stats?.totalPatients || 0,
        newRegistrations: stats?.newRegistrations || 0,
        appointmentsToday: stats?.appointmentsToday || 0,
        avgWaitTime: stats?.avgWaitTime || 0,
        waitTimeChange: stats?.waitTimeChange || 0,
        registrationChange: stats?.registrationChange || 0
      },
      patientFlow,
      appointments: appointments.map(item => ({
        department: item._id,
        count: item.count
      })),
      sustainability: {
        paperSaved: sustainability?.paperSaved || 0,
        carbonReduction: sustainability?.carbonReduction || 0,
        digitalAdoption: sustainability?.digitalAdoption || 0
      },
      wellbeing,
      paperUsage,
      digitalAdoption
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}