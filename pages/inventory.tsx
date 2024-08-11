import { allItems } from "../data";
import type { SessionRequest } from "../session";
import { renderPage } from "../util";
import type { GameData } from "../data";
import { getGameData } from "../util";
import { ItemHTML } from ".";

function items(data: GameData) {
  return (
    <ul className="flex flex-wrap justify-around overflow-y-auto items-center">
      {data.inventory.map((item) => (
        <li className="h-24 w-24">
          {ItemHTML(item, false)}
        </li>
      ))}
      {data.inventory.length == 0 ? <p className="my-3 text-red-500">Tvoj inventár je prázdny</p> : null}
    </ul>
  )
}

export async function get(req: SessionRequest) {
  const data = await getGameData(req)
  return renderPage(items(data))
}
