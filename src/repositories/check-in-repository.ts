import { Prisma, CheckIn } from '@prisma/client'

export interface CheckInRepository {
  findById(id: string): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  findUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  create(checkIn: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  countByUserId(userId: string): Promise<number>
  save(checkIn: CheckIn): Promise<CheckIn>
}
