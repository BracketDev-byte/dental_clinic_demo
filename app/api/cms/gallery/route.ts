import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/src';
import { smileCases } from '@/app/src/db/schemaExports';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, treatment, description, caseDetails, beforeImageUrl, afterImageUrl, patientLabel, featured, published } = body;

    if (!title || !slug || !treatment || !description) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const [created] = await db
      .insert(smileCases)
      .values({
        title,
        slug,
        treatment,
        description,
        caseDetails: caseDetails || '',
        beforeImageUrl: beforeImageUrl || '',
        afterImageUrl: afterImageUrl || '',
        patientLabel: patientLabel || 'Kampala Patient',
        featured: Boolean(featured),
        published: published !== undefined ? Boolean(published) : true,
      })
      .returning();

    return NextResponse.json({ success: true, data: created });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to create case';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
    }

    const [updated] = await db
      .update(smileCases)
      .set(updates)
      .where(eq(smileCases.id, Number(id)))
      .returning();

    return NextResponse.json({ success: true, data: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update case';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
    }

    await db.delete(smileCases).where(eq(smileCases.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to delete case';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
