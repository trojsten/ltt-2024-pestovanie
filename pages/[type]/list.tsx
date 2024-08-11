import { ItemHTML } from "..";
import { allItems, type GameData, type Item } from "../../data";
import type { SessionRequest } from "../../session";
import { getGameData, renderPage } from "../../util";


function recipeHTML(item: Item, data: GameData) {
  const isAvailable = item.requirements.every((requirement) => {
    return data.inventory.find(e => e.name == requirement) != undefined
  })
  return (
    <div id={'item-' + item.name} className={"grid grid-cols-7 rounded-md bg-yellow-700 items-center p-2 w-full mb-2 item-slots " + (isAvailable ? "" : "opacity-30")}>
      {item.requirements.map((requirement) => {
        const requirementItem = allItems.find(e => e.name == requirement)
        return <div className="w-24 h-24 ml-2">{ItemHTML(requirementItem!, false)}</div>
      })}
      <div className="w-24 h-24 flex flex-col shrink items-center justify-center text-3xl col-start-6">
        <span className="text-sm">{item.time}h</span>
        <span>→</span>
      </div>
      <div className="w-24 h-24 col-start-7">{ItemHTML(item, false)}</div>
    </div>
  )
}


async function items(req: SessionRequest) {
  const filtered = allItems.filter(e => e.type == req.params.type)
  const data = await getGameData(req)
  if (req.params.type == 'craft') {
    return (
      <ul className="flex flex-col">
        {filtered.map((item) => {
          return recipeHTML(item, data)
        })}
      </ul>
    )
  }
  return (
    <ul className="flex flex-wrap justify-between items-center">
      {filtered.map((item) =>
        <li key={item.name} className="item-slots m-1 w-24 h-24" id={'item-' + item.name}>
          {ItemHTML(item)}
        </li>
      )}
    </ul>
  )
}

export async function get(req: SessionRequest) {
  console.log('list')
  return renderPage(await items(req), false)
}
