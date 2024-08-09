import type { SessionRequest } from "../session";
import { renderPage } from "../util";

function mainPage() {
  return (
    <div>
      <h1 className="mt-0">Pestovanie</h1>
    </div>
  )
}


export async function get(req: SessionRequest) {
  return renderPage(mainPage(), req)
}

export async function post(req: SessionRequest) {
}
