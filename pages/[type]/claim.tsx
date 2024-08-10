import type { SessionRequest } from "../../session";
import { getGameData, setGameData, TIME_MULTIPLIER } from "../../util";


export async function post(req: SessionRequest) {
  const type = req.params.type;
  const data = await getGameData(req)
  try {

    if (type == 'plant') {
      if (!data.planting)
        throw new Error('You are not planting anything right now')
      if (data.planting.elapsed < data.planting.item.time * TIME_MULTIPLIER)
        throw new Error('You have not finished planting yet')
      data.inventory.push(data.planting.item)
      data.planting = undefined

    } else if (type == 'animal') {
      if (!data.breeding)
        throw new Error('You are not breeding anything right now')
      if (data.breeding.elapsed < data.breeding.item.time * TIME_MULTIPLIER)
        throw new Error('You have not finished breeding yet')
      data.inventory.push(data.breeding.item)
      data.breeding = undefined
    } else if (type == 'craft') {
      if (!data.crafting)
        throw new Error('You are not crafting anything right now')
      if (data.crafting.elapsed < data.crafting.item.time * TIME_MULTIPLIER)
        throw new Error('You have not finished crafting yet')
      data.inventory.push(data.crafting.item)
      data.breeding = undefined
    }

    await setGameData(req, data)
    return new Response(JSON.stringify({ msg: 'ok' }), { status: 200 })
  } catch (e: unknown) {
    return new Response(JSON.stringify({ msg: (e as Error).message }), { status: 400 })
  }


}
