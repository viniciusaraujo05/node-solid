import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-auth-user'

describe('Create Gym Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/gyms')
      .set({
        Authorization: 'Bearer ' + token,
      })
      .send({
        title: 'Gym 1',
        description: 'Gym 1',
        phone: '123456789',
        latitude: -23.55052,
        longitude: -46.63332,
      })

    expect(response.statusCode).toBe(201)
  })
})
