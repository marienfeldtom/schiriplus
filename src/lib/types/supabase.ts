export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      refusals: {
        Row: {
          id: number;
          created_at: string | null;
          user_id: string | null;
          reason: string | null;
          game_id: number | null;
          participation: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          user_id?: string | null;
          reason?: string | null;
          game_id?: number | null;
          participation?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          user_id?: string | null;
          reason?: string | null;
          game_id?: number | null;
          participation?: string | null;
        };
      };
      teams: {
        Row: {
          id: number;
          created_at: string | null;
          name: string | null;
          needs_referee: boolean | null;
          team_color: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          name?: string | null;
          needs_referee?: boolean | null;
          team_color?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          name?: string | null;
          needs_referee?: boolean | null;
          team_color?: string | null;
        };
      };
      profiles: {
        Row: {
          id: string;
          updated_at: string | null;
          username: string | null;
          avatar_url: string | null;
          website: string | null;
          isAdmin: boolean | null;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          username?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          isAdmin?: boolean | null;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          isAdmin?: boolean | null;
        };
      };
      games: {
        Row: {
          id: number;
          created_at: string | null;
          name: string | null;
          team_id: number | null;
          referee_1_id: string | null;
          referee_2_id: string | null;
          judge_1_id: string | null;
          judge_2_id: string | null;
          date: string | null;
          league_name: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          name?: string | null;
          team_id?: number | null;
          referee_1_id?: string | null;
          referee_2_id?: string | null;
          judge_1_id?: string | null;
          judge_2_id?: string | null;
          date?: string | null;
          league_name?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          name?: string | null;
          team_id?: number | null;
          referee_1_id?: string | null;
          referee_2_id?: string | null;
          judge_1_id?: string | null;
          judge_2_id?: string | null;
          date?: string | null;
          league_name?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}