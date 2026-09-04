import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/src';
import { teamMembers } from '@/app/src/db/schemaExports';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, role, qualifications, shortBio, fullBio, yearsExperience, registrationInfo, featured, published } = body;

    if (!name || !slug || !role || !qualifications) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const [created] = await db
      .insert(teamMembers)
      .values({
        name,
        slug,
        role,
        qualifications,
        shortBio: shortBio || '',
        fullBio: fullBio || '',
        yearsExperience: Number(yearsExperience) || 5,
        registrationInfo: registrationInfo || '',
        featured: Boolean(featured),
        published: published !== undefined ? Boolean(published) : true,
      })
      .returning();

    return NextResponse.json({ success: true, data: created });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to create team member';
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
      .update(teamMembers)
      .set(updates)
      .where(eq(teamMembers.id, Number(id)))
      .returning();

    return NextResponse.json({ success: true, data: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update team member';
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

    await db.delete(teamMembers).where(eq(teamMembers.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to delete team member';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
