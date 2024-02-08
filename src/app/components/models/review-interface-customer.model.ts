// review.model.ts
export interface Review {
  id: number;
  icon: string;
  libelle: string;
  mark: number;
}

// comment.model.ts
export interface Comment {
  id: number;
  customer: Customer;
  star: number;
  content: string;
  created_at: string;
}

// customer.model.ts
export interface Customer {
  id: number;
  avatar: string;
  full_name: string;
  last_name: string;
  first_name: string;
  email: string;
  newsletter: number;
  phone: string;
  country: string;
  city: string;
  address: string;
}
