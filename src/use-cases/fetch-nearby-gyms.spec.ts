import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Gym 01',
      description: 'Gym 01',
      phone: '123456789',
      latitude: -23.55052,
      longitude: -46.6333083,
    })

    await gymsRepository.create({
      title: 'Gym 02',
      description: 'Gym 02',
      phone: '123456789',
      latitude: -23.55052,
      longitude: -46.6333083,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.55052,
      userLongitude: -46.6333083,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Gym 01',
      }),
      expect.objectContaining({
        title: 'Gym 02',
      }),
    ])
  })
})
