import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("greencare");
    
    const registrations = await db.collection("registrations")
      .aggregate([
        {
          $lookup: {
            from: "patients",
            localField: "mrNo",
            foreignField: "mrNo",
            as: "patient"
          }
        },
        {
          $unwind: "$patient"
        }
      ]).toArray();

    return NextResponse.json(registrations);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("greencare");
    
    // Generate QR code string (in practice, you'd use a QR code library)
    const qrCode = `GC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const result = await db.collection("registrations").insertOne({
      ...body,
      registrationDate: new Date(),
      qrCode,
      waitingTime: 0 // Initial waiting time
    });

    // Update sustainability metrics
    await db.collection("sustainability_metrics").updateOne(
      { date: new Date().toISOString().split('T')[0] },
      {
        $inc: { 
          paperSaved: 7, // Average sheets saved per digital registration
          digitalTransactions: 1
        }
      },
      { upsert: true }
    );

    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to create registration' }, { status: 500 });
  }
}