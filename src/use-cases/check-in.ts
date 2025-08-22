import { User, type CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/check-in-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInRepository: CheckInRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new Error('Gym not found')
    }

    const distanceInKm = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude, longitude: gym.longitude },
    )

    const MAX_DISTANCE_IN_KM = 0.1

    if (distanceInKm > MAX_DISTANCE_IN_KM) {
      throw new Error('User is too far from the gym')
    }

    const checkInOnDate = await this.checkInRepository.findUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnDate) {
      throw new Error('User has already checked in today')
    }

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}
