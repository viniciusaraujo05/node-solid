import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchMemberCheckInsHistoryUseCase } from '@/use-cases/fetch-member-check-ins-history'

export function makeFetchMemberCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const fetchMemberCheckInsHistoryUseCase =
    new FetchMemberCheckInsHistoryUseCase(checkInsRepository)

  return fetchMemberCheckInsHistoryUseCase
}
