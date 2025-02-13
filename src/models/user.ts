interface SessionUser {
  id: number;
  nickname: string;
  role: 'USER' | 'ADMIN';
}

export interface User {
  createdAt: string;
  updatedAt: string;
  id: number;
  nickname: string;
  profileImage?: string;
  providerId: string;
  provider: 'KAKAO';
  role: 'USER';
}

export interface LoginResponse {
  message: string;
  user: SessionUser;
}
