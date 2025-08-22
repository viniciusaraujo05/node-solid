import { GetUserMetricsUseCase } from '@/use-cases/get-users-metrics'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserMetricsUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const checkInsRepository = new PrismaCheckInsRepository()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository)

  return getUserMetricsUseCase
}
