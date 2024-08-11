import type { GameData, Item } from "../data";
import type { SessionRequest } from "../session";
import { getGameData, renderPage } from "../util";

function mainPage(data: GameData) {
  return (
    <div>
      <header className="flex bg-yellow-700 text-gray-200 p-2 justify-between">
        <form method="post" action="/logout">
          <button type="submit">
            <img src="/static/logout.png" alt="logout" className="w-8 h-8" />
          </button>
        </form>
        <h1 className="mt-0 text-xl">Pestovanie</h1>
        <button id="inventory-btn">
          <img src="/static/inventory.png" alt="inventory" className="w-8 h-8" />
        </button>
      </header>
      <section className="flex">
        <div className="w-1/3 aspect-square">
          <div className="rounded-xl m-4 bg-yellow-900 overflow-hidden shadow-xl flex flex-col justify-between">
            <h3 className="text-lg text-center mb-1">Pole</h3>
            {itemDisplay(data.planting?.item, data.planting?.item?.type ?? 'plant')}
            <button id="water-btn" className="rounded-b-lg bg-blue-700 p-2 m-3 mt-0 disabled:bg-opacity-50">Poliať</button>
          </div>
        </div>
        <div className="rounded-xl w-1/3 aspect-square">
          <div className="rounded-xl m-4 bg-yellow-900 overflow-hidden shadow-xl flex flex-col justify-between">
            <h3 className="text-lg text-center mb-1">Chov</h3>
            {itemDisplay(data.breeding?.item, data.breeding?.item?.type ?? 'animal')}
            <button id="feed-btn" className="rounded-b-lg bg-green-700 p-2 m-3 mt-0 disabled:bg-opacity-50">Nakrmiť</button>
          </div>
        </div>
        <div className="rounded-xl w-1/3 aspect-square">
          <div className="rounded-xl m-4 bg-yellow-900 overflow-hidden shadow-xl flex flex-col justify-between">
            <h3 className="text-lg text-center">Sklad</h3>
            {itemDisplay(data.crafting?.item, data.crafting?.item?.type ?? 'craft')}
            <button id="make-btn" className="rounded-b-lg bg-gray-700 p-2 m-3 mt-0 disabled:bg-opacity-50">Vyrobiť</button>
          </div>
        </div>
      </section>
      <div id="overlay" className="fixed h-screen w-screen top-0 opacity-70 bg-black pointer-events-none transition-all hidden"></div>
      <section className="fixed h-screen w-screen top-0 p-8 transition-all hidden" id="window">
        <div className="border-4 rounded-2xl border-yellow-800 p-2 bg-yellow-950 shadow-2xl overflow-hidden modal relative flex flex-col">
          <div className="flex justify-between">
            <h2 className="text-2xl" id="modal-header">Inventory</h2>
            <button id="close">
              <img src="/static/close.svg" alt="close" className="w-8 h-8" />
            </button>
          </div>
          <hr className="my-1" />
          <div id="modal-content" className="overflow-y-scroll overflow-x-hidden h-full">
          </div>
        </div>
      </section>
    </div>
  )
}


function itemDisplay(item: Item | undefined, type: 'animal' | 'plant' | 'craft') {
  let id = 'craft-btn'
  if (type == 'animal') {
    id = 'breed-btn'
  } else if (type == 'craft') {
    id = 'craft-btn'
  } else if (type == 'plant') {
    id = 'plant-btn'
  }

  const noneMsg = {
    'animal': 'Žiadne zviera',
    'plant': 'Žiadna rastlina',
    'craft': 'Žiadny predmet'
  }
  const color = item?.final ? "item-final" : "item"

  return (
    <div className="mx-3 rounded-t-lg aspect-square grid" id={id}>
      <img src="/static/sprites/farm.png" alt="empty" className="w-full h-full row-end-1 col-end-1 row-start-1 col-start-1" />
      {item ? (
        <div className={"rounded-xl w-full h-full aspect-square flex row-end-1 row-start-1 col-end-1 col-start-1 justify-center items-center " + color}>
          <img src={item.image != "" ? item.image : '/static/sprites/' + item.name + '.png'} alt={item.name} className={"p-2 w-full pixelated " + color} />
        </div>
      ) : <p className="text-lg row-end-1 col-end-1 row-start-1 col-start-1 place-self-center">{noneMsg[type]}</p>}
    </div>
  )
}

export function ItemHTML(item: Item, showTime = true) {
  const color = item.final ? "item-final" : "item"
  return (
    <div className="rounded-xl w-full h-full aspect-square z-10 relative">
      <img src={item.image != "" ? item.image : '/static/sprites/' + item.name + '.png'} alt={item.name} className={"p-2 w-full pixelated " + color} />
      {showTime ? <span className="absolute bottom-2 right-2 bg-yellow-800 text-gray-200 p-1 rounded text-xs">{item.time}h</span> : null}
    </div>
  )
}

export async function get(req: SessionRequest) {
  const data = await getGameData(req)
  return renderPage(mainPage(data))
}
