import { NextResponse } from 'next/server';
import { db } from '@/app/src';
import { blogPosts } from '@/app/src/db/schemaExports';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const list = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
    return NextResponse.json({ success: true, data: list });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching blog posts';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
