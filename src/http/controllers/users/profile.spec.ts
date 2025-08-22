import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-auth-user'

describe('Profile Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .get('/profile')
      .set({
        Authorization: 'Bearer ' + token,
      })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      user: expect.any(Object),
    })
  })
})
