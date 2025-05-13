import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("greencare");
    
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Get metrics for the current day
    const dailyMetrics = await db.collection("sustainability_metrics")
      .findOne({ date: today });
    
    // Get total metrics
    const totalMetrics = await db.collection("sustainability_metrics").aggregate([
      {
        $group: {
          _id: null,
          totalPaperSaved: { $sum: "$paperSaved" },
          totalDigitalTransactions: { $sum: "$digitalTransactions" },
          totalCarbonOffset: { $sum: "$carbonOffset" }
        }
      }
    ]).toArray();

    // Calculate environmental impact
    const treesPreserved = Math.floor(totalMetrics[0].totalPaperSaved / 8333); // Average sheets per tree
    const carbonOffset = totalMetrics[0].totalCarbonOffset || 0;

    return NextResponse.json({
      daily: dailyMetrics || {
        paperSaved: 0,
        digitalTransactions: 0,
        carbonOffset: 0
      },
      total: {
        paperSaved: totalMetrics[0].totalPaperSaved,
        digitalTransactions: totalMetrics[0].totalDigitalTransactions,
        treesPreserved,
        carbonOffset
      }
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch sustainability metrics' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("greencare");
    
    const result = await db.collection("sustainability_metrics").insertOne({
      ...body,
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date()
    });

    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to update sustainability metrics' }, { status: 500 });
  }
}