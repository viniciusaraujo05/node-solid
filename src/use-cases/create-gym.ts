import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { GymsRepository } from '@/repositories/gyms-repository'
import { type Gym } from '@prisma/client'

interface CreateGymUseCaseParams {
  title: string
  description: string
  phone: string
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseParams): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
