import { setSession, type SessionRequest } from "../session";

export async function post(req: SessionRequest) {
  await req.clearSession()

  return setSession(Response.redirect('/'), req.session)
}
