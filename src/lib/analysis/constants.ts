export const COMMON_WORDS = new Set([
  // Articles, prepositions, conjunctions
  'and', 'the', 'or', 'in', 'at', 'on', 'to', 'for', 'with', 'by', 'from', 'up', 'about',
  'into', 'over', 'after', 'of', 'a', 'an', 'as', 'is', 'are', 'was', 'were', 'be', 'been',
  // Common verbs
  'will', 'have', 'has', 'had', 'do', 'does', 'did', 'can', 'could', 'may', 'might',
  // Common job posting words
  'must', 'should', 'would', 'job', 'role', 'position', 'candidate', 'applicant', 'company',
  'team', 'work', 'working', 'year', 'years', 'experience', 'ability', 'looking',
  // Filler words
  'etc', 'other', 'others', 'various', 'including', 'included', 'well', 'good', 'great',
  'excellent', 'outstanding', 'plus', 'also', 'within', 'across', 'through'
]);

export const TECHNICAL_PATTERNS = [
  // Programming languages and technologies
  /(?:python|javascript|typescript|java|ruby|php|golang|rust|swift|kotlin)\s+(?:development|programming)/gi,
  // Common technical terms
  /(?:machine learning|artificial intelligence|data science|cloud computing|web development|mobile development|devops|ci\/cd|test automation)/gi,
  // Methodologies
  /(?:agile|scrum|kanban|waterfall|lean)\s+(?:methodology|development|process)/gi,
  // Business terms
  /(?:project management|business analysis|product development|customer experience|market research)/gi,
  // Certifications
  /(?:aws|azure|google cloud|pmp|cissp|cisa|cism|comptia|cisco)\s+(?:certified|certification|associate|professional|expert)/gi
];