import type { SessionRequest } from "../../session";
import { getGameData, TIME_MULTIPLIER, setGameData } from "../../util";


export async function post(req: SessionRequest) {
  const data = await getGameData(req)
  const type = req.params.type
  switch (type) {
    case "plant":
      if (!data.planting)
        return new Response("No plant to water", { status: 400 })
      if (!data.planting?.watered && data.planting.elapsed >= data.planting.item.time * TIME_MULTIPLIER / 2) {
        data.planting.watered = true
        data.planting.startedAt = Date.now()
      }
      break;
    case "animal":
      if (!data.breeding)
        return new Response("No plant to water", { status: 400 })
      if (!data.breeding?.fed && data.breeding.elapsed >= data.breeding.item.time * TIME_MULTIPLIER / 2) {
        data.breeding.fed = true
        data.breeding.startedAt = Date.now()
      }
      break;
    default:
      break;
  }
  await setGameData(req, data)
  return new Response(JSON.stringify(data), { status: 200 })
}
