import { renderToReadableStream } from 'react-dom/server'
import type { SessionRequest } from "./session"

export async function renderPage(
  content: JSX.Element,
  req: SessionRequest,
  status: number = 200
) {
  const page = await getWrapper(content, req)
  const stream = await renderToReadableStream(page)
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/html'
    },
    status
  })
}

export async function getWrapper(content: JSX.Element, req: SessionRequest) {
  return (
    <html>
      <head>
        <title>Pestovanie</title>
      </head>
      <body>
        <div id="app" className='m-2'>{content}</div>
        <script src="/client.js"></script>
      </body>
    </html>
  )
}
