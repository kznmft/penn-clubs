/* globals __dirname */
const PORT = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'

const path = require('path')
const express = require('express')
const { createServer } = require('http')
const next = require('next')
const routes = require('../routes')

const nextApp = next({ dev })
const handler = routes.getRequestHandler(nextApp)

if (process.env.MAINTENANCE) {
  const app = express()
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../static/maintenance.html'))
  })
  app.use('/static', express.static('static'))
  app.listen(
    PORT,
    () => console.log(`ready at http://localhost:${PORT} (maintenance mode)`) // eslint-disable-line
  )
} else {
  nextApp.prepare().then(() => {
    createServer(handler).listen(PORT, err => {
      if (err) throw err
      console.log(`ready at http://localhost:${PORT}`) // eslint-disable-line
    })
  })
}