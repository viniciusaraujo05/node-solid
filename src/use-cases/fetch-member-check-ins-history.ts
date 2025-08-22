import { type CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/check-in-repository'

interface FetchMemberCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchMemberCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchMemberCheckInsHistoryUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
    page,
  }: FetchMemberCheckInsHistoryUseCaseRequest): Promise<FetchMemberCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

    return {
      checkIns,
    }
  }
}
