import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AIPersonality {
  communicationTone: string;
  formalityLevel: number;
  empathyLevel: number;
  directness: number;
  enthusiasm: number;
}

interface ResponseTemplate {
  id: string;
  name: string;
  type: 'greeting' | 'questioning';
  content: string;
  lastModified: string;
}

interface ScoringWeights {
  technicalSkills: number;
  communication: number;
  problemSolving: number;
  culturalFit: number;
}

interface KnowledgeState {
  aiPersonality: AIPersonality;
  responseTemplates: ResponseTemplate[];
  scoringWeights: ScoringWeights;
  evaluationGuidelines: {
    technicalSkills: string;
    communication: string;
    problemSolving: string;
    culturalFit: string;
  };
  customInstructions: string;
  loading: boolean;
}

const initialState: KnowledgeState = {
  aiPersonality: {
    communicationTone: 'Professional',
    formalityLevel: 70,
    empathyLevel: 80,
    directness: 60,
    enthusiasm: 50,
  },
  responseTemplates: [
    {
      id: '1',
      name: 'Default Greeting',
      type: 'greeting',
      content: 'Hello {candidate_name}! Welcome to your interview for the {position} role at {company}. I\'m your AI interviewer today, and I\'m excited to learn more about your background and experience. This interview will take approximately {duration} minutes, and we\'ll cover various aspects of your qualifications. Please feel free to ask questions at any time. Shall we begin?',
      lastModified: '2024-01-10',
    },
    {
      id: '2',
      name: 'Warm & Friendly Greeting',
      type: 'greeting',
      content: 'Hi there! Welcome to your interview - I\'m so glad you could join us today!',
      lastModified: '2024-01-10',
    },
    {
      id: '3',
      name: 'Technical Deep Dive',
      type: 'questioning',
      content: 'Let\'s dive deeper into the technical aspects...',
      lastModified: '2024-01-10',
    },
    {
      id: '4',
      name: 'Behavioral Follow-ups',
      type: 'questioning',
      content: 'Can you tell me about a time when...',
      lastModified: '2024-01-10',
    },
  ],
  scoringWeights: {
    technicalSkills: 40,
    communication: 30,
    problemSolving: 20,
    culturalFit: 10,
  },
  evaluationGuidelines: {
    technicalSkills: 'Assess depth of knowledge, problem-solving approach, and technical accuracy',
    communication: 'Evaluate clarity, structure, and ability to explain complex concepts',
    problemSolving: 'Look for systematic thinking, creativity, and analytical skills',
    culturalFit: 'Assess alignment with company values and team dynamics',
  },
  customInstructions: 'Focus on assessing both technical competency and cultural fit. Pay attention to communication style, problem-solving approach, and alignment with company values. Encourage detailed examples and follow up with clarifying questions when needed.',
  loading: false,
};

const knowledgeSlice = createSlice({
  name: 'knowledge',
  initialState,
  reducers: {
    setAIPersonality: (state, action: PayloadAction<AIPersonality>) => {
      state.aiPersonality = action.payload;
    },
    setResponseTemplates: (state, action: PayloadAction<ResponseTemplate[]>) => {
      state.responseTemplates = action.payload;
    },
    setScoringWeights: (state, action: PayloadAction<ScoringWeights>) => {
      state.scoringWeights = action.payload;
    },
    setEvaluationGuidelines: (state, action: PayloadAction<typeof initialState.evaluationGuidelines>) => {
      state.evaluationGuidelines = action.payload;
    },
    setCustomInstructions: (state, action: PayloadAction<string>) => {
      state.customInstructions = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { 
  setAIPersonality, 
  setResponseTemplates, 
  setScoringWeights, 
  setEvaluationGuidelines, 
  setCustomInstructions, 
  setLoading 
} = knowledgeSlice.actions;
export default knowledgeSlice.reducer;