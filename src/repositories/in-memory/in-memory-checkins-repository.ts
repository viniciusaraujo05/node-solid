import { CheckIn, Prisma } from '@prisma/client'
import { CheckInRepository } from '@/repositories/check-in-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInRepository {
  public items: CheckIn[] = []

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.items.find((checkIn) => checkIn.id === id)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
      createdAt: new Date(),
      user_id: data.user_id,
      gym_id: data.gym_id,
    }
    this.items.push(checkIn)
    return checkIn
  }

  async findUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfToday = dayjs(date).startOf('day').toDate()
    const endOfToday = dayjs(date).endOf('day').toDate()

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.createdAt)
      // Inclusive boundary check: include exactly start and end of day
      const isOnSameDate =
        (checkInDate.isAfter(startOfToday) ||
          checkInDate.isSame(startOfToday)) &&
        (checkInDate.isBefore(endOfToday) || checkInDate.isSame(endOfToday))
      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    return this.items
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async countByUserId(userId: string): Promise<number> {
    return this.items.filter((checkIn) => checkIn.user_id === userId).length
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)
    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }
    return checkIn
  }
}
