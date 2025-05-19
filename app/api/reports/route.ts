import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
// Update the import path if the Report model is located elsewhere, for example:
import Report from '../models/Report';
// Or provide the correct relative path to the Report model file

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const url = new URL(request.url);
    const status = url.searchParams.get('status');

    // Build query
    const query: any = {};
    if (status) {
      query.status = status;
    }

    const reports = await Report.find(query).lean();
    return NextResponse.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { message: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}