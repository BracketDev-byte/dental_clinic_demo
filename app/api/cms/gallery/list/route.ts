import { NextResponse } from 'next/server';
import { db } from '@/app/src';
import { smileCases } from '@/app/src/db/schemaExports';
import { asc } from 'drizzle-orm';

export async function GET() {
  try {
    const list = await db.select().from(smileCases).orderBy(asc(smileCases.sortOrder));
    return NextResponse.json({ success: true, data: list });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching cases';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
