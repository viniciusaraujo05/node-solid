import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-ins-use-case'
import { z } from 'zod'

export async function createCheckIn(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkInUseCase = makeCheckInUseCase()
  const createCheckInParamsSchema = z.object({
    gymId: z.string(),
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => value >= -90 && value <= 90),
    longitude: z.number().refine((value) => value >= -180 && value <= 180),
  })

  const { gymId } = createCheckInParamsSchema.parse(request.params)
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const checkIn = await checkInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send({ checkIn })
}
