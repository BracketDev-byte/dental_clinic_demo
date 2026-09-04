import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/src';
import { contactEnquiries } from '@/app/src/db/schemaExports';
import { contactEnquirySchema } from '@/app/lib/validations';
import { desc, eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = contactEnquirySchema.parse(body);

    const [newRecord] = await db
      .insert(contactEnquiries)
      .values({
        fullName: validated.fullName,
        phone: validated.phone,
        email: validated.email,
        subject: validated.subject,
        message: validated.message,
        status: 'new',
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out. A member of our clinical team will respond shortly.',
      data: newRecord,
    });
  } catch (err: unknown) {
    console.error('Error submitting contact enquiry:', err);
    const errorMessage = err instanceof Error ? err.message : 'Invalid enquiry data';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}

export async function GET() {
  try {
    const records = await db
      .select()
      .from(contactEnquiries)
      .orderBy(desc(contactEnquiries.createdAt));
    return NextResponse.json({ success: true, data: records });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to fetch enquiries';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Missing id or status' }, { status: 400 });
    }

    const [updated] = await db
      .update(contactEnquiries)
      .set({ status })
      .where(eq(contactEnquiries.id, Number(id)))
      .returning();

    return NextResponse.json({ success: true, data: updated });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to update status';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
