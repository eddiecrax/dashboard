import { Child, CHW, SMSReminder, MobileAppData, Region } from '../types';

// Utility function to generate random data updates
export const generateRandomUpdate = (baseValue: number, variance: number = 0.1) => {
  const change = (Math.random() - 0.5) * 2 * variance;
  return Math.max(0, baseValue * (1 + change));
};

// Simulate real-time data updates
export const getLiveData = () => {
  const now = new Date();
  const hour = now.getHours();
  
  // Simulate different activity levels throughout the day
  const activityMultiplier = hour >= 8 && hour <= 18 ? 1.2 : 0.8;
  
  return {
    activeCHWs: Math.floor(77 * activityMultiplier),
    dailyRegistrations: Math.floor(generateRandomUpdate(15, 0.3)),
    dailyVaccinations: Math.floor(generateRandomUpdate(25, 0.4)),
    syncSuccessRate: 99.1 + (Math.random() - 0.5) * 0.8,
    lastUpdate: now.toISOString()
  };
};

export const mockMobileAppData: MobileAppData = {
  totalDownloads: 1247,
  activeUsers: 892,
  appVersion: '2.1.3',
  crashReports: 3,
  syncStatus: 'healthy',
  lastSyncTime: '2024-01-15T14:30:00Z'
};

export const mockChildren: Child[] = [
  {
    id: '1',
    name: 'Amara Johnson',
    dateOfBirth: '2023-03-15',
    gender: 'female',
    guardianName: 'Sarah Johnson',
    guardianPhone: '+1234567890',
    address: 'Kibera, Nairobi County',
    qrCode: 'CHD001',
    registeredBy: 'CHW001',
    registrationDate: '2023-03-10',
    lastSyncDate: '2024-01-15T10:30:00Z',
    vaccinations: [
      {
        id: '1',
        vaccine: 'BCG',
        scheduledDate: '2023-03-15',
        administeredDate: '2023-03-15',
        status: 'completed',
        administeredBy: 'CHW001'
      },
      {
        id: '2',
        vaccine: 'DPT-1',
        scheduledDate: '2023-05-15',
        administeredDate: '2023-05-14',
        status: 'completed',
        administeredBy: 'CHW001'
      },
      {
        id: '3',
        vaccine: 'DPT-2',
        scheduledDate: '2023-07-15',
        status: 'due'
      }
    ]
  },
  {
    id: '2',
    name: 'James Wilson',
    dateOfBirth: '2022-11-20',
    gender: 'male',
    guardianName: 'Mary Wilson',
    guardianPhone: '+1234567891',
    address: 'Mathare, Nairobi County',
    qrCode: 'CHD002',
    registeredBy: 'CHW002',
    registrationDate: '2022-11-15',
    lastSyncDate: '2024-01-14T16:45:00Z',
    vaccinations: [
      {
        id: '4',
        vaccine: 'BCG',
        scheduledDate: '2022-11-20',
        administeredDate: '2022-11-21',
        status: 'completed',
        administeredBy: 'CHW002'
      },
      {
        id: '5',
        vaccine: 'DPT-1',
        scheduledDate: '2023-01-20',
        status: 'overdue'
      }
    ]
  }
];

export const mockCHWs: CHW[] = [
  {
    id: 'CHW001',
    name: 'Dr. Grace Okonkwo',
    phone: '+254712345678',
    email: 'grace.okonkwo@health.go.ke',
    community: 'Kibera',
    region: 'Nairobi County',
    level: 3,
    points: 1250,
    childrenRegistered: 45,
    vaccinationsCompleted: 128,
    lastActiveDate: '2024-01-15T14:30:00Z',
    appVersion: '2.1.3',
    deviceInfo: 'Samsung Galaxy A14 (Android 13)',
    performance: {
      weeklyRegistrations: 8,
      weeklyVaccinations: 15,
      followUpRate: 92,
      dataQualityScore: 96,
      communityEngagement: 88
    },
    achievements: [
      {
        id: 'ACH001',
        title: 'First Registration',
        description: 'Register your first child',
        icon: 'user-plus',
        earned: true,
        earnedDate: '2023-01-15',
        points: 50
      },
      {
        id: 'ACH002',
        title: 'Community Champion',
        description: 'Register 50+ children',
        icon: 'trophy',
        earned: false,
        points: 200
      },
      {
        id: 'ACH003',
        title: 'Perfect Week',
        description: 'Complete all scheduled vaccinations in a week',
        icon: 'star',
        earned: true,
        earnedDate: '2023-12-08',
        points: 100
      }
    ]
  },
  {
    id: 'CHW002',
    name: 'Nurse Patrick Mbeki',
    phone: '+254723456789',
    email: 'patrick.mbeki@health.go.ke',
    community: 'Mathare',
    region: 'Nairobi County',
    level: 2,
    points: 890,
    childrenRegistered: 32,
    vaccinationsCompleted: 89,
    lastActiveDate: '2024-01-14T16:45:00Z',
    appVersion: '2.1.2',
    deviceInfo: 'Tecno Spark 9 (Android 12)',
    performance: {
      weeklyRegistrations: 5,
      weeklyVaccinations: 12,
      followUpRate: 85,
      dataQualityScore: 91,
      communityEngagement: 82
    },
    achievements: [
      {
        id: 'ACH001',
        title: 'First Registration',
        description: 'Register your first child',
        icon: 'user-plus',
        earned: true,
        earnedDate: '2023-02-01',
        points: 50
      }
    ]
  }
];

export const mockSMSReminders: SMSReminder[] = [
  {
    id: 'SMS001',
    childId: '1',
    message: 'Reminder: Amara needs DPT-2 vaccination on July 15th. Visit your nearest health center.',
    scheduledDate: '2023-07-13',
    sentDate: '2023-07-13T09:00:00Z',
    status: 'delivered',
    language: 'en',
    reminderType: 'vaccination'
  },
  {
    id: 'SMS002',
    childId: '2',
    message: 'URGENT: James is overdue for DPT-1 vaccination. Please contact your CHW immediately.',
    scheduledDate: '2023-07-10',
    sentDate: '2023-07-10T10:30:00Z',
    status: 'delivered',
    language: 'en',
    reminderType: 'missed'
  }
];

export const mockRegions: Region[] = [
  { id: '1', name: 'Nairobi County', population: 125000, coverage: 85, activeCHWs: 15, registeredChildren: 2847 },
  { id: '2', name: 'Kiambu County', population: 98000, coverage: 78, activeCHWs: 12, registeredChildren: 2156 },
  { id: '3', name: 'Machakos County', population: 110000, coverage: 82, activeCHWs: 18, registeredChildren: 2634 },
  { id: '4', name: 'Kajiado County', population: 87000, coverage: 75, activeCHWs: 10, registeredChildren: 1892 },
  { id: '5', name: 'Murang\'a County', population: 156000, coverage: 88, activeCHWs: 22, registeredChildren: 3245 }
];

export const mockNGOData = {
  totalBeneficiaries: 12774,
  activeCHWs: 77,
  communities: 45,
  completionRate: 82,
  satisfactionScore: 4.6,
  mobileAppData: mockMobileAppData,
  monthlyProgress: [
    { month: 'Aug', children: 980, vaccinations: 2150, smsReminders: 1240 },
    { month: 'Sep', children: 1120, vaccinations: 2420, smsReminders: 1380 },
    { month: 'Oct', children: 1280, vaccinations: 2890, smsReminders: 1520 },
    { month: 'Nov', children: 1420, vaccinations: 3150, smsReminders: 1680 },
    { month: 'Dec', children: 1580, vaccinations: 3520, smsReminders: 1840 },
    { month: 'Jan', children: 1720, vaccinations: 3850, smsReminders: 1980 }
  ],
  topPerformers: [
    { name: 'Dr. Grace Okonkwo', score: 96, community: 'Kibera', region: 'Nairobi County' },
    { name: 'Nurse Patrick Mbeki', score: 91, community: 'Mathare', region: 'Nairobi County' },
    { name: 'CHW Sarah Ahmed', score: 89, community: 'Kawangware', region: 'Nairobi County' },
    { name: 'CHW John Mwangi', score: 87, community: 'Dandora', region: 'Nairobi County' },
    { name: 'CHW Mary Wanjiku', score: 85, community: 'Korogocho', region: 'Nairobi County' }
  ],
  appMetrics: {
    dailyActiveUsers: 68,
    weeklyActiveUsers: 77,
    monthlyActiveUsers: 82,
    averageSessionDuration: '24 minutes',
    dataSync: {
      successful: 1247,
      failed: 12,
      pending: 3
    }
  }
};

export const mockDonorData = {
  totalInvestment: 485000,
  costPerChild: 37.95,
  socialROI: 4.2,
  costAvoidance: 2040000,
  investmentBreakdown: [
    { category: 'Mobile App Development', amount: 145000, percentage: 30 },
    { category: 'CHW Training & Support', amount: 125000, percentage: 26 },
    { category: 'Technology Infrastructure', amount: 97000, percentage: 20 },
    { category: 'Operations & Monitoring', amount: 73000, percentage: 15 },
    { category: 'SMS & Communication', amount: 45000, percentage: 9 }
  ],
  impactMetrics: [
    { metric: 'Children Reached', current: 12774, target: 15000 },
    { metric: 'Coverage Rate (%)', current: 82, target: 90 },
    { metric: 'Cost per Child ($)', current: 37.95, target: 35 },
    { metric: 'CHW Retention (%)', current: 94, target: 95 }
  ],
  financialData: {
    totalBudget: 485000,
    spent: 387000,
    costPerChild: 37.95,
    costPerVaccination: 12.45,
    efficiency: 87
  }
};

export const mockMinistryData = {
  nationalCoverage: 82,
  whoTarget: 90,
  sdgProgress: 78,
  totalPopulation: 576000,
  registeredChildren: 12774,
  regionalData: mockRegions,
  coverageTrends: [
    { year: 2020, coverage: 68, children: 8500 },
    { year: 2021, coverage: 72, children: 9200 },
    { year: 2022, coverage: 76, children: 10100 },
    { year: 2023, coverage: 80, children: 11500 },
    { year: 2024, coverage: 82, children: 12774 }
  ],
  policyCompliance: [
    { policy: 'WHO Immunization Standards', status: 'Compliant', score: 94 },
    { policy: 'National Health Act 2020', status: 'Compliant', score: 91 },
    { policy: 'UNICEF Guidelines', status: 'Partially Compliant', score: 76 },
    { policy: 'Digital Health Strategy', status: 'Compliant', score: 88 }
  ]
};