import { FastifyRequest, FastifyReply } from 'fastify'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-checkins-use-case'
import { z } from 'zod'

export async function validateCheckIn(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const validateCheckInUseCase = makeValidateCheckInUseCase()

  const validateCheckInParamsSchema = z.object({
    checkInId: z.string(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
