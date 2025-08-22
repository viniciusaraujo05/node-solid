import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authtenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { app } from '@/app'

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()
    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await app.jwt.sign(
      {
        role: user.role,
      },
      {
        sub: user.id,
      },
    )

    const refreshToken = await app.jwt.sign(
      {},
      {
        sub: user.id,
        expiresIn: '7 days',
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        signed: true,
      })
      .status(200)
      .send({ user, token })
  } catch (error) {
    return reply.status(401).send({ message: 'Invalid credentials' })
  }
}
