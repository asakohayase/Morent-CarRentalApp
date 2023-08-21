export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      car_images: {
        Row: {
          file_name: string | null
          image_url: string | null
          owner_id: number | null
        }
        Insert: {
          file_name?: string | null
          image_url?: string | null
          owner_id?: number | null
        }
        Update: {
          file_name?: string | null
          image_url?: string | null
          owner_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_owner"
            columns: ["owner_id"]
            referencedRelation: "cars"
            referencedColumns: ["owner_id"]
          }
        ]
      }
      cars: {
        Row: {
          booked_dates: string[] | null
          borrower_id: number | null
          capacity: Database["public"]["Enums"]["capacity"] | null
          car_id: number | null
          car_images: string[] | null
          car_title: string
          car_type: Database["public"]["Enums"]["car_type"] | null
          fuel_capacity: number
          location: string
          owner_id: number
          price: number
          short_description: string
          transmission: Database["public"]["Enums"]["transmission"] | null
        }
        Insert: {
          booked_dates?: string[] | null
          borrower_id?: number | null
          capacity?: Database["public"]["Enums"]["capacity"] | null
          car_id?: number | null
          car_images?: string[] | null
          car_title: string
          car_type?: Database["public"]["Enums"]["car_type"] | null
          fuel_capacity: number
          location: string
          owner_id: number
          price: number
          short_description: string
          transmission?: Database["public"]["Enums"]["transmission"] | null
        }
        Update: {
          booked_dates?: string[] | null
          borrower_id?: number | null
          capacity?: Database["public"]["Enums"]["capacity"] | null
          car_id?: number | null
          car_images?: string[] | null
          car_title?: string
          car_type?: Database["public"]["Enums"]["car_type"] | null
          fuel_capacity?: number
          location?: string
          owner_id?: number
          price?: number
          short_description?: string
          transmission?: Database["public"]["Enums"]["transmission"] | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      capacity: "2" | "4" | "6" | "8 or more"
      car_type:
        | "SUV"
        | "Crossover"
        | "Sedan"
        | "Truck"
        | "Wagon / Hatchback"
        | "Convertible"
        | "Luxury"
        | "Coupe"
        | "Electric"
        | "Hybrid"
        | "Van / Minivan"
        | "Sports Car"
        | "Other"
      e_cartype: "Sedan" | "SUV"
      transmission: "Manual" | "Automatic" | "CVT"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
