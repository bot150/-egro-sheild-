export type UserRole = 'worker' | 'admin';
export type DeliveryCategory = 'food' | 'ecommerce' | 'quick_commerce';

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  category?: DeliveryCategory;
  subCategory?: string;
  aadharNumber?: string;
  bankAccountNumber?: string;
  ifscCode?: string;
  age?: number;
  riskScore?: number;
  weeklyPremium?: number;
  onboarded?: boolean;
  location?: string;
  createdAt: string;
}

export interface InsurancePolicy {
  id?: string;
  userId: string;
  status: 'active' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
  premiumAmount: number;
  coverageAmount: number;
}

export interface Claim {
  id?: string;
  userId: string;
  policyId: string;
  triggerEvent: string;
  amount: number;
  status: 'pending' | 'processed' | 'flagged';
  timestamp: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface DisruptionEvent {
  id?: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  location: string;
  timestamp: string;
  affectedCount: number;
}

export interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  isRisk: boolean;
}
