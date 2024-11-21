import { z } from 'zod';
import { toast } from 'react-hot-toast';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const resumeAnalysisSchema = z.object({
  overallScore: z.number().min(0).max(100),
  summary: z.string(),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  suggestions: z.array(z.string()),
  skillsAnalysis: z.object({
    technicalSkills: z.array(z.string()),
    softSkills: z.array(z.string()),
    missingCriticalSkills: z.array(z.string())
  }),
  experienceAnalysis: z.object({
    highlights: z.array(z.string()),
    improvements: z.array(z.string())
  }),
  formattingFeedback: z.array(z.string()),
  keywordOptimization: z.array(z.string())
});

type ResumeAnalysis = z.infer<typeof resumeAnalysisSchema>;

export class ResumeAiAnalyzer {
  private systemPrompt = `You are an expert resume analyst and career coach. Analyze the provided resume and job description to provide detailed, actionable feedback. Return your analysis in the following JSON format:
  {
    "overallScore": <number 0-100>,
    "summary": "<brief overall assessment>",
    "strengths": ["<strength1>", "<strength2>", ...],
    "weaknesses": ["<weakness1>", "<weakness2>", ...],
    "suggestions": ["<suggestion1>", "<suggestion2>", ...],
    "skillsAnalysis": {
      "technicalSkills": ["<skill1>", "<skill2>", ...],
      "softSkills": ["<skill1>", "<skill2>", ...],
      "missingCriticalSkills": ["<skill1>", "<skill2>", ...]
    },
    "experienceAnalysis": {
      "highlights": ["<highlight1>", "<highlight2>", ...],
      "improvements": ["<improvement1>", "<improvement2>", ...]
    },
    "formattingFeedback": ["<feedback1>", "<feedback2>", ...],
    "keywordOptimization": ["<suggestion1>", "<suggestion2>", ...]
  }`;

  async analyzeResume(resumeText: string, jobDescription: string): Promise<ResumeAnalysis> {
    try {
      if (!GROQ_API_KEY) {
        throw new Error('GROQ API key not configured');
      }

      const userPrompt = `Resume:\n${resumeText}\n\nJob Description:\n${jobDescription}\n\nProvide a detailed analysis of how well this resume matches the job description and suggest improvements.`;

      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mixtral-8x7b-32768',
          messages: [
            { role: 'system', content: this.systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Groq API error: ${error}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('No content in AI response');
      }

      let parsedContent: unknown;
      try {
        parsedContent = JSON.parse(content);
      } catch (error) {
        console.error('Failed to parse AI response:', error);
        throw new Error('Invalid AI response format');
      }

      const validatedAnalysis = resumeAnalysisSchema.parse(parsedContent);
      return validatedAnalysis;

    } catch (error) {
      console.error('Resume analysis error:', error);
      toast.error('Failed to analyze resume. Please try again.');
      
      // Return a fallback analysis with error message
      return {
        overallScore: 0,
        summary: 'Analysis failed. Please try again.',
        strengths: [],
        weaknesses: [],
        suggestions: ['Unable to analyze resume at this time.'],
        skillsAnalysis: {
          technicalSkills: [],
          softSkills: [],
          missingCriticalSkills: []
        },
        experienceAnalysis: {
          highlights: [],
          improvements: ['Analysis service temporarily unavailable.']
        },
        formattingFeedback: [],
        keywordOptimization: []
      };
    }
  }
}
