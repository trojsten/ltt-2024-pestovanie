import { setSession, type SessionRequest } from "../session";
import { renderPage } from "../util";


function loginPage(error: string = "") {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="border-4 rounded-2xl border-yellow-800 p-4">
        <h1 className="text-center text-2xl mb-2 ">Družinka</h1>
        <form method="post" className="flex flex-col">
          <input type="text" name="user" className="border-4 rounded-2xl border-yellow-800 p-2 text-black" />
          <button className="rounded-md p-2 bg-yellow-600">Začať</button>
        </form>
        <p className="text-red-500">{error}</p>
      </div>
    </div>
  )
}


export async function get() {
  return renderPage(loginPage())
}

export async function post(req: SessionRequest) {
  const user = req.data.get("user")

  const backUrl = req.parsedUrl.searchParams.get("redirect")

  if (!users.includes(user))
    return renderPage(loginPage("Zlé meno"))

  if (backUrl)
    return setSession(Response.redirect(decodeURIComponent(backUrl)), { user: user })
  else
    return setSession(Response.redirect("/"), { user: user })
}

const users = [
  'test',
  'test2',
  'test3'
]
