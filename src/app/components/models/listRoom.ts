// models/hotel.model.ts

import { City } from './city';
import { Currency } from './currency';
import { Reviews } from './rv';
import { Tax } from './tax';

export interface BookingDate {
  start_date: string;
  end_date: string;
}

export interface Partner {
  name: string;
  logo: string;
}

export interface ListRoom {
  data: {
    id: number;
    name: string;
    adresse: string;
    latitude: number;
    longitude: number;
    mark: string;
    thumbnail: string;
    images: string[];
    size: number;
    order: number;
    booking_dates: BookingDate[];
    max_adults: number;
    max_children: number;
    room_category: string;
    type_room: string;
    number_of_beds: number;
    number_of_bathrooms: number;
    number_of_rooms: number;
    rented_bedroom_price: string;
    price: string;
    is_payment_before: number;
    is_for_partner: number;
    is_free_cancelled: number;
    is_breakfast_free: number;
    is_rented_bedroom: number;
    cancellation_type: string;
    cancellation_value: null | number;
    description: string;
    rules: string;
    cancelation: string;
    city: City;
    partner: Partner; // Remplacez 'any' par le type réel si disponible
    currency: Currency;
    published_date: string;
    surroundings: any[]; // Remplacez 'any' par le type réel si disponible
    amenities: {
      id: number;
      name: string;
      icon: string;
      description: null | string;
    }[];
    equipments: {
      id: number;
      name: string;
      icon: string;
      description: null | string;
    }[];
    reviews: Reviews;
    tax: Tax;
  };
}
