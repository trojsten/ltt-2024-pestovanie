import { ItemHTML } from "..";
import { allItems, type Item } from "../../data";
import type { SessionRequest } from "../../session";
import { renderPage } from "../../util";


function recipeHTML(item: Item) {
  return (
    <div className="flex justify-between rounded-md bg-yellow-700 items-center p-2 w-full mb-2">
      <div className="flex justify-start">
        {item.requirements.map((requirement) => {
          const requirementItem = allItems.find(e => e.name == requirement)

          return <div className="w-24 h-24 ml-2">{ItemHTML(requirementItem!)}</div>
        })}
      </div>
      <div className="w-24 h-24 flex items-center justify-center text-3xl">→</div>
      <div className="w-24 h-24">{ItemHTML(item)}</div>
    </div>
  )
}


function items(req: SessionRequest) {
  const filtered = allItems.filter(e => e.type == req.params.type)
  if (req.params.type == 'craft') {
    return (
      <ul className="flex flex-col">
        {filtered.map((item) => {
          return recipeHTML(item)
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
  return renderPage(items(req), false, 404)
}
