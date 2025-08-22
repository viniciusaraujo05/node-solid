import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchMemberCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-checkins-history'

export async function checkInMetrics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkInMetricsUseCase = makeFetchMemberCheckInsHistoryUseCase()

  const metrics = await checkInMetricsUseCase.execute({
    userId: request.user.sub,
    page: 1,
  })

  return reply.status(200).send({ metrics })
}
