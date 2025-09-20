import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Integration {
  id: string;
  name: string;
  description: string;
  features: string[];
  status: 'connected' | 'available';
  lastSynced?: string;
  popular?: boolean;
}

interface IntegrationsState {
  integrations: Integration[];
  stats: {
    total: number;
    connected: number;
    videoPlatforms: number;
    securityScore: number;
  };
  loading: boolean;
}

const initialState: IntegrationsState = {
  integrations: [
    {
      id: 'zoom',
      name: 'Zoom',
      description: 'Host interviews on Zoom with advanced features and analytics',
      features: ['HD video', 'Breakout rooms', 'Recording'],
      status: 'connected',
      lastSynced: '2024-01-15 10:30',
      popular: true,
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      description: 'Conduct interviews using Microsoft Teams platform',
      features: ['Teams integration', 'Calendar sync', 'Recording'],
      status: 'available',
      popular: true,
    },
    {
      id: 'meet',
      name: 'Google Meet',
      description: 'Use Google Meet for seamless video interviews',
      features: ['Google Calendar', 'Auto scheduling', 'Recording'],
      status: 'available',
      popular: true,
    },
  ],
  stats: {
    total: 3,
    connected: 1,
    videoPlatforms: 1,
    securityScore: 98,
  },
  loading: false,
};

const integrationsSlice = createSlice({
  name: 'integrations',
  initialState,
  reducers: {
    setIntegrations: (state, action: PayloadAction<Integration[]>) => {
      state.integrations = action.payload;
    },
    setStats: (state, action: PayloadAction<typeof initialState.stats>) => {
      state.stats = action.payload;
    },
    connectIntegration: (state, action: PayloadAction<string>) => {
      const integration = state.integrations.find(i => i.id === action.payload);
      if (integration) {
        integration.status = 'connected';
        integration.lastSynced = new Date().toISOString();
        state.stats.connected += 1;
      }
    },
    disconnectIntegration: (state, action: PayloadAction<string>) => {
      const integration = state.integrations.find(i => i.id === action.payload);
      if (integration) {
        integration.status = 'available';
        delete integration.lastSynced;
        state.stats.connected -= 1;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { 
  setIntegrations, 
  setStats, 
  connectIntegration, 
  disconnectIntegration, 
  setLoading 
} = integrationsSlice.actions;
export default integrationsSlice.reducer;