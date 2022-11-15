const { createServer } = require('http')
const app = require('./app')

const PORT = process.env.port || 8000

const server = createServer(app)

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})
