import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/src';
import { reviews } from '@/app/src/db/schemaExports';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { patientName, reviewText, rating, treatment, source, featured, published } = body;

    if (!patientName || !reviewText) {
      return NextResponse.json({ success: false, error: 'Name and review text required' }, { status: 400 });
    }

    const [created] = await db
      .insert(reviews)
      .values({
        patientName,
        reviewText,
        rating: Number(rating) || 5,
        treatment: treatment || 'General Dentistry',
        source: source || 'Google Reviews',
        featured: Boolean(featured),
        published: published !== undefined ? Boolean(published) : true,
      })
      .returning();

    return NextResponse.json({ success: true, data: created });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to save review';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing review id' }, { status: 400 });
    }

    const [updated] = await db
      .update(reviews)
      .set(updates)
      .where(eq(reviews.id, Number(id)))
      .returning();

    return NextResponse.json({ success: true, data: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update review';
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

    await db.delete(reviews).where(eq(reviews.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to delete review';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
