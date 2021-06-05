// eslint-disable-next-line @typescript-eslint/no-var-requires
// const { startServer } = require('polyserve')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const liveServer = require('live-server')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { join } = require('path')

;(async () => {
  // const server = await startServer({
  //   root: join(process.cwd(), 'dist_docs'),
  // })
  // console.info(
  //   `http://localhost:${(server.address() as any).port}/components/ld-label/`
  // )

  const params = {
    port: 0,
    root: join(process.cwd(), 'dist_docs'), // Set root directory that's being served. Defaults to cwd.
    open: false, // When false, it won't load your browser by default.
    ignore: '*',
  }
  const server = await liveServer.start(params)
  console.info('server', server.address().port)
})()
// eslint-disable-next-line @typescript-eslint/no-empty-function
setInterval(() => {}, 99999)
