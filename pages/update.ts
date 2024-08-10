import type { SessionRequest } from "../session";
import { getGameData, setGameData, TIME_MULTIPLIER } from "../util";

export async function get(req: SessionRequest) {
  const data = await getGameData(req)

  if (data.breeding) {
    data.breeding.elapsed = Date.now() - data.breeding.startedAt + (data.breeding.fed ? data.breeding.item.time * TIME_MULTIPLIER / 2 : 0)
    if (!data.breeding.fed) {
      data.breeding.elapsed = Math.min(data.breeding.elapsed, data.breeding.item.time * TIME_MULTIPLIER / 2)
    }
  }

  if (data.planting) {
    data.planting.elapsed = Date.now() - data.planting.startedAt + (data.planting.watered ? data.planting.item.time * TIME_MULTIPLIER / 2 : 0)
    if (!data.planting.watered) {
      data.planting.elapsed = Math.min(data.planting.elapsed, data.planting.item.time * TIME_MULTIPLIER / 2)
    }
  }

  if (data.crafting) {
    data.crafting.elapsed = Date.now() - data.crafting.startedAt
  }

  await setGameData(req, data)
  data.lastUpdate = Date.now()
  return new Response(JSON.stringify(data), { headers: { 'content-type': 'application/json' } })
}
