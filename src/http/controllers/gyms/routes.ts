import { FastifyInstance } from 'fastify'
import { createGym } from '@/http/controllers/gyms/create'
import { searchGyms } from '@/http/controllers/gyms/search'
import { nearbyGyms } from '@/http/controllers/gyms/nearby'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/nearby', nearbyGyms)
  app.get('/gyms', searchGyms)
  app.post('/gyms', createGym)
}
