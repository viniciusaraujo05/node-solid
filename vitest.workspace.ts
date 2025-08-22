import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  {
    test: {
      name: 'unit',
      include: ['src/use-cases/**/*.spec.ts'],
      environment: 'node',
    },
  },
  {
    test: {
      name: 'e2e',
      include: ['src/http/**/*.spec.ts'],
      environment: 'node',
    },
  },
])
