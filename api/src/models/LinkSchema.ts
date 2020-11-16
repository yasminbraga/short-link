import {Schema, model}from 'mongoose'

const LinkSchema = new Schema({
  url: String,
  slug: {
    type: String,
    unique: true,
  }
})

export default model("Link", LinkSchema)