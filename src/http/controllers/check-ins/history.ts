import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchMemberCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-checkins-history'
import { z } from 'zod'

export async function checkInHistory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const checkInHistoryUseCase = makeFetchMemberCheckInsHistoryUseCase()

  const { checkIns } = await checkInHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({ checkIns })
}
