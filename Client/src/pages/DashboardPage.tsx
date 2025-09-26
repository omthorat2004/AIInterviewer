import React, { createContext, useContext, useReducer, useState} from 'react';
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";
// import {cn}  from "../../utilis/utils";

// ============== TYPES ==============
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

interface Interview {
  id: string;
  title: string;
  status: 'active' | 'scheduled' | 'draft' | 'completed';
  candidates: number;
  progress: string;
  duration: string;
  created: string;
}

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

interface CandidateResult {
  id: string;
  candidateName: string;
  email: string;
  position: string;
  interviewDate: string;
  duration: string;
  score: number;
  status: 'completed' | 'in-progress' | 'cancelled';
  decision: 'hire' | 'reject' | 'pending';
}

interface Integration {
  id: string;
  name: string;
  description: string;
  features: string[];
  status: 'connected' | 'available';
  lastSynced?: string;
  popular?: boolean;
}

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

interface AIPersonality {
  tone: string;
  style: string;
  difficulty: string;
  focus: string[];
}

interface AppState {
  currentPage: string;
  dashboard: {
    stats: DashboardStats;
    recentInterviews: RecentInterview[];
  };
  interviews: {
    interviews: Interview[];
    stats: { total: number; active: number; totalCandidates: number; completed: number; };
  };
  candidates: {
    candidates: Candidate[];
    stats: { total: number; new: number; screening: number; interviewed: number; hired: number; };
  };
  results: {
    candidateResults: CandidateResult[];
    stats: { totalCandidates: number; completed: number; hired: number; avgScore: number; };
    analytics: {
      scoreDistribution: { technical: number; communication: number; problemSolving: number; cultural: number; };
      hiringFunnel: { totalCandidates: number; completed: number; recommended: number; };
    };
  };
  integrations: {
    integrations: Integration[];
    stats: { total: number; connected: number; videoPlatforms: number; securityScore: number; };
  };
  settings: {
    profile: UserProfile;
    plan: Plan;
    generalSettings: {
      notifications: { email: boolean; push: boolean; interview: boolean; candidateUpdates: boolean; };
      timezone: string;
      language: string;
      theme: 'light' | 'dark' | 'system';
    };
  };
  knowledge: {
    aiPersonality: AIPersonality;
    responseTemplates: Array<Record<string, unknown>>;
    scoringWeights: Record<string, number>;
    evaluationGuidelines: string;
    customInstructions: string;
  };
}

// ============== INITIAL STATE ==============
const initialState: AppState = {
  currentPage: 'dashboard',
  dashboard: {
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
      { id: '1', candidateName: 'Sarah Johnson', position: 'Senior Frontend Developer', date: '2024-01-15', score: 85, status: 'completed' },
      { id: '2', candidateName: 'Michael Chen', position: 'Product Manager', date: '2024-01-14', score: 92, status: 'completed' },
      { id: '3', candidateName: 'Emily Rodriguez', position: 'UX Designer', date: '2024-01-14', score: 76, status: 'in-progress' },
    ],
  },
  interviews: {
    interviews: [
      { id: '1', title: 'Senior Frontend Developer Engineering', status: 'active', candidates: 5, progress: '3/5 completed', duration: '45m', created: '2024-01-15' },
      { id: '2', title: 'Product Manager Product', status: 'scheduled', candidates: 3, progress: '0/3 completed', duration: '60m', created: '2024-01-14' },
      { id: '3', title: 'UX Designer Design', status: 'completed', candidates: 4, progress: '4/4 completed', duration: '30m', created: '2024-01-10' },
      { id: '4', title: 'Backend Engineer Engineering', status: 'draft', candidates: 0, progress: '0/0 completed', duration: '45m', created: '2024-01-16' },
    ],
    stats: { total: 4, active: 1, totalCandidates: 12, completed: 7 },
  },
  candidates: {
    candidates: [
      { id: '1', name: 'Sarah Johnson', email: 'sarah.johnson@email.com', position: 'Senior Frontend Developer', source: 'LinkedIn', applied: '2024-01-10', status: 'hired', score: 85, tags: ['React', 'TypeScript'] },
      { id: '2', name: 'Michael Chen', email: 'michael.chen@email.com', position: 'Product Manager', source: 'Company Website', applied: '2024-01-08', status: 'hired', score: 92, tags: ['Product', 'Leadership'] },
      { id: '3', name: 'Emily Rodriguez', email: 'emily.rodriguez@email.com', position: 'UX Designer', source: 'Referral', applied: '2024-01-12', status: 'interviewed', score: 76, tags: ['Design', 'UI/UX'] },
      { id: '4', name: 'David Kim', email: 'david.kim@email.com', position: 'Backend Engineer', source: 'Indeed', applied: '2024-01-05', status: 'rejected', score: 68, tags: ['Backend', 'Python'] },
      { id: '5', name: 'Lisa Wang', email: 'lisa.wang@email.com', position: 'Data Scientist', source: 'Glassdoor', applied: '2024-01-14', status: 'screening', score: 0, tags: ['Data Science', 'ML'] },
    ],
    stats: { total: 6, new: 0, screening: 1, interviewed: 2, hired: 2 },
  },
  results: {
    candidateResults: [
      { id: '1', candidateName: 'Sarah Johnson', email: 'sarah.johnson@email.com', position: 'Senior Frontend Developer', interviewDate: '2024-01-15', duration: '45m', score: 85, status: 'completed', decision: 'hire' },
      { id: '2', candidateName: 'Michael Chen', email: 'michael.chen@email.com', position: 'Product Manager', interviewDate: '2024-01-14', duration: '60m', score: 92, status: 'completed', decision: 'hire' },
      { id: '3', candidateName: 'Emily Rodriguez', email: 'emily.rodriguez@email.com', position: 'UX Designer', interviewDate: '2024-01-14', duration: '30m', score: 76, status: 'completed', decision: 'pending' },
    ],
    stats: { totalCandidates: 15, completed: 12, hired: 8, avgScore: 84 },
    analytics: {
      scoreDistribution: { technical: 82, communication: 78, problemSolving: 85, cultural: 79 },
      hiringFunnel: { totalCandidates: 15, completed: 12, recommended: 8 },
    },
  },
  integrations: {
    integrations: [
      { id: '1', name: 'Zoom', description: 'Video conferencing for remote interviews', features: ['HD Video', 'Screen Sharing', 'Recording'], status: 'connected', lastSynced: '2024-01-15 10:30', popular: true },
      { id: '2', name: 'Google Meet', description: 'Seamless video interviews with Google Workspace', features: ['Video Calls', 'Calendar Integration', 'Recording'], status: 'available', popular: true },
      { id: '3', name: 'Microsoft Teams', description: 'Enterprise video conferencing solution', features: ['Video Calls', 'File Sharing', 'Recording'], status: 'connected', lastSynced: '2024-01-14 15:45' },
    ],
    stats: { total: 8, connected: 3, videoPlatforms: 4, securityScore: 95 },
  },
  settings: {
    profile: { name: 'John Doe', email: 'john@company.com', company: 'TechCorp Inc.', role: 'HR Manager' },
    plan: { name: 'Professional', type: 'pro', interviewsPerMonth: 100, usedThisMonth: 34, features: ['Unlimited interviews', 'Advanced analytics', 'Custom AI personality', 'Priority support', 'Team collaboration'], price: 49, billingCycle: 'monthly' },
    generalSettings: {
      notifications: { email: true, push: true, interview: true, candidateUpdates: true },
      timezone: 'America/New_York',
      language: 'English',
      theme: 'light',
    },
  },
  knowledge: {
    aiPersonality: { tone: 'Professional', style: 'Conversational', difficulty: 'Medium', focus: ['Technical Skills', 'Communication', 'Problem Solving'] },
    responseTemplates: [],
    scoringWeights: {},
    evaluationGuidelines: 'Focus on technical competency, communication skills, and cultural fit.',
    customInstructions: 'Be encouraging and maintain a positive interview atmosphere.',
  },
};

// ============== CONTEXT & REDUCER ==============
type Action = 
  | { type: 'SET_PAGE'; payload: string }
  | { type: 'UPDATE_PROFILE'; payload: Partial<UserProfile> }
  | { type: 'UPDATE_SETTINGS'; payload: {
        notifications?: { email?: boolean; push?: boolean; interview?: boolean; candidateUpdates?: boolean };
        timezone?: string;
        language?: string;
        theme?: "light" | "dark" | "system";
      };};

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'UPDATE_PROFILE':
      return { ...state, settings: { ...state.settings, profile: { ...state.settings.profile, ...action.payload } } };
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };
    default:
      return state;
  }
};

const AppContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | null>(null);

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

// ============== UTILITY FUNCTIONS ==============
const cn = (...classes: (string | undefined | null | boolean)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// ============== ICONS (Simple SVG) ==============
const Icons = {
  Plus: ({ className = "w-4 h-4", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Users: ({ className = "w-4 h-4", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
  Calendar: ({ className = "w-4 h-4", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  TrendingUp: ({ className = "w-4 h-4", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Clock: ({ className = "w-4 h-4", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Eye: ({ className = "w-4 h-4", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  BarChart3: ({ className = "w-4 h-4", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  UserPlus: ({ className = "w-4 h-4", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  ),
  MessageSquare: ({ className = "w-4 h-4", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  Brain: ({ className = "w-4 h-4", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  Zap: ({ className = "w-4 h-4", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Settings: ({ className = "w-4 h-4", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  LayoutDashboard: ({ className = "w-4 h-4", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Bell: ({ className = "w-4 h-4", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 2.485 14.41a.75.75 0 1 0 1.06 1.06L8.538 10.48l4.42-4.47a.75.75 0 0 0-1.06-1.06z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
    </svg>
  ),
  User: ({ className = "w-4 h-4", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Menu: ({ className = "w-4 h-4", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Search: ({ className = "w-4 h-4", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Filter: ({ className = "w-4 h-4", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  ),
  MoreHorizontal: ({ className = "w-4 h-4", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
  ),
  Download: ({ className = "w-4 h-4", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  Upload: ({ className = "w-4 h-4", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  ),
  Mail: ({ className = "w-4 h-4", ...props }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};

// ============== UI COMPONENTS ==============
const Button = ({ 
  children, 
  className = '', 
  variant = 'default', 
  size = 'default', 
  disabled = false,
  ...props 
}: { 
  children: ReactNode; 
  className?: string; 
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700",
    ghost: "hover:bg-gray-100 text-gray-700",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  };
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };
  
  return (
    <button 
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = '', ...props }: { children: ReactNode; className?: string} & HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("rounded-lg border bg-white shadow-sm", className)} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '', ...props }: { children: ReactNode; className?: string} & HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }: { children: ReactNode; className?: string} & HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '', ...props }: { children: ReactNode; className?: string} & HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6 pt-0", className)} {...props}>
    {children}
  </div>
);

const variants = {
    default: "bg-blue-600 text-white",
    secondary: "bg-gray-100 text-gray-700",
    success: "bg-green-600 text-white",
    warning: "bg-yellow-600 text-white",
    destructive: "bg-red-600 text-white",
};

type Variant = keyof typeof variants;

interface BadgeProps {
    children: ReactNode;
    className?: string;
    variant?: Variant;
}
const Badge = ({ children, className = '', variant = 'default' }: BadgeProps) => {

  
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", variants[variant], className)}>
      {children}
    </span>
  );
};

const Input = ({ className = '', ...props }: { className?: string} & InputHTMLAttributes<HTMLInputElement>) => (
  <input 
    className={cn("flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50", className)} 
    {...props} 
  />
);

const Textarea = ({ className = '', ...props }: { className?: string} & TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea 
    className={cn("flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50", className)} 
    {...props} 
  />
);

const Select = ({ children, className = '', ...props }: { children: ReactNode; className?: string} & SelectHTMLAttributes<HTMLSelectElement>) => (
  <select className={cn("flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500", className)} {...props}>
    {children}
  </select>
);

const Tabs = ({ children, defaultValue, className = "" }: { children: ReactNode; defaultValue?: string; className?: string }) => {
  const [activeTab, setActiveTab] = useState(defaultValue || "");
  
  return (
    <div className={cn("w-full", className)}>
      {React.Children.map(children, (child) => 
        React.isValidElement<{ activeTab?: string; setActiveTab?: (tab: string) => void }>(child) ? React.cloneElement(child, { activeTab, setActiveTab }) : child
      )}
    </div>
  );
};

const TabsList = ({ children, activeTab, setActiveTab }: { children: ReactNode; activeTab?: string; setActiveTab?: (tab: string) => void }) => (
  <div className="flex h-10 items-center justify-center rounded-md bg-gray-100 p-1">
    {React.Children.map(children, (child) => 
      React.isValidElement<{ activeTab?: string; setActiveTab?: (tab: string) => void }>(child) ? React.cloneElement(child, { activeTab, setActiveTab }) : child
    )}
  </div>
);

const TabsTrigger = ({ children, value, activeTab, setActiveTab }: { children: ReactNode; value: string; activeTab?: string; setActiveTab?: (tab: string) => void }) => (
  <button
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all",
      activeTab === value ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
    )}
    onClick={() => setActiveTab?.(value)}
  >
    {children}
  </button>
);

const TabsContent = ({ children, value, activeTab }: { children: ReactNode; value: string; activeTab?: string }) => {
  if (activeTab !== value) return null;
  return <div className="mt-2">{children}</div>;
};

const Progress = ({ value, className = '' }: { value: number; className?: string }) => (
  <div className={cn("h-4 w-full overflow-hidden rounded-full bg-gray-200", className)}>
    <div 
      className="h-full bg-blue-600 transition-all"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

const Avatar = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}>
    {children}
  </div>
);

const AvatarFallback = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={cn("flex h-full w-full items-center justify-center rounded-full bg-gray-100", className)}>
    {children}
  </div>
);

// ============== STATS CARD COMPONENT ==============
const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeLabel,
  icon, 
  iconBg = 'bg-blue-600',
  className = ''
}: {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: ReactNode;
  iconBg?: string;
  className?: string;
}) => (
  <Card className={cn('hover:shadow-lg transition-shadow duration-200', className)}>
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change !== undefined && (
            <p className="text-sm flex items-center gap-1">
              <span className={cn(
                'font-medium',
                change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600'
              )}>
                {change > 0 ? '+' : ''}{change}
                {changeLabel && ` ${changeLabel}`}
              </span>
              <span className="text-gray-600">from last month</span>
            </p>
          )}
        </div>
        <div className={cn('p-3 rounded-xl text-white', iconBg)}>
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

// ============== SIDEBAR COMPONENT ==============
const Sidebar = ({ currentPage, onPageChange, collapsed, onToggleCollapse }: { 
  currentPage: string; 
  onPageChange: (page: string) => void; 
  collapsed: boolean; 
  onToggleCollapse: () => void; 
}) => {
  const items = [
    { title: 'Dashboard', url: 'dashboard', icon: Icons.LayoutDashboard },
    { title: 'Interviews', url: 'interviews', icon: Icons.MessageSquare },
    { title: 'Candidates', url: 'candidates', icon: Icons.Users },
    { title: 'Results', url: 'results', icon: Icons.BarChart3 },
    { title: 'Knowledge', url: 'knowledge', icon: Icons.Brain },
    { title: 'Integrations', url: 'integrations', icon: Icons.Zap },
    { title: 'Settings', url: 'settings', icon: Icons.Settings },
  ];

  return (
    <div className={cn("bg-white border-r border-gray-200 transition-all duration-300", collapsed ? "w-16" : "w-64")}>
      <div className="p-4">
        <button 
          onClick={onToggleCollapse}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <Icons.Menu className="h-5 w-5" />
        </button>
      </div>
      
      <nav className="px-2 space-y-1">
        {items.map((item) => (
          <button
            key={item.title}
            onClick={() => onPageChange(item.url)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-left",
              currentPage === item.url 
                ? "bg-blue-50 text-blue-700 font-medium border-r-2 border-blue-600" 
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>{item.title}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
};

// ============== PAGE COMPONENTS ==============
const Dashboard = () => {
  const { state } = useAppContext();
  const { stats, recentInterviews } = state.dashboard;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600 text-white';
      case 'in-progress': return 'bg-yellow-600 text-white';
      case 'scheduled': return 'bg-blue-600 text-white';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your interviews.</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white">
          <Icons.Plus className="mr-2 h-4 w-4" />
          New Interview
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Interviews"
          value={stats.totalInterviews}
          change={stats.totalInterviewsChange}
          changeLabel="%"
          icon={<Icons.Users className="h-6 w-6" />}
          iconBg="bg-orange-600"
        />
        <StatsCard
          title="This Month"
          value={stats.thisMonth}
          change={stats.thisMonthChange}
          changeLabel="%"
          icon={<Icons.Calendar className="h-6 w-6" />}
          iconBg="bg-blue-600"
        />
        <StatsCard
          title="Success Rate"
          value={`${stats.successRate}%`}
          change={stats.successRateChange}
          changeLabel="%"
          icon={<Icons.TrendingUp className="h-6 w-6" />}
          iconBg="bg-green-600"
        />
        <StatsCard
          title="Avg. Duration"
          value={`${stats.avgDuration}m`}
          change={stats.avgDurationChange}
          changeLabel="m"
          icon={<Icons.Clock className="h-6 w-6" />}
          iconBg="bg-yellow-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold">Recent Interviews</CardTitle>
                <p className="text-sm text-gray-600">Latest interview sessions and their status</p>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                View All
                <Icons.Eye className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentInterviews.map((interview) => (
                <div key={interview.id} className="flex items-center justify-between p-4 rounded-lg border bg-gray-50 hover:bg-white transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <span className="text-sm font-medium text-blue-600">
                        {interview.candidateName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{interview.candidateName}</p>
                      <p className="text-sm text-gray-600">{interview.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{interview.date}</p>
                      <p className="text-sm text-gray-600">Score: {interview.score}%</p>
                    </div>
                    <Badge className={getStatusColor(interview.status)}>
                      {interview.status === 'in-progress' ? 'In Progress' : 
                       interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
              <p className="text-sm text-gray-600">Common tasks and shortcuts</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Icons.Plus className="mr-2 h-4 w-4" />
                Create New Interview
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Icons.UserPlus className="mr-2 h-4 w-4" />
                Manage Candidates
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Icons.BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">This Month's Performance</CardTitle>
              <p className="text-sm text-gray-600">Interview completion and success rates</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Completion Rate</span>
                  <span className="font-medium">94%</span>
                </div>
                <Progress value={94} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-medium">78%</span>
                </div>
                <Progress value={78} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Interviews = () => {
  const { state } = useAppContext();
  const { interviews, stats } = state.interviews;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600 text-white';
      case 'scheduled': return 'bg-blue-600 text-white';
      case 'completed': return 'bg-gray-600 text-white';
      case 'draft': return 'bg-yellow-600 text-white';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '🟢';
      case 'scheduled': return '📅';
      case 'completed': return '✅';
      case 'draft': return '📝';
      default: return '⚪';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Interviews</h1>
          <p className="text-gray-600">Manage and monitor your interview sessions</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white">
          <Icons.Plus className="mr-2 h-4 w-4" />
          New Interview
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Interviews"
          value={stats.total}
          icon={<Icons.MessageSquare className="h-6 w-6" />}
          iconBg="bg-blue-600"
        />
        <StatsCard
          title="Active"
          value={stats.active}
          icon={<Icons.Users className="h-6 w-6" />}
          iconBg="bg-green-600"
        />
        <StatsCard
          title="Total Candidates"
          value={stats.totalCandidates}
          icon={<Icons.Users className="h-6 w-6" />}
          iconBg="bg-orange-600"
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          icon={<Icons.TrendingUp className="h-6 w-6" />}
          iconBg="bg-purple-600"
        />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">Interview Sessions</CardTitle>
            <p className="text-sm text-gray-600">All your interview sessions and their current status</p>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Search interviews..." className="w-64" />
            <Button variant="outline" size="icon">
              <Icons.Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Interview</th>
                  <th className="text-left p-2 font-medium">Status</th>
                  <th className="text-left p-2 font-medium">Candidates</th>
                  <th className="text-left p-2 font-medium">Progress</th>
                  <th className="text-left p-2 font-medium">Duration</th>
                  <th className="text-left p-2 font-medium">Created</th>
                  <th className="text-left p-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {interviews.map((interview) => (
                  <tr key={interview.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{interview.title}</td>
                    <td className="p-2">
                      <Badge className={getStatusColor(interview.status)}>
                        <span className="mr-1">{getStatusIcon(interview.status)}</span>
                        {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-2">{interview.candidates}</td>
                    <td className="p-2">{interview.progress}</td>
                    <td className="p-2">{interview.duration}</td>
                    <td className="p-2">{interview.created}</td>
                    <td className="p-2">
                      <Button variant="ghost" size="icon">
                        <Icons.MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Candidates = () => {
  const { state } = useAppContext();
  const { candidates, stats } = state.candidates;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hired': return 'bg-green-600 text-white';
      case 'interviewed': return 'bg-blue-600 text-white';
      case 'screening': return 'bg-yellow-600 text-white';
      case 'rejected': return 'bg-red-600 text-white';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
          <p className="text-gray-600">Manage your candidate pipeline and applications</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white">
          <Icons.Plus className="mr-2 h-4 w-4" />
          Add Candidate
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <StatsCard
          title="Total"
          value={stats.total}
          icon={<Icons.Users className="h-6 w-6" />}
          iconBg="bg-blue-600"
        />
        <StatsCard
          title="New"
          value={stats.new}
          icon={<Icons.UserPlus className="h-6 w-6" />}
          iconBg="bg-green-600"
        />
        <StatsCard
          title="Screening"
          value={stats.screening}
          icon={<Icons.Eye className="h-6 w-6" />}
          iconBg="bg-yellow-600"
        />
        <StatsCard
          title="Interviewed"
          value={stats.interviewed}
          icon={<Icons.MessageSquare className="h-6 w-6" />}
          iconBg="bg-orange-600"
        />
        <StatsCard
          title="Hired"
          value={stats.hired}
          icon={<Icons.TrendingUp className="h-6 w-6" />}
          iconBg="bg-purple-600"
        />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">All Candidates</CardTitle>
            <p className="text-sm text-gray-600">Complete list of candidates in your pipeline</p>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Search candidates..." className="w-64" />
            <Button variant="outline" size="icon">
              <Icons.Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Candidate</th>
                  <th className="text-left p-2 font-medium">Position</th>
                  <th className="text-left p-2 font-medium">Source</th>
                  <th className="text-left p-2 font-medium">Applied</th>
                  <th className="text-left p-2 font-medium">Status</th>
                  <th className="text-left p-2 font-medium">Score</th>
                  <th className="text-left p-2 font-medium">Tags</th>
                  <th className="text-left p-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate) => (
                  <tr key={candidate.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{candidate.name}</p>
                          <p className="text-sm text-gray-600">{candidate.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">{candidate.position}</td>
                    <td className="p-2">{candidate.source}</td>
                    <td className="p-2">{candidate.applied}</td>
                    <td className="p-2">
                      <Badge className={getStatusColor(candidate.status)}>
                        {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-2">{candidate.score || '-'}</td>
                    <td className="p-2">
                      <div className="flex gap-1">
                        {candidate.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-2">
                      <Button variant="ghost" size="icon">
                        <Icons.MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Results = () => {
  const { state } = useAppContext();
  const { candidateResults, stats, analytics } = state.results;

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case 'hire': return 'bg-green-600 text-white';
      case 'reject': return 'bg-red-600 text-white';
      case 'pending': return 'bg-yellow-600 text-white';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getDecisionText = (decision: string) => {
    switch (decision) {
      case 'hire': return 'Hire';
      case 'reject': return 'Reject';
      case 'pending': return 'Pending';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Results</h1>
          <p className="text-gray-600">Analyze interview results and candidate performance</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white">
          <Icons.Download className="mr-2 h-4 w-4" />
          Export Results
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Candidates"
          value={stats.totalCandidates}
          icon={<Icons.Users className="h-6 w-6" />}
          iconBg="bg-blue-600"
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          icon={<Icons.MessageSquare className="h-6 w-6" />}
          iconBg="bg-green-600"
        />
        <StatsCard
          title="Hired"
          value={stats.hired}
          icon={<Icons.TrendingUp className="h-6 w-6" />}
          iconBg="bg-orange-600"
        />
        <StatsCard
          title="Avg Score"
          value={stats.avgScore}
          icon={<Icons.BarChart3 className="h-6 w-6" />}
          iconBg="bg-purple-600"
        />
      </div>

      <Tabs defaultValue="results">
        <TabsList>
          <TabsTrigger value="results">Candidate Results</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="results">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold">Interview Results</CardTitle>
                <p className="text-sm text-gray-600">Detailed results for all completed interviews</p>
              </div>
              <div className="flex gap-2">
                <Input placeholder="Search results..." className="w-64" />
                <Button variant="outline" size="icon">
                  <Icons.Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Candidate</th>
                      <th className="text-left p-2 font-medium">Position</th>
                      <th className="text-left p-2 font-medium">Date</th>
                      <th className="text-left p-2 font-medium">Duration</th>
                      <th className="text-left p-2 font-medium">Score</th>
                      <th className="text-left p-2 font-medium">Status</th>
                      <th className="text-left p-2 font-medium">Decision</th>
                      <th className="text-left p-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidateResults.map((result) => (
                      <tr key={result.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {result.candidateName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{result.candidateName}</p>
                              <p className="text-sm text-gray-600">{result.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-2">{result.position}</td>
                        <td className="p-2">{result.interviewDate}</td>
                        <td className="p-2">{result.duration}</td>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{result.score}%</span>
                            <Progress value={result.score} className="w-20 h-2" />
                          </div>
                        </td>
                        <td className="p-2">
                          <Badge variant={result.status === 'completed' ? 'default' : 'secondary'}>
                            {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <Badge className={getDecisionColor(result.decision)}>
                            {getDecisionText(result.decision)}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <Button variant="ghost" size="icon">
                            <Icons.MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Score Distribution</CardTitle>
                <p className="text-sm text-gray-600">Average scores across different evaluation areas</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Technical Skills</span>
                    <span className="text-sm font-medium">{analytics.scoreDistribution.technical}%</span>
                  </div>
                  <Progress value={analytics.scoreDistribution.technical} />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Communication</span>
                    <span className="text-sm font-medium">{analytics.scoreDistribution.communication}%</span>
                  </div>
                  <Progress value={analytics.scoreDistribution.communication} />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Problem Solving</span>
                    <span className="text-sm font-medium">{analytics.scoreDistribution.problemSolving}%</span>
                  </div>
                  <Progress value={analytics.scoreDistribution.problemSolving} />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Cultural Fit</span>
                    <span className="text-sm font-medium">{analytics.scoreDistribution.cultural}%</span>
                  </div>
                  <Progress value={analytics.scoreDistribution.cultural} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Hiring Funnel</CardTitle>
                <p className="text-sm text-gray-600">Conversion rates through the interview process</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Candidates</span>
                    <span className="text-lg font-bold">{analytics.hiringFunnel.totalCandidates}</span>
                  </div>
                  <Progress value={100} />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Completed Interviews</span>
                    <span className="text-lg font-bold">{analytics.hiringFunnel.completed}</span>
                  </div>
                  <Progress value={(analytics.hiringFunnel.completed / analytics.hiringFunnel.totalCandidates) * 100} />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Recommended for Hire</span>
                    <span className="text-lg font-bold">{analytics.hiringFunnel.recommended}</span>
                  </div>
                  <Progress value={(analytics.hiringFunnel.recommended / analytics.hiringFunnel.totalCandidates) * 100} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Integrations = () => {
  const { state } = useAppContext();
  const { integrations, stats } = state.integrations;

  const connectedIntegrations = integrations.filter(i => i.status === 'connected');
  const availableIntegrations = integrations.filter(i => i.status === 'available');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600">Connect and manage third-party services</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Integrations"
          value={stats.total}
          icon={<Icons.Zap className="h-6 w-6" />}
          iconBg="bg-blue-600"
        />
        <StatsCard
          title="Connected"
          value={stats.connected}
          icon={<Icons.Users className="h-6 w-6" />}
          iconBg="bg-green-600"
        />
        <StatsCard
          title="Video Platforms"
          value={stats.videoPlatforms}
          icon={<Icons.MessageSquare className="h-6 w-6" />}
          iconBg="bg-orange-600"
        />
        <StatsCard
          title="Security Score"
          value={`${stats.securityScore}%`}
          icon={<Icons.Settings className="h-6 w-6" />}
          iconBg="bg-purple-600"
        />
      </div>

      <Tabs defaultValue="connected">
        <TabsList>
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
        </TabsList>

        <TabsContent value="connected">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectedIntegrations.map((integration) => (
              <Card key={integration.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        {integration.name}
                        {integration.popular && (
                          <Badge variant="secondary" className="text-xs">Popular</Badge>
                        )}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{integration.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">Features:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {integration.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {integration.lastSynced && (
                      <div>
                        <p className="text-xs text-gray-500">Last synced: {integration.lastSynced}</p>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        Configure
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Disconnect
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="available">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableIntegrations.map((integration) => (
              <Card key={integration.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        {integration.name}
                        {integration.popular && (
                          <Badge variant="secondary" className="text-xs">Popular</Badge>
                        )}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{integration.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">Features:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {integration.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Knowledge = () => {
  const { state } = useAppContext();
  const {  evaluationGuidelines, customInstructions } = state.knowledge;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="text-gray-600">Configure AI behavior and interview settings</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white">
          <Icons.Plus className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">AI Personality</CardTitle>
            <p className="text-sm text-gray-600">Configure how the AI interviewer behaves</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Tone</label>
              <Select className="mt-1">
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="casual">Casual</option>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Style</label>
              <Select className="mt-1">
                <option value="conversational">Conversational</option>
                <option value="structured">Structured</option>
                <option value="adaptive">Adaptive</option>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Difficulty</label>
              <Select className="mt-1">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Evaluation Guidelines</CardTitle>
            <p className="text-sm text-gray-600">Set criteria for candidate assessment</p>
          </CardHeader>
          <CardContent>
            <Textarea 
              rows={6}
              placeholder="Enter evaluation guidelines..."
              defaultValue={evaluationGuidelines}
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Custom Instructions</CardTitle>
            <p className="text-sm text-gray-600">Additional instructions for the AI interviewer</p>
          </CardHeader>
          <CardContent>
            <Textarea 
              rows={4}
              placeholder="Enter custom instructions..."
              defaultValue={customInstructions}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Settings = () => {
  const { state } = useAppContext();
  const { profile, plan, generalSettings } = state.settings;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="plan">Plan & Billing</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Profile Information</CardTitle>
              <p className="text-sm text-gray-600">Update your personal information and avatar</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-lg">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline">
                    <Icons.Upload className="mr-2 h-4 w-4" />
                    Upload New Photo
                  </Button>
                  <p className="text-sm text-gray-600 mt-1">JPG, GIF or PNG. Max size 2MB.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <Input className="mt-1" defaultValue={profile.name} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <Input className="mt-1" defaultValue={profile.email} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Company</label>
                  <Input className="mt-1" defaultValue={profile.company} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Role</label>
                  <Input className="mt-1" defaultValue={profile.role} />
                </div>
              </div>
              
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plan">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Current Plan</CardTitle>
                <p className="text-sm text-gray-600">Manage your subscription and billing</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">{plan.name}</p>
                    <p className="text-sm text-gray-600">${plan.price}/{plan.billingCycle}</p>
                  </div>
                  <Badge>Current Plan</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Interview Usage</span>
                    <span>{plan.usedThisMonth}/{plan.interviewsPerMonth}</span>
                  </div>
                  <Progress value={(plan.usedThisMonth / plan.interviewsPerMonth) * 100} />
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Features:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-3">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="outline">Billing History</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="general">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Notifications</CardTitle>
                <p className="text-sm text-gray-600">Configure how you receive updates</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive updates via email</p>
                  </div>
                  <input type="checkbox" defaultChecked={generalSettings.notifications.email} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-600">Receive push notifications in browser</p>
                  </div>
                  <input type="checkbox" defaultChecked={generalSettings.notifications.push} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Interview Reminders</p>
                    <p className="text-sm text-gray-600">Get reminded about upcoming interviews</p>
                  </div>
                  <input type="checkbox" defaultChecked={generalSettings.notifications.interview} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Candidate Updates</p>
                    <p className="text-sm text-gray-600">Updates when candidates complete interviews</p>
                  </div>
                  <input type="checkbox" defaultChecked={generalSettings.notifications.candidateUpdates} />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Preferences</CardTitle>
                <p className="text-sm text-gray-600">Customize your experience</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Timezone</label>
                  <Select className="mt-1" defaultValue={generalSettings.timezone}>
                    <option value="America/New_York">Eastern Time (UTC-5)</option>
                    <option value="America/Chicago">Central Time (UTC-6)</option>
                    <option value="America/Denver">Mountain Time (UTC-7)</option>
                    <option value="America/Los_Angeles">Pacific Time (UTC-8)</option>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Language</label>
                  <Select className="mt-1" defaultValue={generalSettings.language}>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Theme</label>
                  <Select className="mt-1" defaultValue={generalSettings.theme}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            <Button>Save Changes</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// ============== MAIN APP COMPONENT ==============
const AIInterviewDashboard = ({ className = '' }: { className?: string }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderPage = () => {
    switch (state.currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'interviews': return <Interviews />;
      case 'candidates': return <Candidates />;
      case 'results': return <Results />;
      case 'knowledge': return <Knowledge />;
      case 'integrations': return <Integrations />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className={cn("min-h-screen flex w-full bg-gray-50", className)}>
        {/* Sidebar */}
        <Sidebar 
          currentPage={state.currentPage}
          onPageChange={(page) => dispatch({ type: 'SET_PAGE', payload: page })}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b bg-white flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <span className="font-semibold text-gray-900">AI Interview Taker</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Icons.Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-orange-600 rounded-full text-xs flex items-center justify-center text-white">
                  2
                </span>
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-600 text-white">
                  <Icons.User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </header>
          
          {/* Page Content */}
          <main className="flex-1 p-6">
            {renderPage()}
          </main>
        </div>
      </div>
      
      {/* Include minimal CSS for styling */}
      <style >{`
        * {
          box-sizing: border-box;
        }
        
        .grid {
          display: grid;
        }
        
        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
        
        @media (min-width: 768px) {
          .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .md\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        }
        
        @media (min-width: 1024px) {
          .lg\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          .lg\\:grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
          .lg\\:col-span-2 { grid-column: span 2 / span 2; }
        }
        
        .gap-1 { gap: 0.25rem; }
        .gap-2 { gap: 0.5rem; }
        .gap-3 { gap: 0.75rem; }
        .gap-4 { gap: 1rem; }
        .gap-6 { gap: 1.5rem; }
        
        .space-y-1 > * + * { margin-top: 0.25rem; }
        .space-y-2 > * + * { margin-top: 0.5rem; }
        .space-y-3 > * + * { margin-top: 0.75rem; }
        .space-y-4 > * + * { margin-top: 1rem; }
        .space-y-6 > * + * { margin-top: 1.5rem; }
        
        .flex { display: flex; }
        .flex-1 { flex: 1 1 0%; }
        .flex-col { flex-direction: column; }
        .flex-shrink-0 { flex-shrink: 0; }
        .items-center { align-items: center; }
        .items-start { align-items: flex-start; }
        .justify-between { justify-content: space-between; }
        .justify-start { justify-content: flex-start; }
        .justify-center { justify-content: center; }
        
        .w-full { width: 100%; }
        .w-16 { width: 4rem; }
        .w-64 { width: 16rem; }
        .w-20 { width: 5rem; }
        .w-1 { width: 0.25rem; }
        .w-3 { width: 0.75rem; }
        .w-4 { width: 1rem; }
        .w-5 { width: 1.25rem; }
        .w-6 { width: 1.5rem; }
        .w-8 { width: 2rem; }
        .w-10 { width: 2.5rem; }
        
        .h-full { height: 100%; }
        .h-2 { height: 0.5rem; }
        .h-3 { height: 0.75rem; }
        .h-4 { height: 1rem; }
        .h-5 { height: 1.25rem; }
        .h-6 { height: 1.5rem; }
        .h-8 { height: 2rem; }
        .h-9 { height: 2.25rem; }
        .h-10 { height: 2.5rem; }
        .h-11 { height: 2.75rem; }
        .h-16 { height: 4rem; }
        .h-20 { height: 5rem; }
        .min-h-screen { min-height: 100vh; }
        
        .p-1 { padding: 0.25rem; }
        .p-2 { padding: 0.5rem; }
        .p-3 { padding: 0.75rem; }
        .p-4 { padding: 1rem; }
        .p-6 { padding: 1.5rem; }
        .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
        .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
        .px-8 { padding-left: 2rem; padding-right: 2rem; }
        .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
        .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        .pt-0 { padding-top: 0; }
        .mr-1 { margin-right: 0.25rem; }
        .mr-2 { margin-right: 0.5rem; }
        .ml-2 { margin-left: 0.5rem; }
        .mt-1 { margin-top: 0.25rem; }
        .mt-2 { margin-top: 0.5rem; }
        .mb-1 { margin-bottom: 0.25rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .-top-1 { top: -0.25rem; }
        .-right-1 { right: -0.25rem; }
        
        .text-left { text-align: left; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .text-xs { font-size: 0.75rem; line-height: 1rem; }
        .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
        .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
        .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
        .text-2xl { font-size: 1.5rem; line-height: 2rem; }
        .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
        
        .font-medium { font-weight: 500; }
        .font-semibold { font-weight: 600; }
        .font-bold { font-weight: 700; }
        
        .text-white { color: #ffffff; }
        .text-gray-400 { color: #9ca3af; }
        .text-gray-500 { color: #6b7280; }
        .text-gray-600 { color: #4b5563; }
        .text-gray-700 { color: #374151; }
        .text-gray-900 { color: #111827; }
        .text-blue-600 { color: #2563eb; }
        .text-blue-700 { color: #1d4ed8; }
        .text-green-600 { color: #16a34a; }
        .text-red-600 { color: #dc2626; }
        .text-yellow-600 { color: #ca8a04; }
        .text-orange-600 { color: #ea580c; }
        .text-purple-600 { color: #9333ea; }
        
        .bg-white { background-color: #ffffff; }
        .bg-gray-50 { background-color: #f9fafb; }
        .bg-gray-100 { background-color: #f3f4f6; }
        .bg-gray-200 { background-color: #e5e7eb; }
        .bg-gray-600 { background-color: #4b5563; }
        .bg-blue-50 { background-color: #eff6ff; }
        .bg-blue-100 { background-color: #dbeafe; }
        .bg-blue-600 { background-color: #2563eb; }
        .bg-blue-700 { background-color: #1d4ed8; }
        .bg-green-600 { background-color: #16a34a; }
        .bg-red-600 { background-color: #dc2626; }
        .bg-yellow-600 { background-color: #ca8a04; }
        .bg-orange-600 { background-color: #ea580c; }
        .bg-orange-700 { background-color: #c2410c; }
        .bg-purple-600 { background-color: #9333ea; }
        
        .border { border-width: 1px; }
        .border-b { border-bottom-width: 1px; }
        .border-r { border-right-width: 1px; }
        .border-r-2 { border-right-width: 2px; }
        .border-gray-200 { border-color: #e5e7eb; }
        .border-gray-300 { border-color: #d1d5db; }
        .border-blue-600 { border-color: #2563eb; }
        
        .rounded { border-radius: 0.25rem; }
        .rounded-md { border-radius: 0.375rem; }
        .rounded-lg { border-radius: 0.5rem; }
        .rounded-xl { border-radius: 0.75rem; }
        .rounded-full { border-radius: 9999px; }
        
        .shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
        .shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05); }
        
        .transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
        .transition-shadow { transition-property: box-shadow; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
        .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 300ms; }
        .duration-200 { transition-duration: 200ms; }
        
        .hover\\:bg-gray-50:hover { background-color: #f9fafb; }
        .hover\\:bg-gray-100:hover { background-color: #f3f4f6; }
        .hover\\:bg-gray-200:hover { background-color: #e5e7eb; }
        .hover\\:bg-white:hover { background-color: #ffffff; }
        .hover\\:bg-blue-700:hover { background-color: #1d4ed8; }
        .hover\\:bg-orange-700:hover { background-color: #c2410c; }
        .hover\\:text-gray-900:hover { color: #111827; }
        .hover\\:text-blue-700:hover { color: #1d4ed8; }
        .hover\\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05); }
        
        .focus\\:outline-none:focus { outline: 2px solid transparent; outline-offset: 2px; }
        .focus\\:ring-2:focus { --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color); --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color); box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000); }
        .focus\\:ring-blue-500:focus { --tw-ring-color: #3b82f6; }
        
        .disabled\\:cursor-not-allowed:disabled { cursor: not-allowed; }
        .disabled\\:opacity-50:disabled { opacity: 0.5; }
        .disabled\\:pointer-events-none:disabled { pointer-events: none; }
        
        .absolute { position: absolute; }
        .relative { position: relative; }
        
        .overflow-hidden { overflow: hidden; }
        .overflow-x-auto { overflow-x: auto; }
        
        .whitespace-nowrap { white-space: nowrap; }
      `}</style>
    </AppContext.Provider>
  );
};

export default AIInterviewDashboard;