import { z } from 'zod';

export const SkillSchema = z.object({
  name: z.string(),
  category: z.enum(['technical', 'soft', 'domain', 'certification']),
  importance: z.number().min(1).max(5),
  context: z.string().optional(),
});

export const RequirementSchema = z.object({
  description: z.string(),
  type: z.enum(['essential', 'preferred']),
  skills: z.array(z.string()),
});

export const AnalysisResponseSchema = z.object({
  skills: z.array(SkillSchema),
  requirements: z.array(RequirementSchema),
  matchedSkills: z.array(z.string()),
  missingSkills: z.array(z.string()),
  suggestions: z.array(z.string()),
  score: z.number().min(0).max(100),
  marketContext: z.object({
    trends: z.array(z.string()),
    inDemandSkills: z.array(z.string()),
    industryInsights: z.array(z.string()),
  }),
});

export type AnalysisResponse = z.infer<typeof AnalysisResponseSchema>;