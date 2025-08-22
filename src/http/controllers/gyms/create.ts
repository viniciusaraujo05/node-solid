import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gyms-use-case'

export async function createGym(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    phone: z.string(),
    latitude: z.number().refine((value) => value >= -90 && value <= 90),
    longitude: z.number().refine((value) => value >= -180 && value <= 180),
  })

  const { title, description, phone, latitude, longitude } =
    createGymBodySchema.parse(request.body)

  try {
    const createGymUseCase = makeCreateGymUseCase()
    await createGymUseCase.execute({
      title,
      description,
      phone,
      latitude,
      longitude,
    })
  } catch (error) {
    return reply.status(409).send({ message: error })
  }

  return reply.status(201).send()
}
