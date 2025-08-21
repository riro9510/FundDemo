export interface IDonation {
  id?: number;
  donorName: string;
  donorEmail: string;
  amount: number;
  currency?: string;
  description?: string | null;
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer' | 'other';
  status?: 'pending' | 'completed' | 'failed';
  createdAt?: Date;
  updatedAt?: Date;
}
