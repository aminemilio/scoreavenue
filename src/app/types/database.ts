export type Database = {
  public: {
    Tables: {
      favorites: {
        Row: { match_id: number; user_id?: string; created_at: string };
        Insert: { match_id: number; user_id?: string };
        Update: { match_id?: number };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};