import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  PORT: z.string().default('3333'),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  JWT_SECRET: z.string(),
})

const env = envSchema.safeParse(process.env)

if (!env.success) {
  console.error('Invalid environment variables:', env.error.format())
  process.exit(1)
}

console.log('Environment variables loaded successfully')

export default env.data
