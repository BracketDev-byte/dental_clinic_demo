import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/src';
import { treatments } from '@/app/src/db/schemaExports';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      slug,
      categoryId,
      shortDescription,
      fullContent,
      imageUrl,
      priceText,
      durationText,
      featured,
      published,
      sortOrder,
    } = body;

    if (!name || !slug || !shortDescription || !fullContent) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const [created] = await db
      .insert(treatments)
      .values({
        name,
        slug,
        categoryId: categoryId ? Number(categoryId) : null,
        shortDescription,
        fullContent,
        imageUrl: imageUrl || '',
        priceText: priceText || '',
        durationText: durationText || '',
        featured: Boolean(featured),
        published: published !== undefined ? Boolean(published) : true,
        sortOrder: Number(sortOrder) || 0,
      })
      .returning();

    return NextResponse.json({ success: true, data: created });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to create treatment';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing treatment id' }, { status: 400 });
    }

    const [updated] = await db
      .update(treatments)
      .set(updates)
      .where(eq(treatments.id, Number(id)))
      .returning();

    return NextResponse.json({ success: true, data: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update treatment';
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

    await db.delete(treatments).where(eq(treatments.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to delete treatment';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
