import { Router, Request, Response } from 'express'
import { nanoid } from 'nanoid'
import Link from './models/LinkSchema'

import { APP_URL } from './utils'

const routes = Router()

routes.get('/', (req: Request, res: Response) => {
  return res.json({'ok': true})
})

routes.post('/links', async (req: Request, res: Response) => {
  const { url } = req.body
  let slug = nanoid(6)

  let existentLink = await Link.findOne({ slug })

  while(existentLink) {
    slug = nanoid(6)
    existentLink = await Link.findOne({ slug })
  }

  try {
    await Link.create({ url, slug})
    return res.json( {url: `${APP_URL}/${slug}`})
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: error.message })
  }
})

routes.get('/links/:slug', async (req: Request, res: Response) => {
  const { slug } = req.params
  
  try {
    const link = await Link.findOne({ slug })
    if (!link) {
      return res.status(404).json({error: "Esse link não existe"})
    }
    return res.json({
      link: link.toJSON()
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: error.message })
  }


})

export default routes