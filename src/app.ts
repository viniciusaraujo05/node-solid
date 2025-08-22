import fastify from 'fastify'
import { usersRoutes } from '@/http/controllers/users/routes'
import { gymsRoutes } from '@/http/controllers/gyms/routes'
import { ZodError } from 'zod'
import { fastifyJwt } from '@fastify/jwt'
import env from '@/env'
import { checkInsRoutes } from '@/http/controllers/check-ins/routes'
import { fastifyCookie } from '@fastify/cookie'

export const app = fastify()

app.register(fastifyCookie, {
  secret: env.JWT_SECRET,
})
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: true,
  },
  sign: {
    expiresIn: '10 minutes',
  },
})

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: error.format() })
  }

  console.error(error)

  return reply.status(500).send({ message: '😂 deu ruim bro kkkkkk' })
})
