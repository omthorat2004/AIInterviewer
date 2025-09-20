import { configureStore } from '@reduxjs/toolkit';
import dashboardSlice from './slices/dashboardSlice';
import interviewsSlice from './slices/interviewsSlice';
import candidatesSlice from './slices/candidatesSlice';
import resultsSlice from './slices/resultsSlice';
import knowledgeSlice from './slices/knowledgeSlice';
import integrationsSlice from './slices/integrationsSlice';
import settingsSlice from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
    interviews: interviewsSlice,
    candidates: candidatesSlice,
    results: resultsSlice,
    knowledge: knowledgeSlice,
    integrations: integrationsSlice,
    settings: settingsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;