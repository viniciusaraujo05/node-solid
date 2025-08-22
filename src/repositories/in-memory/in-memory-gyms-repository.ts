import { Gym, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { GymsRepository } from '../gyms-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: (data.description as string | null | undefined) ?? '',
      phone: (data.phone as string | null | undefined) ?? null,
      latitude: data.latitude,
      longitude: data.longitude,
    }

    this.items.push(gym)

    return gym
  }

  async findMany(query: string, page: number): Promise<Gym[]> {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findManyNearby({
    userLatitude,
    userLongitude,
  }: {
    userLatitude: number
    userLongitude: number
  }): Promise<Gym[]> {
    // Consider gyms within ~10km as "nearby" for in-memory implementation
    const MAX_DISTANCE_KM = 10

    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: userLatitude, longitude: userLongitude },
        { latitude: item.latitude, longitude: item.longitude },
      )
      return distance <= MAX_DISTANCE_KM
    })
  }
}
