import { NextResponse } from 'next/server';
import { db } from '@/app/src';
import { reviews } from '@/app/src/db/schemaExports';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const list = await db.select().from(reviews).orderBy(desc(reviews.createdAt));
    return NextResponse.json({ success: true, data: list });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching reviews';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
