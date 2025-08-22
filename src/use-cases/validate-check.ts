import { type CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/check-in-repository'
import dayjs from 'dayjs'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new Error('Check-in not found')
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.createdAt,
      'minute',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new Error('Check-in is not validatable')
    }

    checkIn.validatedAt = new Date()

    await this.checkInRepository.save(checkIn)

    return { checkIn }
  }
}
