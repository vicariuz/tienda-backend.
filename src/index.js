import express from 'express'
import cors from 'cors'
import * as routes from './server/routes/index.js'
import {tracker} from './server/middlewares/router.middlewares.js'

const PORT = process.env.PORT ?? 3000
const app = express ()

app.use(cors())
app.use(express.json())

app.use(tracker)

app.use(routes.usuarios)
app.use(routes.errors)

app.listen(PORT, ()=> console.log(`SERVER UP in URL: http://localhost:${PORT}`))

export default app;