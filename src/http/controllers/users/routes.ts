import { FastifyInstance } from 'fastify'
import { register } from '@/http/controllers/users/register'
import { authenticateController } from '@/http/controllers/users/authenticate'
import { profileController } from '@/http/controllers/users/profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { refresh } from '@/http/controllers/users/refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticateController)
  app.post('/refresh', refresh)
  // /**Auth */
  app.get('/profile', { onRequest: verifyJWT }, profileController)
}
