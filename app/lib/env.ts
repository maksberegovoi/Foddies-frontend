import { z } from "zod"

const envSchema = z.object({
  VITE_BASE_API_URL: z.url("Invalid API URL"),
})

export const env = envSchema.parse(import.meta.env)
