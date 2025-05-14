import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const hospitalId = searchParams.get('hospitalId');
    
    if (!hospitalId || !ObjectId.isValid(hospitalId)) {
      return NextResponse.json(
        { error: 'Valid hospital ID is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("greencare");
    
    // Get hospital data to verify it exists
    const hospital = await db.collection("hospitals").findOne({ 
      _id: new ObjectId(hospitalId) 
    });
    
    if (!hospital) {
      return NextResponse.json(
        { error: 'Hospital not found' },
        { status: 404 }
      );
    }
    
    // Get sustainability metrics
    const metrics = await db.collection("sustainability_metrics")
      .find({ hospitalId: hospitalId })
      .sort({ date: -1 })
      .limit(30)
      .toArray();
    
    // Calculate totals
    const totals = {
      paperSaved: hospital.sustainabilityMetrics?.paperSaved || 0,
      carbonOffset: hospital.sustainabilityMetrics?.carbonOffset || 0,
      energyEfficiency: hospital.sustainabilityMetrics?.energyEfficiency || 100,
      digitalTransactions: hospital.sustainabilityMetrics?.digitalTransactions || 0,
    };
    
    // Get system-wide averages for comparison
    const systemAverages = await db.collection("hospitals").aggregate([
      {
        $group: {
          _id: null,
          avgPaperSaved: { $avg: "$sustainabilityMetrics.paperSaved" },
          avgCarbonOffset: { $avg: "$sustainabilityMetrics.carbonOffset" },
          avgEnergyEfficiency: { $avg: "$sustainabilityMetrics.energyEfficiency" },
          avgDigitalTransactions: { $avg: "$sustainabilityMetrics.digitalTransactions" },
          count: { $sum: 1 }
        }
      }
    ]).toArray();
    
    // Calculate rankings
    const paperSavedRank = await db.collection("hospitals").countDocuments({
      "sustainabilityMetrics.paperSaved": { $gt: hospital.sustainabilityMetrics?.paperSaved || 0 }
    }) + 1;
    
    const carbonOffsetRank = await db.collection("hospitals").countDocuments({
      "sustainabilityMetrics.carbonOffset": { $gt: hospital.sustainabilityMetrics?.carbonOffset || 0 }
    }) + 1;
    
    const totalHospitals = systemAverages[0]?.count || 0;
    
    return NextResponse.json({
      success: true,
      metrics: {
        totals,
        daily: metrics,
        averages: systemAverages[0] || null,
        rankings: {
          paperSaved: {
            rank: paperSavedRank,
            total: totalHospitals
          },
          carbonOffset: {
            rank: carbonOffsetRank,
            total: totalHospitals
          }
        }
      }
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Failed to fetch sustainability metrics' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { hospitalId, metrics } = body;
    
    if (!hospitalId || !ObjectId.isValid(hospitalId) || !metrics) {
      return NextResponse.json(
        { error: 'Valid hospital ID and metrics are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("greencare");
    
    // Get hospital data to verify it exists
    const hospital = await db.collection("hospitals").findOne({ 
      _id: new ObjectId(hospitalId) 
    });
    
    if (!hospital) {
      return NextResponse.json(
        { error: 'Hospital not found' },
        { status: 404 }
      );
    }
    
    // Get current date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Update daily metrics
    await db.collection("sustainability_metrics").updateOne(
      { 
        hospitalId: hospitalId,
        date: today
      },
      {
        $inc: {
          paperSaved: metrics.paperSaved || 0,
          carbonOffset: metrics.carbonOffset || 0,
          digitalTransactions: metrics.digitalTransactions || 0
        },
        $set: {
          energyEfficiency: metrics.energyEfficiency,
          updatedAt: new Date()
        },
        $setOnInsert: {
          createdAt: new Date()
        }
      },
      { upsert: true }
    );
    
    // Update hospital totals
    await db.collection("hospitals").updateOne(
      { _id: new ObjectId(hospitalId) },
      {
        $inc: {
          "sustainabilityMetrics.paperSaved": metrics.paperSaved || 0,
          "sustainabilityMetrics.carbonOffset": metrics.carbonOffset || 0,
          "sustainabilityMetrics.digitalTransactions": metrics.digitalTransactions || 0
        },
        $set: {
          "sustainabilityMetrics.energyEfficiency": metrics.energyEfficiency,
          updatedAt: new Date()
        }
      }
    );
    
    return NextResponse.json({
      success: true,
      message: "Sustainability metrics updated successfully"
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Failed to update sustainability metrics' },
      { status: 500 }
    );
  }
}