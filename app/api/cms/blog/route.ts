import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/src';
import { blogPosts } from '@/app/src/db/schemaExports';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, excerpt, content, author, category, published, featured } = body;

    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const [created] = await db
      .insert(blogPosts)
      .values({
        title,
        slug,
        excerpt,
        content,
        author: author || 'Pearl Dental Clinical Team',
        category: category || 'Dental Advice',
        published: published !== undefined ? Boolean(published) : true,
        featured: Boolean(featured),
      })
      .returning();

    return NextResponse.json({ success: true, data: created });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to create blog post';
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
      .update(blogPosts)
      .set(updates)
      .where(eq(blogPosts.id, Number(id)))
      .returning();

    return NextResponse.json({ success: true, data: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update blog post';
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

    await db.delete(blogPosts).where(eq(blogPosts.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to delete blog post';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
