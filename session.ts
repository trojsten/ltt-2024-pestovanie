import { db } from "./util"

interface Session {
  id?: string
  user: string
}

const sessionStore = new Map<string, Session>()

export function loadSessions() {
  db.keys('session:*').then(async (keys) => {
    console.log(keys)
    for (const key of keys) {
      const sess = await db.get(key)
      if (sess) {
        sessionStore.set(key.slice(8), JSON.parse(sess))
      }
    }
  })
}

export class SessionRequest extends Request {
  session?: Session
  sessionValid = true
  parsedUrl: URL
  ip!: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jsonBody: any
  constructor(
    request: Request,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public data: FormData | any | undefined,
    public params: Record<string, string>
  ) {
    super(request)

    const s = this.headers.get('Cookie')?.split('session=')
    const sessId = s && s.length > 1 ? s[1] : undefined
    if (sessId) {
      this.session = sessionStore.get(sessId)
    }
    if (!this.session) {
      this.sessionValid = false
    }
    this.parsedUrl = new URL(request.url)
  }

  async clearSession() {
    if (this.session && this.session.id) {
      sessionStore.delete(this.session.id)
      await db.del('session:' + this.session.id)
    }
    this.session = undefined
  }
}

export async function setSession(res: Response, session: Session | undefined): Response {
  if (session == undefined) {
    res.headers.append(
      'Set-Cookie',
      `session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    )
    return res
  }

  if (!session.id) {
    session.id = Math.random().toString(36).slice(2)
  }
  sessionStore.set(session.id, session)
  await db.set('session:' + session.id, JSON.stringify(session))

  res.headers.append('Set-Cookie', `session=${session.id}; Path=/`)

  return res
}
