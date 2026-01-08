
import { PlaidTransaction, PlaidAccount, Alert, AlertSeverity, AlertStatus, Rule, ReportSchedule, Vendor } from './types';

export const MOCK_ACCOUNTS: PlaidAccount[] = [
  {
    account_id: 'acc_01',
    account_name: 'Main Business Checking',
    official_account_name: 'CHASE BUSINESS COMPLETE CHECKING',
    account_subtype: 'checking',
    account_type: 'depository',
    account_mask: '4492',
    account_holder_category: 'business',
    account_balance_available: 45200.50,
    account_balance_current: 47800.00,
    account_currency: 'USD'
  },
  {
    account_id: 'acc_02',
    account_name: 'Reserve Fund',
    official_account_name: 'CHASE BUSINESS SELECT SAVINGS',
    account_subtype: 'savings',
    account_type: 'depository',
    account_mask: '1108',
    account_holder_category: 'business',
    account_balance_available: 125000.00,
    account_balance_current: 125000.00,
    account_currency: 'USD'
  }
];

export const MOCK_TRANSACTIONS: PlaidTransaction[] = [
  {
    transaction_id: 't_001',
    transaction_name: 'ACME CLOUD SERVICES MONTHLY',
    transaction_amount: 899.99,
    transaction_date: '2024-05-15',
    authorized_date: '2024-05-15',
    currency: 'USD',
    merchant_name: 'Unknown Cloud Inc',
    payment_channel: 'online',
    pending: false,
    category_primary: 'Software and Tech',
    category_detailed: 'Cloud Infrastructure Services',
    category_confidence: 0.98,
    category_icon: '☁️',
    transaction_type: 'digital',
    city: 'San Francisco',
    country: 'US',
    latitude: 37.7749,
    longitude: -122.4194,
    address: '123 Tech Way',
    account_id: 'acc_01',
    account_name: 'Main Business Checking',
    account_official_name: 'CHASE BUSINESS COMPLETE CHECKING'
  },
  {
    transaction_id: 't_002',
    transaction_name: 'POS TEST CHRG 001',
    transaction_amount: 1.00,
    transaction_date: '2024-05-14',
    authorized_date: '2024-05-14',
    currency: 'USD',
    merchant_name: 'Test Merchant',
    payment_channel: 'in store',
    pending: false,
    category_primary: 'Misc',
    category_detailed: 'General Services',
    category_confidence: 0.45,
    category_icon: '🧪',
    transaction_type: 'place',
    city: 'Miami',
    country: 'US',
    account_id: 'acc_01',
    account_name: 'Main Business Checking',
    account_official_name: 'CHASE BUSINESS COMPLETE CHECKING'
  },
  {
    transaction_id: 't_003',
    transaction_name: 'ADOBE *CREATIVE CLOUD',
    transaction_amount: 199.99,
    transaction_date: '2024-05-14',
    authorized_date: '2024-05-13',
    currency: 'USD',
    merchant_name: 'Adobe Inc',
    payment_channel: 'online',
    pending: false,
    category_primary: 'Service',
    category_detailed: 'Software Subscriptions',
    category_confidence: 0.99,
    category_icon: '🎨',
    transaction_type: 'digital',
    city: 'San Jose',
    country: 'US',
    account_id: 'acc_01',
    account_name: 'Main Business Checking',
    account_official_name: 'CHASE BUSINESS COMPLETE CHECKING'
  }
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'a1',
    transactionId: 't_001',
    severity: AlertSeverity.CRITICAL,
    type: 'After-Hours Transfer',
    description: 'High-value transaction detected during non-business hours (02:45 AM).',
    aiExplanation: 'The transaction from "Unknown Cloud Inc" is atypical for your account profile. It occurs outside standard operating hours and is from a merchant with a low trust score in our vendor database.',
    status: AlertStatus.UNREVIEWED,
    timestamp: '2024-05-15T02:45:00Z',
    transaction: MOCK_TRANSACTIONS[0]
  },
  {
    id: 'a2',
    transactionId: 't_002',
    severity: AlertSeverity.WARNING,
    type: 'Test Charge Probe',
    description: 'Small $1.00 charge identified as a potential credit card "ping" test.',
    aiExplanation: 'This transaction matches a known fraudulent pattern where attackers test card validity before attempting large-scale extraction.',
    status: AlertStatus.UNREVIEWED,
    timestamp: '2024-05-14T23:10:00Z',
    transaction: MOCK_TRANSACTIONS[1]
  }
];

export const MOCK_RULES: Rule[] = [
  { id: 'r1', name: 'Duplicate Detection', description: 'Flag transactions of identical amounts to the same merchant within 24h.', enabled: true, severity: AlertSeverity.WARNING },
  { id: 'r2', name: 'New Merchant Discovery', description: 'Alert when a payment is made to a merchant not in the Vendor Trust List.', enabled: true, severity: AlertSeverity.INFO },
  { id: 'r3', name: 'After-Hours Transfers', description: 'Flag high-value transfers (> $500) occurring between 11PM and 5AM.', enabled: true, severity: AlertSeverity.CRITICAL }
];

export const TREND_DATA = [
  { month: 'Jan', income: 45000, expenses: 32000 },
  { month: 'Feb', income: 42000, expenses: 38000 },
  { month: 'Mar', income: 51000, expenses: 41000 },
  { month: 'Apr', income: 48000, expenses: 35000 },
  { month: 'May', income: 55000, expenses: 42000 },
  { month: 'Jun', income: 53000, expenses: 39000 },
];

export const MOCK_REPORTS: ReportSchedule[] = [
  { id: 'rep1', title: 'Weekly Risk Audit', frequency: 'weekly', format: 'pdf', recipients: ['bob@bobsupplies.com'], active: true },
  { id: 'rep2', title: 'Monthly Spending Review', frequency: 'monthly', format: 'csv', recipients: ['admin@bobsupplies.com'], active: true },
];

/**
 * Mock data for the Vendor Trust List page
 */
export const MOCK_VENDORS: Vendor[] = [
  { id: 'v1', name: 'Acme Cloud Inc', verified: false, trustScore: 32, lastPaymentDate: '2024-05-15', totalVolume: 899.99 },
  { id: 'v2', name: 'Adobe Inc', verified: true, trustScore: 99, lastPaymentDate: '2024-05-14', totalVolume: 1240.50 },
  { id: 'v3', name: 'Global Logistics', verified: true, trustScore: 88, lastPaymentDate: '2024-05-12', totalVolume: 4500.00 },
  { id: 'v4', name: 'Unknown Tech Services', verified: false, trustScore: 15, lastPaymentDate: '2024-05-11', totalVolume: 250.00 },
  { id: 'v5', name: 'Main Street Utilities', verified: true, trustScore: 95, lastPaymentDate: '2024-05-01', totalVolume: 640.20 },
];
