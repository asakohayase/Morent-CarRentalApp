export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      cars: {
        Row: {
          booked_dates: string[] | null;
          borrower_id: number | null;
          capacity: Database['public']['Enums']['capacity'];
          car_id: string;
          car_title: string;
          car_type: Database['public']['Enums']['car_type'];
          fuel_capacity: number;
          images: string[] | null;
          location: string;
          images: string[] | null;
          owner_id: string;
          price: number;
          short_description: string;
          transmission: Database['public']['Enums']['transmission'];
        };
        Insert: {
          booked_dates?: string[] | null;
          borrower_id?: string | null;
          capacity: Database['public']['Enums']['capacity'];
          car_id?: string;
          car_title: string;
          car_type: Database['public']['Enums']['car_type'];
          fuel_capacity: number;
          images?: string[] | null;
          location: string;
          images: string[] | null;
          owner_id: string;
          price: number;
          short_description: string;
          transmission: Database['public']['Enums']['transmission'];
        };
        Update: {
          booked_dates?: string[] | null;
          borrower_id?: string | null;
          capacity?: Database['public']['Enums']['capacity'];
          car_id?: string;
          car_title?: string;
          car_type?: Database['public']['Enums']['car_type'];
          fuel_capacity?: number;
          images?: string[] | null;
          location?: string;
          images: string[] | null;
          owner_id?: string;
          price?: number;
          short_description?: string;
          transmission?: Database['public']['Enums']['transmission'];
        };
        Relationships: [
          {
            foreignKeyName: 'cars_owner_id_fkey';
            columns: ['owner_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string;
          banner: string;
          full_name: string;
          headline: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          avatar_url?: string;
          banner?: string;
          full_name?: string;
          headline?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          avatar_url?: string;
          banner?: string;
          full_name?: string;
          headline?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      capacity: '2' | '4' | '6' | '8 or more';
      car_type:
        | 'SUV'
        | 'Crossover'
        | 'Sedan'
        | 'Truck'
        | 'Wagon / Hatchback'
        | 'Convertible'
        | 'Luxury'
        | 'Coupe'
        | 'Electric'
        | 'Hybrid'
        | 'Van / Minivan'
        | 'Sports Car'
        | 'Other';
      transmission: 'Manual' | 'Automatic' | 'CVT';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
