import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const hospitalId = searchParams.get('hospitalId');
  
  const client = await clientPromise;
  const db = client.db("greencare");
  
  const metrics = await db.collection("sustainability_metrics").findOne({ hospitalId });
  
  return NextResponse.json(metrics || {
    paperSaved: 0,
    carbonReduction: 0,
    digitalAdoption: 0,
    energyEfficiency: 0
  });
}

export async function POST(request: Request) {
  const data = await request.json();
  
  const client = await clientPromise;
  const db = client.db("greencare");
  
  await db.collection("sustainability_metrics").updateOne(
    { hospitalId: data.hospitalId },
    { $set: data },
    { upsert: true }
  );
  
  return NextResponse.json({ success: true });
}   