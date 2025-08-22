import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'
import { expect, describe, it, beforeEach } from 'vitest'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })
  it('should be able to search gyms', async () => {
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
      query: 'Gym',
      page: 1,
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

  it('should be able to paginate gyms search results', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Gym ${i}`,
        description: `Gym ${i}`,
        phone: '123456789',
        latitude: -23.55052,
        longitude: -46.6333083,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Gym 21',
      }),
      expect.objectContaining({
        title: 'Gym 22',
      }),
    ])
  })
})
