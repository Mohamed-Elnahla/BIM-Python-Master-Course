export enum BlockType {
  MARKDOWN = 'MARKDOWN',
  CODE_EXAMPLE = 'CODE_EXAMPLE',
  EXERCISE = 'EXERCISE',
  QUIZ = 'QUIZ'
}

export interface CourseBlock {
  type: BlockType;
  content: string; // Markdown text, Code content, or Quiz Question
  title?: string;
  language?: string;
  id?: string;
  prefill?: string; // For exercises
  solution?: string; // Hidden solution for AI context
  hint?: string;
  visualPrompt?: string; // Prompt for generating explanatory figures
  
  // Quiz specific fields
  options?: string[];
  correctAnswerIndex?: number;
  explanation?: string;
}

export interface CourseSection {
  id: string;
  title: string;
  blocks: CourseBlock[];
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  sections: CourseSection[];
}

// Pyodide global types
declare global {
  interface Window {
    loadPyodide: (config: { indexURL: string }) => Promise<any>;
    Prism: any;
  }
}

export interface ExecutionResult {
  output: string;
  error?: string;
}