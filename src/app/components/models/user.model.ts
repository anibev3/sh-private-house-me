export interface User {
  id?: number;
  full_name?: string;
  last_name?: string;
  first_name?: string;
  email?: string;
  email_verified_at?: string | null;
  role?: string;
  newsletter?: number;
  phone?: string;
  country?: string;
  city?: string;
  address?: string;
  created_at?: string;
  updated_at?: string;
}
