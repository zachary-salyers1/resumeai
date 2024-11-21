import { z } from 'zod';

const envSchema = z.object({
  VITE_OPENAI_API_KEY: z.string().min(1, 'OpenAI API key is required'),
});

export const validateEnv = () => {
  const env = {
    VITE_OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
  };

  try {
    return envSchema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Environment validation failed: ${error.errors[0].message}`);
    }
    throw error;
  }
};