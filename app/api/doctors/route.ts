import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("greencare");
    
    // Get hospitalId from auth session (you'll need to implement auth)
    const hospitalId = "demo-hospital"; // Temporary default
    
    const doctors = await db.collection("doctors")
      .find({ hospitalId })
      .toArray();

    return NextResponse.json(doctors);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("greencare");
    
    // Add hospitalId to the doctor record
    const doctorData = {
      ...body,
      hospitalId: "demo-hospital", // Replace with actual hospital ID from auth
      createdAt: new Date(),
      burnoutMetrics: {
        workloadLevel: 0,
        stressIndicators: 0,
        lastAssessmentDate: new Date()
      }
    };
    
    const result = await db.collection("doctors").insertOne(doctorData);

    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to create doctor' }, { status: 500 });
  }
}