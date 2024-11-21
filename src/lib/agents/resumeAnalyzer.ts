import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { AnalysisResponseSchema, type AnalysisResponse } from '../schemas/analysis';
import { validateEnv } from '../config';
import type { AnalysisResult } from './types';

export class ResumeAnalyzer {
  private client: OpenAI;

  constructor() {
    const env = validateEnv();
    this.client = new OpenAI({
      apiKey: env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
  }

  async analyze(resumeText: string, jobDescription: string): Promise<AnalysisResult> {
    try {
      const completion = await this.client.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `You are an expert ATS and resume analysis system. Analyze the provided resume against the job description and return a JSON response with the following structure:

              {
                "skills": [
                  {
                    "name": "string",
                    "category": "technical" | "soft" | "domain" | "certification",
                    "importance": number (1-5),
                    "context": "string (optional)"
                  }
                ],
                "requirements": [
                  {
                    "description": "string",
                    "type": "essential" | "preferred",
                    "skills": ["string"]
                  }
                ],
                "matchedSkills": ["string"],
                "missingSkills": ["string"],
                "suggestions": ["string"],
                "score": number (0-100),
                "marketContext": {
                  "trends": ["string"],
                  "inDemandSkills": ["string"],
                  "industryInsights": ["string"]
                }
              }

              Important Notes:
              1. For skill categories, you MUST ONLY use one of these exact values:
                 - "technical" (for programming languages, tools, frameworks)
                 - "soft" (for interpersonal skills, communication, leadership)
                 - "domain" (for industry knowledge, business areas)
                 - "certification" (for formal certifications, degrees)
              2. Do not use any other category values like "other" or "general"
              3. If a skill doesn't clearly fit one category, use the closest match

              Focus your analysis on:
              1. Required and preferred skills alignment
              2. Technical and soft skill matches
              3. Missing qualifications and how to address them
              4. Industry context and market trends
              5. ATS optimization suggestions

              For the suggestions field, provide detailed, actionable recommendations that:
              - Address specific missing skills and how to acquire them
              - Suggest rewording of experience to better match job requirements
              - Recommend certifications or training that would increase match score
              - Include ATS optimization tips specific to the resume content
              - Highlight industry trends and how to incorporate them

              Make suggestions specific and actionable, starting with action verbs like "Add," "Highlight," "Reword," or "Consider."`,
          },
          {
            role: 'user',
            content: `Resume:\n${resumeText}\n\nJob Description:\n${jobDescription}`,
          },
        ],
        response_format: { type: 'json_object' },
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('Failed to get analysis response');
      }

      // Parse and sanitize the response
      const rawResponse = JSON.parse(response);
      const sanitizedResponse = this.sanitizeResponse(rawResponse);

      // Validate with schema
      const parsedResponse = AnalysisResponseSchema.parse(sanitizedResponse);
      return this.transformResponse(parsedResponse);
    } catch (error) {
      console.error('Analysis failed:', error);
      throw error instanceof Error 
        ? error 
        : new Error('Failed to analyze resume');
    }
  }

  private sanitizeResponse(response: any): any {
    // Ensure skills have valid categories
    if (Array.isArray(response.skills)) {
      response.skills = response.skills.map((skill: any) => ({
        ...skill,
        // Map any invalid category to the closest valid one
        category: this.mapToValidCategory(skill.category),
        // Ensure importance is within bounds
        importance: Math.min(Math.max(1, skill.importance || 1), 5)
      }));
    }
    return response;
  }

  private mapToValidCategory(category: string): 'technical' | 'soft' | 'domain' | 'certification' {
    // Convert to lowercase for comparison
    const normalizedCategory = category?.toLowerCase() || '';
    
    // Map categories to valid values
    if (normalizedCategory.includes('tech') || 
        normalizedCategory.includes('programming') || 
        normalizedCategory.includes('tool')) {
      return 'technical';
    }
    
    if (normalizedCategory.includes('soft') || 
        normalizedCategory.includes('interpersonal') || 
        normalizedCategory.includes('communication')) {
      return 'soft';
    }
    
    if (normalizedCategory.includes('cert') || 
        normalizedCategory.includes('degree') || 
        normalizedCategory.includes('qualification')) {
      return 'certification';
    }
    
    // Default to domain for any other category
    return 'domain';
  }

  private transformResponse(response: AnalysisResponse): AnalysisResult {
    return {
      score: response.score,
      matchedKeywords: response.matchedSkills,
      missingKeywords: response.missingSkills,
      suggestions: [
        ...response.suggestions,
        ...response.marketContext.trends.map(trend => `Industry Trend: ${trend}`),
        ...response.marketContext.inDemandSkills.map(skill => `In-Demand Skill: ${skill}`),
      ],
    };
  }
}