import { describe, it, expect, beforeEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CheckInUseCase } from './check-in'

let checkInRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'Gym 01',
      description: 'Gym 01',
      phone: '123456789',
      latitude: -23.55052,
      longitude: -46.6333083,
    })
  })

  vi.useFakeTimers()

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2025, 8, 14))
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -23.55052,
      userLongitude: -46.6333083,
    })

    expect(checkIn.id).toEqual(expect.any(String))
    expect(checkIn.user_id).toEqual('user-01')
    expect(checkIn.gym_id).toEqual('gym-01')

    vi.useRealTimers()
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2025, 8, 14))
    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -23.55052,
      userLongitude: -46.6333083,
    })

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -23.55052,
        userLongitude: -46.6333083,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in on different days', async () => {
    vi.setSystemTime(new Date(2025, 8, 14))
    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -23.55052,
      userLongitude: -46.6333083,
    })

    vi.setSystemTime(new Date(2025, 8, 15))

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -23.55052,
      userLongitude: -46.6333083,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gyms', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Gym 02',
      description: 'Gym 02',
      phone: '123456789',
      latitude: -21.55052,
      longitude: -46.6333083,
    })

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-02',
        userLatitude: -23.55052,
        userLongitude: -46.6333083,
      }),
    ).rejects.toThrow('User is too far from the gym')
  })
})
