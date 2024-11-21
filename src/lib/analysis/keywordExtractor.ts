import { COMMON_WORDS, TECHNICAL_PATTERNS } from './constants';

export class KeywordExtractor {
  private static isSignificantTerm(word: string): boolean {
    const significantPatterns = [
      /^(?:senior|junior|lead|principal|architect|manager|director|coordinator|specialist|analyst|engineer|developer|designer|consultant|administrator)$/,
      /^(?:sql|nosql|api|sdk|cli|gui|css|html|xml|json|yaml|rest|soap|grpc)$/i,
      /^(?:frontend|backend|fullstack|devops|sysadmin|webdev|qa|ux|ui)$/i,
      /^(?:agile|scrum|kanban|waterfall|lean)$/i,
      /^(?:aws|azure|gcp|kubernetes|docker|jenkins|git|jira|confluence)$/i,
      /tech|data|cloud|test|code|dev|ops|sec|net|sys|web|app|mobile|desktop/i
    ];

    return significantPatterns.some(pattern => pattern.test(word));
  }

  private static extractMultiWordTerms(text: string): string[] {
    const matches = TECHNICAL_PATTERNS.flatMap(pattern => 
      (text.match(pattern) || []).map(match => match.toLowerCase())
    );

    return Array.from(new Set(matches));
  }

  static extract(text: string): string[] {
    // Extract multi-word technical terms
    const multiWordTerms = this.extractMultiWordTerms(text);
    
    // Process single words
    const words = text.toLowerCase()
      .replace(/[^\w\s-]/g, ' ')
      .split(/\s+/)
      .filter(word => 
        word.length > 2 && 
        !COMMON_WORDS.has(word) &&
        !word.match(/^\d+$/) &&
        this.isSignificantTerm(word)
      );

    return Array.from(new Set([...multiWordTerms, ...words]));
  }
}