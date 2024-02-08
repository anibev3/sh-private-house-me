// models/customer.model.ts

export interface User {
  id?: number;
  full_name?: string;
  last_name?: string;
  first_name?: string;
  email?: string;
  email_verified_at?: null | string;
  role?: string;
  newsletter?: number;
  phone?: string;
  country?: string;
  city?: string;
  address?: string;
  created_at?: string; // Assurez-vous que c'est le type de date correct, généralement 'string' ou 'Date'
  updated_at?: string; // Assurez-vous que c'est le type de date correct, généralement 'string' ou 'Date'
}
