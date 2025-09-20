import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

export const deleteCandidate = createAsyncThunk(
  "results/deleteCandidate",
  async (id: string) => {
    await axios.delete(`/api/candidates/${id}`); // <-- adjust to your backend
    return id;
  }
);

interface CandidateResult {
  id: string;
  candidateName: string;
  email: string;
  position: string;
  interviewDate: string;
  duration: string;
  score: number;
  status: 'completed';
  decision: 'hire' | 'maybe' | 'no-hire';
}

interface ResultsState {
  candidateResults: CandidateResult[];
  stats: {
    totalCandidates: number;
    completed: number;
    hired: number;
    avgScore: number;
  };
  analytics: {
    scoreDistribution: {
      technical: number;
      communication: number;
      problemSolving: number;
      cultural: number;
    };
    hiringFunnel: {
      totalCandidates: number;
      completedInterviews: number;
      recommendedForHire: number;
    };
  };
  loading: boolean;
}

const initialState: ResultsState = {
  candidateResults: [
    {
      id: '1',
      candidateName: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      position: 'Senior Frontend Developer',
      interviewDate: '2024-01-15',
      duration: '42:15',
      score: 85,
      status: 'completed',
      decision: 'hire',
    },
    {
      id: '2',
      candidateName: 'Michael Chen',
      email: 'michael.chen@email.com',
      position: 'Product Manager',
      interviewDate: '2024-01-14',
      duration: '38:45',
      score: 92,
      status: 'completed',
      decision: 'hire',
    },
    {
      id: '3',
      candidateName: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      position: 'UX Designer',
      interviewDate: '2024-01-14',
      duration: '35:20',
      score: 76,
      status: 'completed',
      decision: 'maybe',
    },
    {
      id: '4',
      candidateName: 'David Kim',
      email: 'david.kim@email.com',
      position: 'Backend Engineer',
      interviewDate: '2024-01-13',
      duration: '44:10',
      score: 68,
      status: 'completed',
      decision: 'no-hire',
    },
  ],
  stats: {
    totalCandidates: 6,
    completed: 5,
    hired: 2,
    avgScore: 80,
  },
  analytics: {
    scoreDistribution: {
      technical: 78,
      communication: 83,
      problemSolving: 77,
      cultural: 80,
    },
    hiringFunnel: {
      totalCandidates: 6,
      completedInterviews: 5,
      recommendedForHire: 2,
    },
  },
  loading: false,
};

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setCandidateResults: (state, action: PayloadAction<CandidateResult[]>) => {
      state.candidateResults = action.payload;
    },
    setStats: (state, action: PayloadAction<typeof initialState.stats>) => {
      state.stats = action.payload;
    },
    setAnalytics: (state, action: PayloadAction<typeof initialState.analytics>) => {
      state.analytics = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteCandidate.fulfilled, (state, action) => {
      state.candidateResults = state.candidateResults.filter(
        (c) => c.id !== action.payload
      );
    });
  },
});

export const { setCandidateResults, setStats, setAnalytics, setLoading } = resultsSlice.actions;
// export { deleteCandidate };
export default resultsSlice.reducer;