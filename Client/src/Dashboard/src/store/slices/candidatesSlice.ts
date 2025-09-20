import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  source: string;
  applied: string;
  status: 'hired' | 'interviewed' | 'screening' | 'rejected';
  score: number;
  tags: string[];
}

interface CandidatesState {
  candidates: Candidate[];
  stats: {
    total: number;
    new: number;
    screening: number;
    interviewed: number;
    hired: number;
  };
  loading: boolean;
}

const initialState: CandidatesState = {
  candidates: [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      position: 'Senior Frontend Developer',
      source: 'LinkedIn',
      applied: '2024-01-10',
      status: 'hired',
      score: 85,
      tags: ['React', 'TypeScript'],
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      position: 'Product Manager',
      source: 'Company Website',
      applied: '2024-01-08',
      status: 'hired',
      score: 92,
      tags: ['Product', 'Leadership'],
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      position: 'UX Designer',
      source: 'Referral',
      applied: '2024-01-12',
      status: 'interviewed',
      score: 76,
      tags: ['Design', 'UI/UX'],
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david.kim@email.com',
      position: 'Backend Engineer',
      source: 'Indeed',
      applied: '2024-01-05',
      status: 'rejected',
      score: 68,
      tags: ['Backend', 'Python'],
    },
    {
      id: '5',
      name: 'Lisa Wang',
      email: 'lisa.wang@email.com',
      position: 'Data Scientist',
      source: 'Glassdoor',
      applied: '2024-01-14',
      status: 'screening',
      score: 0,
      tags: ['Data Science', 'ML'],
    },
  ],
  stats: {
    total: 6,
    new: 0,
    screening: 1,
    interviewed: 2,
    hired: 2,
  },
  loading: false,
};

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    setCandidates: (state, action: PayloadAction<Candidate[]>) => {
      state.candidates = action.payload;
    },
    setStats: (state, action: PayloadAction<typeof initialState.stats>) => {
      state.stats = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setCandidates, setStats, setLoading } = candidatesSlice.actions;
export default candidatesSlice.reducer;