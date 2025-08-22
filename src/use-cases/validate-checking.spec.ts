import { describe, it, expect, beforeEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { ValidateCheckInUseCase } from '@/use-cases/validate-check'
import { CheckInRepository } from '@/repositories/check-in-repository'

let checkInRepository: CheckInRepository
let sut: ValidateCheckInUseCase

beforeEach(() => {
  checkInRepository = new InMemoryCheckInsRepository()
  sut = new ValidateCheckInUseCase(checkInRepository)
  vi.useFakeTimers()
})
describe('Validate Check-in Use Case', () => {
  it('should be able to validate check-in', async () => {
    const checkIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn: validatedCheckIn } = await sut.execute({
      checkInId: checkIn.id,
    })

    expect(validatedCheckIn.validatedAt).toEqual(expect.any(Date))
    expect(validatedCheckIn).toEqual(checkIn)
  })

  it('should not be able to validate check-in that does not exist', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'non-existing-check-in-id',
      }),
    ).rejects.toThrow('Check-in not found')
  })

  it('should not be able validate check-in after 20 minutes of the check-in', async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 12, 0))
    const checkIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    vi.advanceTimersByTime(1000 * 60 * 21)

    await expect(() =>
      sut.execute({
        checkInId: checkIn.id,
      }),
    ).rejects.toThrow('Check-in is not validatable')
  })
})
