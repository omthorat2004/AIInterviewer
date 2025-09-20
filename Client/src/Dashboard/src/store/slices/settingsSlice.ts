import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
  name: string;
  email: string;
  company: string;
  role: string;
  avatar?: string;
}

interface Plan {
  name: string;
  type: 'free' | 'pro' | 'enterprise';
  interviewsPerMonth: number;
  usedThisMonth: number;
  features: string[];
  price: number;
  billingCycle: 'monthly' | 'yearly';
}

interface GeneralSettings {
  notifications: {
    email: boolean;
    push: boolean;
    interview: boolean;
    candidateUpdates: boolean;
  };
  timezone: string;
  language: string;
  theme: 'light' | 'dark' | 'system';
}

interface SettingsState {
  profile: UserProfile;
  plan: Plan;
  generalSettings: GeneralSettings;
  loading: boolean;
}

const initialState: SettingsState = {
  profile: {
    name: 'John Doe',
    email: 'john@company.com',
    company: 'TechCorp Inc.',
    role: 'HR Manager',
  },
  plan: {
    name: 'Professional',
    type: 'pro',
    interviewsPerMonth: 100,
    usedThisMonth: 34,
    features: [
      'Unlimited interviews',
      'Advanced analytics',
      'Custom AI personality',
      'Priority support',
      'Team collaboration',
    ],
    price: 49,
    billingCycle: 'monthly',
  },
  generalSettings: {
    notifications: {
      email: true,
      push: true,
      interview: true,
      candidateUpdates: true,
    },
    timezone: 'America/New_York',
    language: 'English',
    theme: 'light',
  },
  loading: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
    setPlan: (state, action: PayloadAction<Plan>) => {
      state.plan = action.payload;
    },
    setGeneralSettings: (state, action: PayloadAction<GeneralSettings>) => {
      state.generalSettings = action.payload;
    },
    updateNotificationSettings: (state, action: PayloadAction<Partial<GeneralSettings['notifications']>>) => {
      state.generalSettings.notifications = { ...state.generalSettings.notifications, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { 
  setProfile, 
  setPlan, 
  setGeneralSettings, 
  updateNotificationSettings, 
  setLoading 
} = settingsSlice.actions;
export default settingsSlice.reducer;