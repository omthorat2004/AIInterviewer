import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Interview {
  id: string;
  title: string;
  status: 'active' | 'scheduled' | 'draft' | 'completed';
  candidates: number;
  progress: string;
  duration: string;
  created: string;
}

interface InterviewsState {
  interviews: Interview[];
  stats: {
    total: number;
    active: number;
    totalCandidates: number;
    completed: number;
  };
  loading: boolean;
}

const initialState: InterviewsState = {
  interviews: [
    {
      id: '1',
      title: 'Senior Frontend Developer Engineering',
      status: 'active',
      candidates: 5,
      progress: '3/5 completed',
      duration: '45m',
      created: '2024-01-15',
    },
    {
      id: '2',
      title: 'Product Manager Product',
      status: 'scheduled',
      candidates: 3,
      progress: '0/3 completed',
      duration: '60m',
      created: '2024-01-14',
    },
    {
      id: '3',
      title: 'UX Designer Design',
      status: 'completed',
      candidates: 4,
      progress: '4/4 completed',
      duration: '30m',
      created: '2024-01-10',
    },
    {
      id: '4',
      title: 'Backend Engineer Engineering',
      status: 'draft',
      candidates: 0,
      progress: '0/0 completed',
      duration: '45m',
      created: '2024-01-16',
    },
  ],
  stats: {
    total: 4,
    active: 1,
    totalCandidates: 12,
    completed: 7,
  },
  loading: false,
};

const interviewsSlice = createSlice({
  name: 'interviews',
  initialState,
  reducers: {
    setInterviews: (state, action: PayloadAction<Interview[]>) => {
      state.interviews = action.payload;
    },
    setStats: (state, action: PayloadAction<typeof initialState.stats>) => {
      state.stats = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setInterviews, setStats, setLoading } = interviewsSlice.actions;
export default interviewsSlice.reducer;