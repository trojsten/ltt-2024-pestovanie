import { allItems } from "../../data";
import type { SessionRequest } from "../../session";
import { renderPage } from "../../util";

function items() {
  return (
    <ul className="flex">
      {allItems.filter(e => e.type == 'plant').map((item) => (
        <li key={item.name}>
          <img src={item.image.length != 0 ? item.image : "/static/sprites/" + item.name + ".png"} alt={item.name} className="rounded-lg border-4 border-yellow-700 h-14 w-14" />
        </li>
      ))}
    </ul>
  )
}

export async function get(req: SessionRequest) {
  return renderPage(items())
}

