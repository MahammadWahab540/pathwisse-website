import { rawDb, allowedOrigin, smallJson } from '../../../db/raw';

export async function POST(request: Request) {
  if (!allowedOrigin(request)) {
    return Response.json({ error: 'Request origin is not allowed.' }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await smallJson(request);
  } catch {
    return Response.json({ error: 'Invalid payload.' }, { status: 400 });
  }

  const {
    id = `audit_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    userId = '',
    email = '',
    answers = {},
    recommendedRole = 'analytics',
    readinessScore = 0,
  } = body;

  if (!recommendedRole) {
    return Response.json({ error: 'Missing recommendedRole' }, { status: 400 });
  }

  try {
    const db = rawDb();
    await db.prepare(
      `INSERT INTO career_audits (id, user_id, email, answers, recommended_role, readiness_score)
       VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         answers = excluded.answers,
         recommended_role = excluded.recommended_role,
         readiness_score = excluded.readiness_score,
         updated_at = CURRENT_TIMESTAMP`
    ).bind(
      String(id),
      String(userId),
      String(email),
      JSON.stringify(answers),
      String(recommendedRole),
      Number(readinessScore)
    ).run();

    return Response.json({ ok: true, id }, { status: 201, headers: { 'Cache-Control': 'no-store' } });
  } catch (err) {
    console.error('Career audit storage error:', err);
    return Response.json({ error: 'Could not save career audit result.' }, { status: 503 });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return Response.json({ error: 'Missing id query parameter.' }, { status: 400 });
  }

  try {
    const db = rawDb();
    const row = await db.prepare(
      'SELECT id, user_id, email, answers, recommended_role, readiness_score, created_at, updated_at FROM career_audits WHERE id = ?'
    ).bind(id).first<Record<string, unknown>>();

    if (!row) {
      return Response.json({ error: 'Career audit not found.' }, { status: 404 });
    }

    return Response.json({
      audit: {
        ...row,
        answers: JSON.parse((row.answers as string) || '{}'),
      },
    }, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return Response.json({ error: 'Could not fetch career audit.' }, { status: 503 });
  }
}
