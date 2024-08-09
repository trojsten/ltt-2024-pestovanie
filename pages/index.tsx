import type { SessionRequest } from "../session";
import { renderPage } from "../util";

function mainPage() {
  return (
    <div>
      <header className="flex bg-yellow-700 text-gray-200 p-2 justify-between">
        <form method="post" action="/logout">
          <button type="submit">logout</button>
        </form>
        <h1 className="mt-0 text-xl">Pestovanie</h1>
        <button id="inventory-btn">inventory</button>
      </header>
      <section className="flex">
        <div className="w-1/3 aspect-square">
          <div className="rounded-xl m-4 bg-yellow-900 overflow-hidden shadow-xl flex flex-col justify-between">
            <h3 className="text-lg text-center mb-1">Pole</h3>
            <img src="/" className="mx-3 rounded-t-lg aspect-square" id="plant-btn" />
            <button className="rounded-b-lg bg-blue-700 p-2 m-3 mt-0">Poliať</button>
          </div>
        </div>
        <div className="rounded-xl w-1/3 aspect-square">
          <div className="rounded-xl m-4 bg-yellow-900 overflow-hidden shadow-xl flex flex-col justify-between">
            <h3 className="text-lg text-center mb-1">Chov</h3>
            <img src="/" className="mx-3 rounded-t-lg aspect-square" id="" />
            <button className="rounded-b-lg bg-green-700 p-2 m-3 mt-0">Nakřmiť</button>
          </div>
        </div>
        <div className="rounded-xl w-1/3 aspect-square">
          <div className="rounded-xl m-4 bg-yellow-900 overflow-hidden shadow-xl flex flex-col justify-between">
            <h3 className="text-lg text-center">Sklad</h3>
            <img src="/" className="m-2 rounded-lg aspect-square" id="craft-btn" />
            <button>harvest</button>
          </div>
        </div>
      </section>
      <div id="overlay" className="fixed h-screen w-screen top-0 opacity-70 bg-black pointer-events-none transition-all hidden"></div>
      <section className="fixed h-screen w-screen top-0 p-8 transition-all hidden" id="window">
        <div className="border-4 rounded-2xl border-yellow-800 p-2 bg-yellow-950 shadow-2xl">
          <div className="flex justify-between">
            <h2 className="text-2xl" id="modal-header">Inventory</h2>
            <button id="close">close</button>
          </div>
          <hr className="my-1" />
          <div id="modal-content">
          </div>
        </div>
      </section>
    </div>
  )
}


export async function get(req: SessionRequest) {
  return renderPage(mainPage())
}

export async function post(req: SessionRequest) {
}
