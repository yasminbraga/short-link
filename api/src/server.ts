import express from 'express'
import { connect } from 'mongoose'
import cors from 'cors'

import routes from './routes'

connect("mongodb://localhost:27017/short-link", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err) {
    console.log(err)
  }
})

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routes)

app.listen(3333, () => {
  console.log("Server is running at http://localhost:3000")
})