import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardStats {
  totalInterviews: number;
  thisMonth: number;
  successRate: number;
  avgDuration: number;
  totalInterviewsChange: number;
  thisMonthChange: number;
  successRateChange: number;
  avgDurationChange: number;
}

interface RecentInterview {
  id: string;
  candidateName: string;
  position: string;
  date: string;
  score: number;
  status: 'completed' | 'in-progress' | 'scheduled';
}

interface DashboardState {
  stats: DashboardStats;
  recentInterviews: RecentInterview[];
  loading: boolean;
}

const initialState: DashboardState = {
  stats: {
    totalInterviews: 247,
    thisMonth: 34,
    successRate: 78,
    avgDuration: 24,
    totalInterviewsChange: 12,
    thisMonthChange: 8,
    successRateChange: 5,
    avgDurationChange: -2,
  },
  recentInterviews: [
    {
      id: '1',
      candidateName: 'Sarah Johnson',
      position: 'Senior Frontend Developer',
      date: '2024-01-15',
      score: 85,
      status: 'completed',
    },
    {
      id: '2',
      candidateName: 'Michael Chen',
      position: 'Product Manager',
      date: '2024-01-14',
      score: 92,
      status: 'completed',
    },
    {
      id: '3',
      candidateName: 'Emily Rodriguez',
      position: 'UX Designer',
      date: '2024-01-14',
      score: 76,
      status: 'in-progress',
    },
  ],
  loading: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setStats: (state, action: PayloadAction<DashboardStats>) => {
      state.stats = action.payload;
    },
    setRecentInterviews: (state, action: PayloadAction<RecentInterview[]>) => {
      state.recentInterviews = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setStats, setRecentInterviews, setLoading } = dashboardSlice.actions;
export default dashboardSlice.reducer;