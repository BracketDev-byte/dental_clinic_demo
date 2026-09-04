import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/src';
import { appointmentRequests } from '@/app/src/db/schemaExports';
import { appointmentSchema } from '@/app/lib/validations';
import { desc, eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = appointmentSchema.parse(body);

    const [newRecord] = await db
      .insert(appointmentRequests)
      .values({
        fullName: validated.fullName,
        phone: validated.phone,
        email: validated.email || '',
        preferredContact: validated.preferredContact,
        service: validated.service,
        preferredDate: validated.preferredDate || '',
        preferredTime: validated.preferredTime || 'Morning (9:00 AM - 12:00 PM)',
        patientType: validated.patientType,
        message: validated.message || '',
        status: 'new',
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: 'Your appointment request has been received. Our team will contact you shortly.',
      data: newRecord,
    });
  } catch (err: unknown) {
    console.error('Error submitting appointment request:', err);
    const errorMessage = err instanceof Error ? err.message : 'Invalid request data';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}

export async function GET() {
  try {
    const records = await db
      .select()
      .from(appointmentRequests)
      .orderBy(desc(appointmentRequests.createdAt));
    return NextResponse.json({ success: true, data: records });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to fetch appointments';
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
      .update(appointmentRequests)
      .set({ status })
      .where(eq(appointmentRequests.id, Number(id)))
      .returning();

    return NextResponse.json({ success: true, data: updated });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to update status';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
