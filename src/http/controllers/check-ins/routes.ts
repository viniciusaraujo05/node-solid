import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { checkInHistory } from '@/http/controllers/check-ins/history'
import { checkInMetrics } from '@/http/controllers/check-ins/metrics'
import { createCheckIn } from '@/http/controllers/check-ins/create'
import { validateCheckIn } from '@/http/controllers/check-ins/validate'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', checkInHistory)
  app.get('/check-ins/metrics', checkInMetrics)

  app.post('/gyms/:gymId/check-ins', createCheckIn)
  app.patch('/check-ins/:checkInId/validate', validateCheckIn)
}
