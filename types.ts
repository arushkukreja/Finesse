
export enum AlertSeverity {
  CRITICAL = 'CRITICAL',
  WARNING = 'WARNING',
  INFO = 'INFO'
}

export enum AlertStatus {
  UNREVIEWED = 'UNREVIEWED',
  SAFE = 'SAFE',
  FRAUD = 'FRAUD'
}

export interface PlaidTransaction {
  transaction_id: string;
  transaction_name: string;
  transaction_amount: number;
  transaction_date: string;
  authorized_date: string;
  currency: string;
  merchant_name: string;
  payment_channel: 'online' | 'in store' | 'other';
  pending: boolean;
  category_primary: string;
  category_detailed: string;
  category_confidence: number;
  category_icon: string;
  transaction_type: string;
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  account_id: string;
  account_name: string;
  account_official_name: string;
}

export interface PlaidAccount {
  account_id: string;
  account_name: string;
  official_account_name: string;
  account_subtype: string;
  account_type: string;
  account_mask: string;
  account_holder_category: string;
  account_balance_available: number;
  account_balance_current: number;
  account_currency: string;
}

export interface Alert {
  id: string;
  transactionId: string;
  severity: AlertSeverity;
  type: string;
  description: string;
  aiExplanation: string;
  status: AlertStatus;
  timestamp: string;
  transaction: PlaidTransaction;
  comments?: string;
}

export interface RuleLimit {
  count: number;
  amount: number;
  period: 'day' | 'week' | 'month' | 'quarter' | 'year';
}

export interface Rule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  severity: AlertSeverity;
  limits?: RuleLimit[];
  categories?: string[];
  locations?: string[];
  channels?: ('online' | 'in store' | 'other')[];
}

export interface ReportSchedule {
  id: string;
  title: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  format: 'pdf' | 'csv';
  recipients: string[];
  active: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

/**
 * Vendor interface for managing trusted and untrusted business partners
 */
export interface Vendor {
  id: string;
  name: string;
  verified: boolean;
  trustScore: number;
  lastPaymentDate: string;
  totalVolume: number;
}
