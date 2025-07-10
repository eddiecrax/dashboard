export interface Child {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  guardianName: string;
  guardianPhone: string;
  address: string;
  photoUrl?: string;
  qrCode: string;
  vaccinations: Vaccination[];
  registeredBy: string;
  registrationDate: string;
  lastSyncDate: string;
}

export interface Vaccination {
  id: string;
  vaccine: string;
  scheduledDate: string;
  administeredDate?: string;
  status: 'due' | 'overdue' | 'completed' | 'missed';
  location?: string;
  administeredBy?: string;
}

export interface CHW {
  id: string;
  name: string;
  phone: string;
  email?: string;
  community: string;
  region: string;
  level: number;
  points: number;
  childrenRegistered: number;
  vaccinationsCompleted: number;
  lastActiveDate: string;
  appVersion: string;
  deviceInfo: string;
  achievements: Achievement[];
  performance: CHWPerformance;
}

export interface CHWPerformance {
  weeklyRegistrations: number;
  weeklyVaccinations: number;
  followUpRate: number;
  dataQualityScore: number;
  communityEngagement: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  points: number;
}

export interface SMSReminder {
  id: string;
  childId: string;
  message: string;
  scheduledDate: string;
  sentDate?: string;
  status: 'pending' | 'sent' | 'failed' | 'delivered';
  language: string;
  reminderType: 'vaccination' | 'followup' | 'missed';
}

export interface MobileAppData {
  totalDownloads: number;
  activeUsers: number;
  appVersion: string;
  crashReports: number;
  syncStatus: 'healthy' | 'warning' | 'error';
  lastSyncTime: string;
}

export type DashboardType = 'ngo' | 'donor' | 'ministry';

export interface Region {
  id: string;
  name: string;
  population: number;
  coverage: number;
  activeCHWs: number;
  registeredChildren: number;
}

export interface FinancialData {
  totalBudget: number;
  spent: number;
  costPerChild: number;
  costPerVaccination: number;
  efficiency: number;
}