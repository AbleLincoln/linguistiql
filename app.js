import express from 'express'
import cors from 'cors'
import { getStats } from './octo.js'

const app = express()

app.use(cors())

app.get('/', getStats)

const port = 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
