import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

beforeEach(() => {
  gymsRepository = new InMemoryGymsRepository()
  sut = new CreateGymUseCase(gymsRepository)
})

describe('Create Gym Use Case', () => {
  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym 01',
      description: 'Gym 01',
      phone: '123456789',
      latitude: -23.55052,
      longitude: -46.6333083,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
