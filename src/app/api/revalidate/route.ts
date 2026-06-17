import { revalidatePath } from 'next/cache';
import { type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret');
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  revalidatePath('/');
  return Response.json({ revalidated: true });
}
