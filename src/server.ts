import { app } from '@/app'
import env from '@/env'

app
  .listen({
    port: Number(env.PORT),
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('😊 HTTP server running on http://localhost:3333')
  })
