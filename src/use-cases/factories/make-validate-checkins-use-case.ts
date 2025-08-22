import { ValidateCheckInUseCase } from '@/use-cases/validate-check'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'

export function makeValidateCheckInUseCase() {
  const checkInRepository = new InMemoryCheckInsRepository()
  return new ValidateCheckInUseCase(checkInRepository)
}
