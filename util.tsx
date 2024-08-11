import { renderToReadableStream } from 'react-dom/server'
import { loadSessions, type SessionRequest } from "./session"
import { createClient } from 'redis'
import { getInitialGameData, type GameData } from './data'


async function initDB() {
  console.log(process.env.REDIS_URL)
  const client = createClient({
    url: process.env.REDIS_URL
  })
  client.on('error', (err) => {
    console.error(err)
  })

  await client.connect()
  return client
}


export const db = await initDB()
loadSessions()

export async function renderPage(
  content: JSX.Element,
  full = true,
  status: number = 200
) {
  let page = content
  if (full) {
    page = await getWrapper(content)
  }
  const stream = await renderToReadableStream(page)
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/html'
    },
    status
  })
}

export async function getWrapper(content: JSX.Element) {
  return (
    <html>
      <head>
        <title>Pestovanie</title>
        <link rel="stylesheet" href="/static/main.css" />
        <link href="https://fonts.googleapis.com/css2?family=Playpen+Sans:wght@100..800&family=Ubuntu&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </head>
      <body className='p-0 m-0 bg-yellow-950 h-screen overflow-hidden text-yellow-50'>
        {content}
        <script src="/static/client.js"></script>
      </body>
    </html>
  )
}

export async function getGameData(req: SessionRequest) {
  if (!req.session) throw new Error('No session')
  const user = req.session.user
  return JSON.parse(await db.get(`game:${user}`) || JSON.stringify(getInitialGameData())) as GameData
}

export async function setGameData(req: SessionRequest, data: GameData) {
  if (!req.session) throw new Error('No session')
  const user = req.session.user
  await db.set(`game:${user}`, JSON.stringify(data))
}


export const TIME_MULTIPLIER = 1000 * 60 * 60
