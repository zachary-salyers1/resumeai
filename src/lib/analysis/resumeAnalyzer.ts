import { AnalysisResult, KeywordCategory } from './types';
import { KeywordExtractor } from './keywordExtractor';

export class ResumeAnalyzer {
  private categorizeKeywords(keywords: string[]): KeywordCategory {
    const categories: KeywordCategory = {
      technical: [],
      soft: [],
      domain: [],
      certifications: []
    };

    keywords.forEach(keyword => {
      if (keyword.match(/(?:python|javascript|java|aws|azure|sql|api|docker|kubernetes)/i)) {
        categories.technical.push(keyword);
      } else if (keyword.match(/(?:communication|leadership|management|collaboration|analytical)/i)) {
        categories.soft.push(keyword);
      } else if (keyword.match(/(?:certified|certification|pmp|cissp|cisa|cism|comptia)/i)) {
        categories.certifications.push(keyword);
      } else {
        categories.domain.push(keyword);
      }
    });

    return categories;
  }

  private generateSuggestions(categories: KeywordCategory): string[] {
    const suggestions: string[] = [];

    if (categories.technical.length > 0) {
      suggestions.push(`Technical skills to highlight: ${categories.technical.slice(0, 5).join(', ')}`);
    }
    
    if (categories.soft.length > 0) {
      suggestions.push(`Soft skills to emphasize: ${categories.soft.slice(0, 3).join(', ')}`);
    }
    
    if (categories.certifications.length > 0) {
      suggestions.push(`Consider obtaining these certifications: ${categories.certifications.join(', ')}`);
    }
    
    if (categories.domain.length > 0) {
      suggestions.push(`Domain expertise to add: ${categories.domain.slice(0, 4).join(', ')}`);
    }

    suggestions.push(
      'Use specific metrics and numbers to quantify your achievements',
      'Incorporate relevant keywords naturally into your experience descriptions',
      'Ensure your resume follows ATS-friendly formatting guidelines'
    );

    return suggestions;
  }

  analyze(resumeText: string, jobDescription: string): AnalysisResult {
    const jobKeywords = KeywordExtractor.extract(jobDescription);
    const resumeKeywords = KeywordExtractor.extract(resumeText);
    
    const matchedKeywords = jobKeywords.filter(keyword => 
      resumeKeywords.some(resumeWord => resumeWord === keyword)
    );
    
    const missingKeywords = jobKeywords.filter(keyword => 
      !resumeKeywords.some(resumeWord => resumeWord === keyword)
    );
    
    const score = Math.round((matchedKeywords.length / (jobKeywords.length || 1)) * 100);
    
    const categories = this.categorizeKeywords(missingKeywords);
    const suggestions = this.generateSuggestions(categories);
    
    return {
      score,
      matchedKeywords: Array.from(new Set(matchedKeywords)),
      missingKeywords: Array.from(new Set(missingKeywords)),
      suggestions,
    };
  }
}