import { allItems } from "../../data"
import { SessionRequest } from "../../session"
import { getGameData, setGameData } from "../../util"


export async function post(req: SessionRequest) {
  const data = await getGameData(req)

  let itemName = req.data.get("item")
  let type = req.params.type
  if (itemName == undefined) return new Response(JSON.stringify({ msg: 'item null' }))
  console.log(itemName, type)
  let item = allItems.find((e) => e.name == itemName)
  if (!item || item!.type != type) return new Response(JSON.stringify({ msg: 'wrong type' }))
  if (type == "craft" && item?.requirements.every((e) => data.inventory.find(f => f.name == e) != undefined)) {
    data.crafting = {
      item: item,
      elapsed: 0,
      startedAt: Date.now()
    }
    item.requirements.forEach((e) => {
      let index = data.inventory.findIndex(f => f.name == e)
      data.inventory.splice(index, 1)
    })
  } else if (type == "plant") {
    data.planting = {
      item: item,
      elapsed: 0,
      watered: false,
      startedAt: Date.now()
    }
  } else if (type == "animal") {
    data.breeding = {
      item: item,
      elapsed: 0,
      fed: false,
      startedAt: Date.now()
    }
  } else {
    return new Response(JSON.stringify({ msg: 'requirements not met' }))
  }

  await setGameData(req, data)
  return new Response(JSON.stringify({ msg: 'ok' }))
}
