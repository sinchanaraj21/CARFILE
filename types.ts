
export interface PatientData {
  age: number;
  sex: number; // 0: Female, 1: Male
  cp: number; // 0-3
  trestbps: number;
  chol: number;
  fbs: number; // 0 or 1
  restecg: number; // 0-2
  thalach: number;
  exang: number; // 0 or 1
  oldpeak: number;
  slope: number; // 0-2
  ca: number; // 0-3
  thal: number; // 1-3
}

export interface SHAPValue {
  feature: string;
  impact: number;
  description: string;
}

export interface PredictionResult {
  riskCategory: 'Low' | 'Moderate' | 'High';
  probability: number;
  shapExplanations: SHAPValue[];
  summary: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export interface Checkup {
  id: string;
  date: string;
  notes: string;
  documentUrl?: string;
  documentName?: string;
}
