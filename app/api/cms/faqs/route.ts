import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/src';
import { clinicalFaqs } from '@/app/src/db/schemaExports';
import { eq, asc } from 'drizzle-orm';
import { clinicalFaqSchema } from '@/app/lib/validations';

export async function GET() {
  try {
    const list = await db
      .select()
      .from(clinicalFaqs)
      .orderBy(asc(clinicalFaqs.sortOrder));
    return NextResponse.json({ success: true, data: list });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to fetch faqs';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = clinicalFaqSchema.parse(body);

    const [created] = await db
      .insert(clinicalFaqs)
      .values({
        question: validated.question,
        answer: validated.answer,
        category: validated.category,
        sortOrder: validated.sortOrder,
        published: validated.published,
      })
      .returning();

    return NextResponse.json({ success: true, data: created });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to create faq';
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing FAQ id' }, { status: 400 });
    }

    const [updated] = await db
      .update(clinicalFaqs)
      .set(updates)
      .where(eq(clinicalFaqs.id, Number(id)))
      .returning();

    return NextResponse.json({ success: true, data: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update faq';
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

    await db.delete(clinicalFaqs).where(eq(clinicalFaqs.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to delete faq';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
