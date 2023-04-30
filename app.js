import './config.js'
import express from 'express'
import cors from 'cors'
import { getStats } from './octo.js'

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.send('Why hello there 🌻')
})

app.get('/stats', getStats)

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
