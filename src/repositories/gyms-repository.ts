import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  userLatitude: number
  userLongitude: number
}

export interface GymsRepository {
  findById(id: string): Promise<Prisma.GymUncheckedCreateInput | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findMany(query: string, page: number): Promise<Gym[]>
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
}
