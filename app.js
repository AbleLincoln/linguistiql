import express from 'express'
import { getStats } from './octo.js'

const app = express()

const port = 3000

app.get('/', getStats)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
