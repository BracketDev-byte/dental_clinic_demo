import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/src';
import { siteSettings } from '@/app/src/db/schemaExports';
import { siteSettingsSchema } from '@/app/lib/validations';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const records = await db.select().from(siteSettings).limit(1);
    return NextResponse.json({ success: true, data: records[0] || null });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching settings';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = siteSettingsSchema.parse(body);

    const existing = await db.select().from(siteSettings).limit(1);

    if (existing.length === 0) {
      const [inserted] = await db
        .insert(siteSettings)
        .values({
          ...validated,
          updatedAt: new Date(),
        })
        .returning();
      return NextResponse.json({ success: true, data: inserted });
    } else {
      const [updated] = await db
        .update(siteSettings)
        .set({
          ...validated,
          updatedAt: new Date(),
        })
        .where(eq(siteSettings.id, existing[0].id))
        .returning();
      return NextResponse.json({ success: true, data: updated });
    }
  } catch (err: unknown) {
    console.error('Error updating site settings:', err);
    const msg = err instanceof Error ? err.message : 'Failed to update settings';
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}
