export interface UserResponseProfile {
  success: boolean;
  data: User;
  message: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: null;
  created_at: Date;
  updated_at: Date;
}
