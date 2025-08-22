import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase
describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: '123456',
    })

    const { user: profile } = await sut.execute({
      userId: user.id,
    })

    expect(profile).toEqual(user)
  })

  it('should not be able to get user profile if user does not exist', async () => {
    await expect(
      sut.execute({
        userId: 'non-existing-user-id',
      }),
    ).rejects.toThrow('User not found')
  })
})
