export interface User {
  id: string;
  email: string;
  name?: string; // Optional field
  created_at: string; // ISO date string
}

export type AuthUser = {
  id: string;
  email: string | null;
  displayName: string | null;
};