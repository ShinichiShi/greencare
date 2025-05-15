import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const hospitalId = searchParams.get('hospitalId');
  
  const client = await clientPromise;
  const db = client.db("greencare");
  
  const monthlyData = await db.collection("sustainability_monthly")
    .find({ hospitalId })
    .sort({ month: 1 })
    .toArray();
  
  return NextResponse.json(monthlyData);
}

export async function POST(request: Request) {
  const { data, hospitalId } = await request.json();
  
  const client = await clientPromise;
  const db = client.db("greencare");
  
  // First delete all existing data for this hospital
  await db.collection("sustainability_monthly").deleteMany({ hospitalId });
  
  // Then insert the new data with hospitalId
  const docs = data.map((item: any) => ({ ...item, hospitalId }));
  await db.collection("sustainability_monthly").insertMany(docs);
  
  return NextResponse.json({ success: true });
}