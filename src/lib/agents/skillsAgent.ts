import { ChatOpenAI } from "@langchain/openai";
import { AgentState } from "./types";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { validateEnv } from "../config";

const skillsExtractorPrompt = ChatPromptTemplate.fromTemplate(`
You are a skilled ATS and resume analysis expert. Extract key skills and requirements from the following job description:

{jobDescription}

Focus on:
1. Technical skills
2. Soft skills
3. Required certifications
4. Experience levels
5. Domain expertise

Return the analysis in a structured format.
`);

const skillsMatcherPrompt = ChatPromptTemplate.fromTemplate(`
Analyze how well the candidate's resume matches the job requirements:

Job Requirements:
{requirements}

Resume:
{resumeText}

Provide:
1. Matched skills
2. Missing skills
3. Suggestions for improvement
4. Match score (0-100)
`);

export const createSkillsAnalysis = async (state: AgentState) => {
  const env = validateEnv();
  
  const model = new ChatOpenAI({
    apiKey: env.OPENAI_API_KEY,
    modelName: "gpt-4",
    temperature: 0.1,
  });

  // Extract skills from job description
  const extractionResponse = await model.invoke(
    skillsExtractorPrompt.format({
      jobDescription: state.jobDescription,
    })
  );

  const parsed = JSON.parse(extractionResponse.content);
  const updatedState = {
    ...state,
    skills: parsed.skills,
    requirements: parsed.requirements,
  };

  // Match skills with resume
  const matchingResponse = await model.invoke(
    skillsMatcherPrompt.format({
      requirements: JSON.stringify(updatedState.requirements),
      resumeText: updatedState.resumeText,
    })
  );

  const analysis = JSON.parse(matchingResponse.content);

  // Add industry context
  const contextPrompt = ChatPromptTemplate.fromTemplate(`
    Based on the job requirements and skills, provide:
    1. Current industry trends
    2. Market demand for these skills
    3. Common competitor requirements
    
    Requirements: {requirements}
  `);

  const contextResponse = await model.invoke(
    contextPrompt.format({
      requirements: JSON.stringify(updatedState.requirements),
    })
  );

  const context = JSON.parse(contextResponse.content);

  return {
    ...updatedState,
    analysis,
    context,
  };
};