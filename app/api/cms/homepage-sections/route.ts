import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/src';
import { homepageSections } from '@/app/src/db/schemaExports';
import { eq, asc } from 'drizzle-orm';
import { homepageSectionSchema } from '@/app/lib/validations';

export async function GET() {
  try {
    const list = await db
      .select()
      .from(homepageSections)
      .orderBy(asc(homepageSections.sortOrder));
    return NextResponse.json({ success: true, data: list });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to fetch homepage sections';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = homepageSectionSchema.parse(body);

    const existing = await db
      .select()
      .from(homepageSections)
      .where(eq(homepageSections.sectionKey, validated.sectionKey))
      .limit(1);

    if (existing.length === 0) {
      const [inserted] = await db
        .insert(homepageSections)
        .values({
          ...validated,
          updatedAt: new Date(),
        })
        .returning();
      return NextResponse.json({ success: true, data: inserted });
    } else {
      const [updated] = await db
        .update(homepageSections)
        .set({
          ...validated,
          updatedAt: new Date(),
        })
        .where(eq(homepageSections.sectionKey, validated.sectionKey))
        .returning();
      return NextResponse.json({ success: true, data: updated });
    }
  } catch (err: unknown) {
    console.error('Error updating homepage section:', err);
    const msg = err instanceof Error ? err.message : 'Failed to update homepage section';
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}
