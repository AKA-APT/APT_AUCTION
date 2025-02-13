interface SessionUser {
  id: number;
  nickname: string;
  role: 'USER' | 'ADMIN';
}

export interface User {
  id: number;
  nickname: string;
}

export interface LoginResponse {
  message: string;
  user: SessionUser;
}
