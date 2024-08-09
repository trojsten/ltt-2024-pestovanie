import { setSession, type SessionRequest } from "../session";

export async function post(req: SessionRequest) {
  req.clearSession()

  return setSession(Response.redirect('/'), req.session)
}
